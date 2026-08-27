"use client";

import { useState } from "react";
import { Search, Trash2, Phone, UserX, RotateCcw, BadgeCheck, Plus } from "lucide-react";
import { SPECIALISTS } from "../../lib/constants";

const SECTOR_DEFAULT_SPECIALIST = {
  eyes: `${SPECIALISTS.aye.name} - ${SPECIALISTS.aye.role}`,
  hands: `${SPECIALISTS.hands.name} - ${SPECIALISTS.hands.role}`,
  body: `${SPECIALISTS.emi.name} - ${SPECIALISTS.emi.role}`
};

const STATUS_STYLES = {
  Confirmado: { bg: "rgba(16,185,129,0.2)", color: "#34d399" },
  Pendiente: { bg: "rgba(59,130,246,0.2)", color: "#60a5fa" },
  "Seña Pendiente": { bg: "rgba(212,175,55,0.2)", color: "var(--gold-light)" },
  Completado: { bg: "rgba(59,130,246,0.2)", color: "#60a5fa" },
  Cancelado: { bg: "rgba(239,68,68,0.2)", color: "#f87171" },
  "No Asistió": { bg: "rgba(239,68,68,0.2)", color: "#f87171" }
};

const todayStr = () => new Date().toISOString().split("T")[0];

export default function AppointmentsTab({
  appointments,
  onUpdateAppointmentStatus,
  onAddManualAppointment,
  onDeleteAppointment,
  onMarkNoShow,
  onApproveDeposit,
  timeSlotOptions
}) {
  const [viewMode, setViewMode] = useState("all"); // today | all | pending
  const [sectorFilter, setSectorFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [manualForm, setManualForm] = useState({
    sectorId: "eyes",
    sectorName: "Biuty Eyes",
    serviceName: "Lifting & Laminado de Pestañas",
    clientName: "",
    clientPhone: "",
    date: todayStr(),
    time: timeSlotOptions[0] || "08:00",
    specialist: SECTOR_DEFAULT_SPECIALIST.eyes,
    price: 18500
  });

  const getWhatsAppLink = (phone, name, date, time) => {
    const cleaned = phone.replace(/\D/g, "");
    const msg = encodeURIComponent(`¡Hola ${name}! Te escribimos de GLOW UP para confirmarte y recordarte tu turno del ${date} a las ${time} hs.`);
    return `https://wa.me/${cleaned}?text=${msg}`;
  };

  const filteredAppointments = appointments.filter((app) => {
    const matchesSector = sectorFilter === "all" || app.sectorId === sectorFilter;
    const matchesView =
      viewMode === "all" ? true :
      viewMode === "today" ? app.date === todayStr() :
      viewMode === "pending" ? (app.status === "Seña Pendiente" || app.status === "Pendiente") :
      true;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      app.clientName.toLowerCase().includes(term) ||
      app.serviceName.toLowerCase().includes(term) ||
      app.id.toLowerCase().includes(term);
    return matchesSector && matchesView && matchesSearch;
  }).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.clientName || !manualForm.clientPhone) return;

    onAddManualAppointment({
      id: `TURN-${Math.floor(1000 + Math.random() * 9000)}`,
      ...manualForm,
      status: "Confirmado",
      createdAt: new Date().toISOString()
    });
    setShowAddModal(false);
    setManualForm({ ...manualForm, clientName: "", clientPhone: "" });
  };

  const viewLabels = { today: "Turnos de Hoy", all: "Todos los Turnos", pending: "Por Confirmar" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div style={{ display: "flex", border: "1px solid var(--gold-border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          {["today", "all", "pending"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              style={{
                padding: "8px 16px",
                fontSize: "0.82rem",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
                background: viewMode === mode ? "var(--gold-gradient)" : "transparent",
                color: viewMode === mode ? "#000" : "var(--text-muted)"
              }}
            >
              {viewLabels[mode]}
            </button>
          ))}
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-gold" style={{ padding: "8px 20px", fontSize: "0.88rem" }}>
          <Plus size={16} />
          <span>Nuevo Turno Manual</span>
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Buscar clienta o servicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px 12px 8px 36px", borderRadius: "var(--radius-full)", border: "1px solid var(--gold-border)", background: "#0b0c10", color: "#fff", fontSize: "0.88rem", width: "240px" }}
          />
        </div>

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          style={{ padding: "8px 16px", borderRadius: "var(--radius-full)", border: "1px solid var(--gold-border)", background: "#0b0c10", color: "#fff", fontSize: "0.88rem" }}
        >
          <option value="all">Todos los Sectores</option>
          <option value="eyes">Biuty Eyes</option>
          <option value="hands">Biuty Hands</option>
          <option value="body">Biuty Body</option>
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--gold-border)", color: "var(--gold-light)" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Sector & Tratamiento</th>
              <th style={{ padding: "12px" }}>Clienta</th>
              <th style={{ padding: "12px" }}>Fecha & Hora</th>
              <th style={{ padding: "12px" }}>Monto</th>
              <th style={{ padding: "12px" }}>Estado</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>
                  No se encontraron turnos con los filtros actuales.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((app) => {
                const statusStyle = STATUS_STYLES[app.status] || STATUS_STYLES.Pendiente;
                return (
                  <tr key={app.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "12px", fontWeight: "700", color: "var(--gold-light)" }}>#{app.id}</td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: "600", color: "#fff" }}>{app.serviceName}</div>
                      <span className="badge-gold" style={{ fontSize: "0.68rem" }}>{app.sectorName}</span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ color: "#fff" }}>{app.clientName}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{app.clientPhone}</div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ color: "#fff" }}>{app.date}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--gold-light)" }}>{app.time} hs</div>
                    </td>
                    <td style={{ padding: "12px", fontWeight: "700", color: "var(--gold-primary)" }}>
                      ${app.price.toLocaleString("es-AR")}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <select
                        value={app.status}
                        onChange={(e) => onUpdateAppointmentStatus(app.id, e.target.value)}
                        style={{ padding: "4px 8px", borderRadius: "6px", border: "none", background: statusStyle.bg, color: statusStyle.color, fontWeight: "700", fontSize: "0.8rem" }}
                      >
                        <option value="Confirmado">Confirmado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Seña Pendiente">Seña Pendiente</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="No Asistió">No Asistió</option>
                      </select>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                        <a
                          href={getWhatsAppLink(app.clientPhone, app.clientName, app.date, app.time)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-icon"
                          style={{ width: "30px", height: "30px", color: "#25D366" }}
                          title="Recordatorio por WhatsApp"
                        >
                          <Phone size={13} />
                        </a>

                        {app.status === "Seña Pendiente" && (
                          <button
                            onClick={() => onApproveDeposit(app.id)}
                            className="btn-icon"
                            style={{ width: "30px", height: "30px", color: "var(--accent-green)" }}
                            title="Aprobar seña recibida"
                          >
                            <BadgeCheck size={14} />
                          </button>
                        )}

                        {app.status === "No Asistió" ? (
                          <button
                            onClick={() => onMarkNoShow(app.id, false)}
                            className="btn-icon"
                            style={{ width: "30px", height: "30px" }}
                            title="Deshacer no-show"
                          >
                            <RotateCcw size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => onMarkNoShow(app.id, true)}
                            className="btn-icon"
                            style={{ width: "30px", height: "30px" }}
                            title="Marcar que no se presentó"
                          >
                            <UserX size={14} />
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteAppointment(app.id)}
                          className="btn-icon"
                          style={{ width: "30px", height: "30px", color: "var(--accent-red)" }}
                          title="Eliminar Turno"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Appointment Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)} style={{ zIndex: 1200 }}>
          <div className="gold-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px", width: "100%", padding: "28px", background: "#12141c" }}>
            <h3 className="font-serif gold-text" style={{ fontSize: "1.6rem", marginBottom: "20px" }}>Agregar Turno Manual</h3>

            <form onSubmit={handleManualSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "0.85rem", color: "var(--gold-light)" }}>Sector *</label>
                <select
                  value={manualForm.sectorId}
                  onChange={(e) => {
                    const sec = e.target.value;
                    const secName = sec === "eyes" ? "Biuty Eyes" : sec === "hands" ? "Biuty Hands" : "Biuty Body";
                    setManualForm({ ...manualForm, sectorId: sec, sectorName: secName, specialist: SECTOR_DEFAULT_SPECIALIST[sec] });
                  }}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#0b0c10", color: "#fff", border: "1px solid var(--gold-border)" }}
                >
                  <option value="eyes">Biuty Eyes</option>
                  <option value="hands">Biuty Hands</option>
                  <option value="body">Biuty Body</option>
                </select>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "0.85rem", color: "var(--gold-light)" }}>Nombre Tratamiento *</label>
                <input
                  type="text"
                  required
                  value={manualForm.serviceName}
                  onChange={(e) => setManualForm({ ...manualForm, serviceName: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#0b0c10", color: "#fff", border: "1px solid var(--gold-border)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "var(--gold-light)" }}>Clienta *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.clientName}
                    onChange={(e) => setManualForm({ ...manualForm, clientName: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#0b0c10", color: "#fff", border: "1px solid var(--gold-border)" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "var(--gold-light)" }}>Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={manualForm.clientPhone}
                    onChange={(e) => setManualForm({ ...manualForm, clientPhone: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#0b0c10", color: "#fff", border: "1px solid var(--gold-border)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "var(--gold-light)" }}>Fecha *</label>
                  <input
                    type="date"
                    required
                    value={manualForm.date}
                    onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#0b0c10", color: "#fff", border: "1px solid var(--gold-border)" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "var(--gold-light)" }}>Hora *</label>
                  <select
                    value={manualForm.time}
                    onChange={(e) => setManualForm({ ...manualForm, time: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#0b0c10", color: "#fff", border: "1px solid var(--gold-border)" }}
                  >
                    {timeSlotOptions.map((t) => <option key={t} value={t}>{t} hs</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline-gold" style={{ flex: 1 }}>Cancelar</button>
                <button type="submit" className="btn-gold" style={{ flex: 1, justifyContent: "center" }}>Guardar Turno</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
