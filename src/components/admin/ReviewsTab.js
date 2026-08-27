"use client";

import { MessageSquare, Star, Trash2 } from "lucide-react";

export default function ReviewsTab({ reviews, onApproveReview, onDeleteReview }) {
  return (
    <div>
      {reviews.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0", color: "var(--text-muted)" }}>
          <MessageSquare size={40} style={{ color: "var(--gold-primary)", marginBottom: "10px" }} />
          <p>No hay opiniones registradas para moderar.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="gold-card"
              style={{
                padding: "20px 24px",
                borderLeft: rev.status === "Pendiente" ? "4px solid var(--gold-primary)" : "4px solid var(--accent-green)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap"
              }}
            >
              <div style={{ flex: 1, minWidth: "240px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#fff" }}>{rev.clientName}</span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      background: rev.status === "Pendiente" ? "rgba(212,175,55,0.15)" : "rgba(16,185,129,0.15)",
                      color: rev.status === "Pendiente" ? "var(--gold-light)" : "#34d399"
                    }}
                  >
                    {rev.status}
                  </span>
                  <span style={{ color: "var(--gold-primary)", display: "flex", gap: "2px", alignItems: "center", fontSize: "0.9rem" }}>
                    <Star size={13} fill="var(--gold-primary)" />
                    <strong>{rev.rating}.0</strong>
                  </span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", fontStyle: "italic", margin: "4px 0" }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Enviado: {new Date(rev.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {rev.status === "Pendiente" && (
                  <button onClick={() => onApproveReview(rev.id)} className="btn-gold" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                    Aprobar
                  </button>
                )}
                <button onClick={() => onDeleteReview(rev.id)} className="btn-icon" style={{ width: "34px", height: "34px", color: "var(--accent-red)" }} title="Eliminar opinión">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
