"use client";

import { Calendar, DollarSign, Users, Award, Download, Eye, Hand, Flower2 } from "lucide-react";

function escapeCsvValue(value) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function MetricsTab({ appointments, clients }) {
  const totalAppointments = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === "Confirmado").length;
  const noShowCount = appointments.filter(a => a.status === "No Asistió").length;
  const totalRevenue = appointments.reduce((sum, a) => sum + (a.status !== "Cancelado" ? a.price : 0), 0);
  const attendanceRate = totalAppointments > 0 ? Math.round(((totalAppointments - noShowCount) / totalAppointments) * 100) : 100;

  const eyesCount = appointments.filter(a => a.sectorId === "eyes").length;
  const handsCount = appointments.filter(a => a.sectorId === "hands").length;
  const bodyCount = appointments.filter(a => a.sectorId === "body").length;

  const ranking = [...clients].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 10);

  const handleExportCSV = () => {
    const rows = [];
    rows.push(["Reporte de Métricas - GLOW UP"]);
    rows.push([`Generado el ${new Date().toLocaleString("es-AR")}`]);
    rows.push([]);
    rows.push(["Total Turnos", "Confirmados", "No-shows", "Ingresos Estimados", "Tasa de Asistencia"]);
    rows.push([totalAppointments, confirmedCount, noShowCount, totalRevenue, `${attendanceRate}%`]);
    rows.push([]);
    rows.push(["Ranking de Clientas por Consumo"]);
    rows.push(["Puesto", "Nombre", "Teléfono", "Visitas", "Total Consumido (ARS)", "Estado de Confianza"]);
    ranking.forEach((c, idx) => {
      rows.push([idx + 1, c.name, c.phone, c.visitsCount, c.totalSpent, c.trustStatus || "trusted"]);
    });

    const csvContent = rows.map(row => row.map(escapeCsvValue).join(",")).join("\n");
    const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `metricas-glowup-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button onClick={handleExportCSV} className="btn-outline-gold" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
          <Download size={14} />
          <span>Exportar CSV</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "36px" }}>

        <div className="gold-card" style={{ padding: "20px", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--gold-primary)", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Turnos</span>
            <Calendar size={20} />
          </div>
          <div className="font-serif gold-text" style={{ fontSize: "2.2rem", fontWeight: "700" }}>{totalAppointments}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--accent-green)", marginTop: "4px" }}>{confirmedCount} Confirmados</div>
        </div>

        <div className="gold-card" style={{ padding: "20px", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--gold-primary)", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Ingresos Estimados</span>
            <DollarSign size={20} />
          </div>
          <div className="font-serif gold-text" style={{ fontSize: "2.2rem", fontWeight: "700" }}>${totalRevenue.toLocaleString("es-AR")}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "4px" }}>Basado en agenda activa</div>
        </div>

        <div className="gold-card" style={{ padding: "20px", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--gold-primary)", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Clientas Registradas</span>
            <Users size={20} />
          </div>
          <div className="font-serif gold-text" style={{ fontSize: "2.2rem", fontWeight: "700" }}>{clients.length}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--gold-light)", marginTop: "4px" }}>Programa VIP Activo</div>
        </div>

        <div className="gold-card" style={{ padding: "20px", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--gold-primary)", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Tasa de Asistencia</span>
            <Award size={20} />
          </div>
          <div className="font-serif gold-text" style={{ fontSize: "2.2rem", fontWeight: "700" }}>{attendanceRate}%</div>
          <div style={{ fontSize: "0.78rem", color: noShowCount > 0 ? "#f87171" : "var(--accent-green)", marginTop: "4px" }}>
            {noShowCount} inasistencias registradas
          </div>
        </div>

      </div>

      {/* Sectors Breakdown Progress Bars */}
      <div className="gold-card" style={{ padding: "28px", background: "rgba(255,255,255,0.02)", marginBottom: "30px" }}>
        <h3 className="font-serif gold-text" style={{ fontSize: "1.6rem", marginBottom: "20px" }}>
          Distribución de Demanda por 3 Sectores
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.92rem" }}>
              <span style={{ color: "#fff", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}><Eye size={14} style={{ color: "var(--gold-primary)" }} /> Biuty Eyes (Pestañas & Cejas)</span>
              <span style={{ color: "var(--gold-light)", fontWeight: "700" }}>{eyesCount} turnos ({totalAppointments ? Math.round((eyesCount / totalAppointments) * 100) : 0}%)</span>
            </div>
            <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${totalAppointments ? (eyesCount / totalAppointments) * 100 : 0}%`, height: "100%", background: "var(--gold-gradient)" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.92rem" }}>
              <span style={{ color: "#fff", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}><Hand size={14} style={{ color: "var(--gold-primary)" }} /> Biuty Hands (Nails & Pedicuría)</span>
              <span style={{ color: "var(--gold-light)", fontWeight: "700" }}>{handsCount} turnos ({totalAppointments ? Math.round((handsCount / totalAppointments) * 100) : 0}%)</span>
            </div>
            <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${totalAppointments ? (handsCount / totalAppointments) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg, #ec4899, #f43f5e)" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.92rem" }}>
              <span style={{ color: "#fff", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}><Flower2 size={14} style={{ color: "var(--gold-primary)" }} /> Biuty Body (Depilación, Bronceado & Capilar)</span>
              <span style={{ color: "var(--gold-light)", fontWeight: "700" }}>{bodyCount} turnos ({totalAppointments ? Math.round((bodyCount / totalAppointments) * 100) : 0}%)</span>
            </div>
            <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${totalAppointments ? (bodyCount / totalAppointments) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Ranking */}
      <div className="gold-card" style={{ padding: "28px", background: "rgba(255,255,255,0.02)" }}>
        <h3 className="font-serif gold-text" style={{ fontSize: "1.6rem", marginBottom: "6px" }}>Ranking de Clientas por Consumo</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
          Ideal para sorteos o beneficios especiales de fin de año.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--gold-border)", color: "var(--gold-light)" }}>
                <th style={{ padding: "10px" }}>Puesto</th>
                <th style={{ padding: "10px" }}>Nombre</th>
                <th style={{ padding: "10px" }}>Visitas</th>
                <th style={{ padding: "10px" }}>Total Consumido</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((c, idx) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "10px", fontWeight: "700", color: "var(--gold-primary)" }}>#{idx + 1}</td>
                  <td style={{ padding: "10px", color: "#fff", fontWeight: "600" }}>{c.name}</td>
                  <td style={{ padding: "10px", color: "var(--text-muted)" }}>{c.visitsCount}</td>
                  <td style={{ padding: "10px", color: "var(--gold-light)", fontWeight: "700" }}>${c.totalSpent.toLocaleString("es-AR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
