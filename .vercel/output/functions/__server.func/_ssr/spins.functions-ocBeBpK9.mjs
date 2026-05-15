import { T as TSS_SERVER_FUNCTION, i as createServerFn } from "./server-CzXKlo6r.mjs";
import { c as createClient } from "./index-B6C1Fcum.mjs";
import { o as objectType, b as booleanType, s as stringType, r as requireSupabaseAuth } from "./auth-middleware-2Bf0Gn5a.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createMiddleware-BvN2ghIY.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const rateLimitMap = /* @__PURE__ */ new Map();
const RATE_LIMIT_WINDOW_MS = 6e4;
const RATE_LIMIT_MAX = 10;
function checkRateLimit(identifier) {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count++;
  return true;
}
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 3e5);
const SpinSchema = objectType({
  prenom: stringType().trim().min(1).max(100),
  nom: stringType().trim().min(1).max(100),
  email: stringType().trim().email().max(255),
  tel: stringType().trim().min(1).max(40),
  boutique: stringType().trim().min(1).max(100),
  prize: stringType().trim().min(1).max(200),
  win: booleanType()
});
const recordSpin_createServerFn_handler = createServerRpc({
  id: "97f814ff3f671888817aa959f6a2758ea0f10256f5d9784b036dc6ad34b7d412",
  name: "recordSpin",
  filename: "src/lib/spins.functions.ts"
}, (opts) => recordSpin.__executeServer(opts));
const recordSpin = createServerFn({
  method: "POST"
}).inputValidator((input) => SpinSchema.omit({
  prize: true,
  win: true,
  boutique: true
}).parse(input)).handler(recordSpin_createServerFn_handler, async ({
  data
}) => {
  if (!checkRateLimit(`spin:${data.email.toLowerCase().trim()}`)) {
    return {
      ok: false,
      error: "Trop de tentatives. Veuillez patienter une minute."
    };
  }
  const {
    data: result,
    error
  } = await supabaseAdmin.rpc("handle_spin", {
    p_prenom: data.prenom,
    p_nom: data.nom,
    p_email: data.email,
    p_tel: data.tel
  });
  if (error) {
    console.error("recordSpin error:", error);
    return {
      ok: false,
      error: "Une erreur est survenue. Veuillez réessayer."
    };
  }
  const typedResult = result;
  if (!typedResult.ok) {
    return {
      ok: false,
      error: typedResult.error
    };
  }
  return {
    ok: true,
    win: typedResult.win,
    prize: typedResult.prize,
    boutique: typedResult.boutique
  };
});
const checkExisting_createServerFn_handler = createServerRpc({
  id: "7b9fd446ea00b90d633d202dbd634ccf4cebde29d2733d54ac586ab6c0fb173b",
  name: "checkExisting",
  filename: "src/lib/spins.functions.ts"
}, (opts) => checkExisting.__executeServer(opts));
const checkExisting = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  email: stringType().email(),
  tel: stringType()
}).parse(input)).handler(checkExisting_createServerFn_handler, async ({
  data
}) => {
  if (!checkRateLimit(`check:${data.email.toLowerCase().trim()}`)) {
    return {
      ok: false,
      error: "Trop de tentatives. Veuillez patienter une minute."
    };
  }
  const cleanEmail = data.email.trim().toLowerCase();
  const cleanTel = data.tel.trim();
  const {
    data: byEmail
  } = await supabaseAdmin.from("spins").select("id").ilike("email", cleanEmail).limit(1).maybeSingle();
  if (byEmail) {
    return {
      ok: false,
      error: "Vous avez déjà participé avec cet email ou ce numéro."
    };
  }
  const {
    data: byTel
  } = await supabaseAdmin.from("spins").select("id").eq("tel", cleanTel).limit(1).maybeSingle();
  if (byTel) {
    return {
      ok: false,
      error: "Vous avez déjà participé avec cet email ou ce numéro."
    };
  }
  return {
    ok: true
  };
});
const getDashboardData_createServerFn_handler = createServerRpc({
  id: "0b4255764242db65722e1fc1ee4f3c1f979640a26d3ac0148cc746bdc4a422c2",
  name: "getDashboardData",
  filename: "src/lib/spins.functions.ts"
}, (opts) => getDashboardData.__executeServer(opts));
const getDashboardData = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getDashboardData_createServerFn_handler, async () => {
  const PARTNERS = ["Peryssac", "Kiabi", "Gémo", "KIKO", "Le West"];
  const LIMIT_PER_SHOP = 2;
  const {
    data,
    error
  } = await supabaseAdmin.from("spins").select("*").order("created_at", {
    ascending: false
  }).limit(1e3);
  if (error) {
    console.error("getDashboardData error:", error);
    throw error;
  }
  const spins = data ?? [];
  const shopMap = /* @__PURE__ */ new Map();
  for (const p of PARTNERS) {
    shopMap.set(p, {
      boutique: p,
      total: 0,
      wins: 0,
      remaining: LIMIT_PER_SHOP
    });
  }
  for (const s of spins) {
    const cur = shopMap.get(s.boutique);
    if (!cur) continue;
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
    wins: spins.filter((s) => s.win).length
  };
});
const resetGame_createServerFn_handler = createServerRpc({
  id: "d5188315c4ba6fd5c7defb7147cb8e8dbd7d9f8e2fd629a0d1d61ff7c6124682",
  name: "resetGame",
  filename: "src/lib/spins.functions.ts"
}, (opts) => resetGame.__executeServer(opts));
const resetGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(resetGame_createServerFn_handler, async () => {
  const {
    error
  } = await supabaseAdmin.from("spins").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) {
    console.error("resetGame error:", error);
    return {
      ok: false,
      error: "Erreur lors de la réinitialisation."
    };
  }
  return {
    ok: true
  };
});
export {
  checkExisting_createServerFn_handler,
  getDashboardData_createServerFn_handler,
  recordSpin_createServerFn_handler,
  resetGame_createServerFn_handler
};
