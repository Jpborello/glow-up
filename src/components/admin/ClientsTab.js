"use client";

import { Send, ShieldCheck, ShieldAlert, ShieldX, Star } from "lucide-react";

const TRUST_LABELS = {
  trusted: { label: "Confiable", bg: "rgba(16,185,129,0.15)", color: "#34d399", Icon: ShieldCheck },
  restricted: { label: "Restringida (seña)", bg: "rgba(212,175,55,0.15)", color: "var(--gold-light)", Icon: ShieldAlert },
  blocked: { label: "Bloqueada", bg: "rgba(239,68,68,0.15)", color: "#f87171", Icon: ShieldX }
};

export default function ClientsTab({ clients, onAddClientPoints, onSetClientTrustStatus }) {
  const getWhatsAppLink = (phone, name) => {
    const cleaned = phone.replace(/\D/g, "");
    const msg = encodeURIComponent(`¡Hola ${name}! Tenés puntos Glow acumulados en GLOW UP. ¡Te esperamos con un beneficio exclusivo!`);
    return `https://wa.me/${cleaned}?text=${msg}`;
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", background: "var(--gold-gradient-soft)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius-md)", padding: "18px 22px" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          El <strong style={{ color: "var(--gold-light)" }}>estado de confianza</strong> se ajusta solo cuando marcás una inasistencia dos veces (pasa a &quot;Restringida&quot;), pero también podés cambiarlo manualmente acá. Una clienta restringida deberá pagar una seña para reservar; una bloqueada no puede reservar online.
        </p>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--gold-border)", color: "var(--gold-light)" }}>
              <th style={{ padding: "12px" }}>Clienta</th>
              <th style={{ padding: "12px" }}>Nivel VIP</th>
              <th style={{ padding: "12px" }}>Glow Points</th>
              <th style={{ padding: "12px" }}>Visitas</th>
              <th style={{ padding: "12px" }}>Total Invertido</th>
              <th style={{ padding: "12px" }}>Inasistencias</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Confianza</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((cli) => {
              const trustStatus = cli.trustStatus || "trusted";
              const trustInfo = TRUST_LABELS[trustStatus];
              const TrustIcon = trustInfo.Icon;
              const isTrusted = trustStatus === "trusted";
              return (
                <tr key={cli.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "700", color: "#fff" }}>{cli.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{cli.phone}</div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      className="badge-gold"
                      style={{ fontSize: "0.72rem", background: cli.tier.includes("Platinum") ? "linear-gradient(135deg, rgba(230,197,148,0.3) 0%, rgba(212,175,55,0.4) 100%)" : "rgba(212,175,55,0.15)" }}
                    >
                      <Star size={11} />
                      {cli.tier}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span className="gold-text font-serif" style={{ fontSize: "1.3rem", fontWeight: "800" }}>{cli.points} pts</span>
                  </td>
                  <td style={{ padding: "12px", color: "#fff" }}>{cli.visitsCount} asistencias</td>
                  <td style={{ padding: "12px", color: "var(--gold-light)", fontWeight: "600" }}>${cli.totalSpent.toLocaleString("es-AR")}</td>
                  <td style={{ padding: "12px", color: (cli.noShowCount || 0) > 0 ? "#f87171" : "var(--text-muted)", fontWeight: "600" }}>
                    {cli.noShowCount || 0}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <span
                      title={
                        trustStatus === "trusted" ? "Clienta confiable, sin restricciones" :
                        trustStatus === "restricted" ? "Debe pagar seña y esperar aprobación de su próximo turno" :
                        "No puede reservar turnos online"
                      }
                      style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", padding: "3px 10px", borderRadius: "12px", fontWeight: "700", background: trustInfo.bg, color: trustInfo.color }}
                    >
                      <TrustIcon size={12} /> {trustInfo.label}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                      <button onClick={() => onAddClientPoints(cli.id, 50)} className="btn-outline-gold" style={{ padding: "4px 10px", fontSize: "0.72rem" }}>
                        +50 pts
                      </button>

                      <a href={getWhatsAppLink(cli.phone, cli.name)} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "4px 10px", fontSize: "0.72rem", background: "#25D366", color: "#fff" }}>
                        <Send size={11} /> Promo
                      </a>

                      {trustStatus !== "blocked" && (
                        <button
                          onClick={() => onSetClientTrustStatus(cli.phone, isTrusted ? "restricted" : "trusted")}
                          style={{ background: "none", border: "1px solid var(--gold-border)", color: "var(--gold-light)", borderRadius: "6px", padding: "4px 8px", fontSize: "0.7rem", fontWeight: "700", cursor: "pointer" }}
                        >
                          {isTrusted ? "Restringir" : "Marcar Confiable"}
                        </button>
                      )}

                      <button
                        onClick={() => onSetClientTrustStatus(cli.phone, trustStatus === "blocked" ? "trusted" : "blocked")}
                        style={{ background: "none", border: `1px solid ${trustStatus === "blocked" ? "var(--accent-green)" : "var(--accent-red)"}`, color: trustStatus === "blocked" ? "var(--accent-green)" : "var(--accent-red)", borderRadius: "6px", padding: "4px 8px", fontSize: "0.7rem", fontWeight: "700", cursor: "pointer" }}
                      >
                        {trustStatus === "blocked" ? "Desbloquear" : "Bloquear"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
