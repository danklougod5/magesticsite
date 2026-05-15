import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData, resetGame } from "@/lib/spins.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, RotateCcw, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard – Roue de la Fortune Majestic" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function DashboardPage() {
  const navigate = useNavigate();
  const fetchData = useServerFn(getDashboardData);
  const resetFn = useServerFn(resetGame);
  
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["dashboard-spins"],
    queryFn: () => fetchData(),
    refetchInterval: 10000,
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const handleReset = async () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser TOUTES les données ? Cette action est irréversible et servira pour le passage en production.")) {
      try {
        await resetFn();
        refetch();
        alert("Le compteur et les lots ont été réinitialisés à zéro.");
      } catch (err) {
        alert("Erreur lors de la réinitialisation");
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-8" style={{ cursor: "auto" }}>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl">
              Tableau de <span className="text-primary">bord</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Suivi des participations à la Roue de la Fortune Majestic
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 text-xs uppercase tracking-widest border border-border rounded-md px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isFetching ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-xs uppercase tracking-widest border border-destructive/50 text-destructive rounded-md px-4 py-2 hover:bg-destructive hover:text-white transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              Réinitialiser
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs uppercase tracking-widest bg-muted rounded-md px-4 py-2 hover:bg-muted/80 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              Déconnecter
            </button>
          </div>
        </header>

        {isLoading && <p className="text-muted-foreground">Chargement…</p>}

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total participations" value={data.total} />
              <StatCard label="Gagnants" value={data.wins} accent />
              <StatCard label="Lots restants" value={10 - data.wins} />
              <StatCard
                label="Taux de gain"
                value={data.total ? `${Math.round((data.wins / data.total) * 100)}%` : "0%"}
              />
            </div>

            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Disponibilité des lots par boutique</CardTitle>
              </CardHeader>
              <CardContent>
                {data.byShop.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune participation pour le moment.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Boutique</TableHead>
                        <TableHead className="text-right">Tours effectués</TableHead>
                        <TableHead className="text-right">Gagnants</TableHead>
                        <TableHead className="text-right">Lots restants</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.byShop.map((s) => (
                        <TableRow key={s.boutique}>
                          <TableCell className="font-medium">{s.boutique}</TableCell>
                          <TableCell className="text-right">{s.total}</TableCell>
                          <TableCell className="text-right text-primary font-semibold">{s.wins}</TableCell>
                          <TableCell className={`text-right font-bold ${s.remaining === 0 ? "text-muted-foreground line-through" : "text-green-500"}`}>
                            {s.remaining} / 2
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Détail des participants</CardTitle>
              </CardHeader>
              <CardContent>
                {data.spins.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucun participant pour le moment.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Boutique</TableHead>
                          <TableHead>Lot gagné</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.spins.map((s) => (
                          <TableRow key={s.id}>
                            <TableCell className="text-xs whitespace-nowrap">
                              {new Date(s.created_at).toLocaleString("fr-FR")}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {s.prenom} {s.nom}
                            </TableCell>
                            <TableCell className="text-xs">{s.email}</TableCell>
                            <TableCell className="text-xs whitespace-nowrap">{s.tel}</TableCell>
                            <TableCell>{s.boutique}</TableCell>
                            <TableCell>
                              {s.win ? (
                                <span className="text-primary font-semibold">{s.prize}</span>
                              ) : (
                                <span className="text-muted-foreground">{s.prize}</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className={`text-4xl font-display mt-2 ${accent ? "text-primary" : ""}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
