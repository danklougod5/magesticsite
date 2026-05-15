import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ─── Rate Limiter (in-memory, IP-based) ───────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per window

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false; // Rate limited
  }

  entry.count++;
  return true;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 300_000);

// ─── Input Schemas ────────────────────────────────────────────────
const SpinSchema = z.object({
  prenom: z.string().trim().min(1).max(100),
  nom: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  tel: z.string().trim().min(1).max(40),
  boutique: z.string().trim().min(1).max(100),
  prize: z.string().trim().min(1).max(200),
  win: z.boolean(),
});

// ─── Public: Record a spin (rate limited) ─────────────────────────
export const recordSpin = createServerFn({ method: "POST" })
  .inputValidator((input) => SpinSchema.omit({ prize: true, win: true, boutique: true }).parse(input))
  .handler(async ({ data }) => {
    // Rate limit by email to prevent spam
    if (!checkRateLimit(`spin:${data.email.toLowerCase().trim()}`)) {
      return { ok: false, error: "Trop de tentatives. Veuillez patienter une minute." };
    }

    const { data: result, error } = await supabaseAdmin.rpc('handle_spin', {
      p_prenom: data.prenom,
      p_nom: data.nom,
      p_email: data.email,
      p_tel: data.tel
    });

    if (error) {
      console.error("recordSpin error:", error);
      return { ok: false, error: "Une erreur est survenue. Veuillez réessayer." };
    }

    const typedResult = result as { ok: boolean; win?: boolean; prize?: string; boutique?: string; error?: string };

    if (!typedResult.ok) {
      return { ok: false, error: typedResult.error };
    }

    return { 
      ok: true, 
      win: typedResult.win, 
      prize: typedResult.prize,
      boutique: typedResult.boutique
    };
  });

// ─── Public: Check if user already played (rate limited) ──────────
export const checkExisting = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ email: z.string().email(), tel: z.string() }).parse(input))
  .handler(async ({ data }) => {
    // Rate limit by email
    if (!checkRateLimit(`check:${data.email.toLowerCase().trim()}`)) {
      return { ok: false, error: "Trop de tentatives. Veuillez patienter une minute." };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanTel = data.tel.trim();

    // FIX: Use separate safe queries instead of string interpolation in .or()
    const { data: byEmail } = await supabaseAdmin
      .from("spins")
      .select("id")
      .ilike("email", cleanEmail)
      .limit(1)
      .maybeSingle();

    if (byEmail) {
      return { ok: false, error: "Vous avez déjà participé avec cet email ou ce numéro." };
    }

    const { data: byTel } = await supabaseAdmin
      .from("spins")
      .select("id")
      .eq("tel", cleanTel)
      .limit(1)
      .maybeSingle();

    if (byTel) {
      return { ok: false, error: "Vous avez déjà participé avec cet email ou ce numéro." };
    }

    return { ok: true };
  });

// ─── Protected: Dashboard data (requires auth) ───────────────────
export const getDashboardData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const PARTNERS = ["Peryssac", "Kiabi", "Gémo", "KIKO", "Le West"];
    const LIMIT_PER_SHOP = 2;

    const { data, error } = await supabaseAdmin
      .from("spins")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("getDashboardData error:", error);
      return { spins: [], byShop: [], total: 0, wins: 0 };
    }

    const spins = data ?? [];
    const shopMap = new Map<string, { boutique: string; total: number; wins: number; remaining: number }>();
    
    // Initialize with all partners
    for (const p of PARTNERS) {
      shopMap.set(p, { boutique: p, total: 0, wins: 0, remaining: LIMIT_PER_SHOP });
    }

    for (const s of spins) {
      const cur = shopMap.get(s.boutique) ?? { boutique: s.boutique, total: 0, wins: 0, remaining: 0 };
      cur.total += 1;
      if (s.win) {
        cur.wins += 1;
        cur.remaining = Math.max(0, LIMIT_PER_SHOP - cur.wins);
      }
      shopMap.set(s.boutique, cur);
    }

    const byShop = Array.from(shopMap.values()).sort((a, b) => b.total - a.total);

    return {
      spins,
      byShop,
      total: spins.length,
      wins: spins.filter((s) => s.win).length,
    };
  });

// ─── Protected: Reset game (requires auth) ───────────────────────
export const resetGame = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { error } = await supabaseAdmin
      .from("spins")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      console.error("resetGame error:", error);
      return { ok: false, error: "Erreur lors de la réinitialisation." };
    }

    return { ok: true };
  });
