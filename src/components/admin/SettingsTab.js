"use client";

import { useState } from "react";
import { Trash2, CalendarOff, Clock, PlusCircle, ShieldAlert } from "lucide-react";
import { BASE_TIME_SLOTS, WEEKDAY_LABELS } from "../../data/initialData";

export default function SettingsTab({
  settings,
  onToggleWeekday,
  onAddBlockedDate,
  onRemoveBlockedDate,
  onAddBlockedSlot,
  onRemoveBlockedSlot,
  onAddExtraSlot,
  onRemoveExtraSlot,
  onSaveDepositSettings
}) {
  const [dateToBlock, setDateToBlock] = useState("");
  const [slotDateToBlock, setSlotDateToBlock] = useState("");
  const [slotTimeToBlock, setSlotTimeToBlock] = useState(BASE_TIME_SLOTS[0]);
  const [extraDate, setExtraDate] = useState("");
  const [extraTime, setExtraTime] = useState("19:00");

  const [depositAmount, setDepositAmount] = useState(settings.restrictedDepositAmount);
  const [depositInstructions, setDepositInstructions] = useState(settings.depositPaymentInstructions);

  const formatDate = (dateStr) =>
    new Date(`${dateStr}T00:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

  const handleBlockDate = (e) => {
    e.preventDefault();
    if (!dateToBlock) return;
    onAddBlockedDate(dateToBlock);
    setDateToBlock("");
  };

  const handleBlockSlot = (e) => {
    e.preventDefault();
    if (!slotDateToBlock || !slotTimeToBlock) return;
    onAddBlockedSlot(slotDateToBlock, slotTimeToBlock);
    setSlotDateToBlock("");
  };

  const handleAddExtraSlot = (e) => {
    e.preventDefault();
    if (!extraDate || !extraTime) return;
    onAddExtraSlot(extraDate, extraTime);
    setExtraDate("");
  };

  const handleSaveDeposit = (e) => {
    e.preventDefault();
    onSaveDepositSettings({
      restrictedDepositAmount: parseInt(depositAmount, 10) || 0,
      depositPaymentInstructions: depositInstructions
    });
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--gold-border)",
    background: "#0b0c10",
    color: "#fff",
    fontSize: "0.88rem"
  };

  const blockPill = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.85rem"
  };

  const extraPill = {
    ...blockPill,
    background: "rgba(16,185,129,0.08)",
    border: "1px solid rgba(16,185,129,0.2)"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

      {/* Días habilitados */}
      <div className="gold-card" style={{ padding: "26px", background: "rgba(255,255,255,0.02)" }}>
        <h3 className="font-serif gold-text" style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Días de Atención</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "18px" }}>
          La grilla base de horarios es de {BASE_TIME_SLOTS[0]} a {BASE_TIME_SLOTS[BASE_TIME_SLOTS.length - 1]} hs, cada 2 horas. Activá o desactivá días completos según tu semana laboral.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
          {WEEKDAY_LABELS.map((day) => {
            const isBlocked = settings.blockedWeekdays.includes(day.val);
            return (
              <label
                key={day.val}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: isBlocked ? "1px solid rgba(239,68,68,0.3)" : "1px solid var(--gold-border)",
                  background: isBlocked ? "rgba(239,68,68,0.06)" : "rgba(212,175,55,0.08)",
                  cursor: "pointer"
                }}
              >
                <input type="checkbox" checked={!isBlocked} onChange={() => onToggleWeekday(day.val)} />
                <span style={{ fontSize: "0.88rem", color: isBlocked ? "var(--text-muted)" : "#fff", fontWeight: "600" }}>
                  {day.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bloquear fechas completas */}
      <div className="gold-card" style={{ padding: "26px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <CalendarOff size={20} style={{ color: "var(--gold-primary)" }} />
          <h3 className="font-serif gold-text" style={{ fontSize: "1.4rem" }}>Bloquear Fechas Completas</h3>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          Ideal para feriados, vacaciones o días puntuales que el local no abre.
        </p>
        <form onSubmit={handleBlockDate} style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <input type="date" required value={dateToBlock} onChange={(e) => setDateToBlock(e.target.value)} style={{ ...inputStyle, flexGrow: 1, minWidth: "180px" }} />
          <button type="submit" className="btn-outline-gold" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>Bloquear Fecha</button>
        </form>
        {settings.blockedDates.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[...settings.blockedDates].sort().map((d) => (
              <div key={d} style={blockPill}>
                <span style={{ color: "#fff", fontWeight: "500" }}>{formatDate(d)}</span>
                <button onClick={() => onRemoveBlockedDate(d)} className="btn-icon" style={{ width: "28px", height: "28px", color: "var(--accent-red)" }} title="Desbloquear fecha">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic" }}>No hay fechas bloqueadas.</p>
        )}
      </div>

      {/* Bloquear horarios puntuales */}
      <div className="gold-card" style={{ padding: "26px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <Clock size={20} style={{ color: "var(--gold-primary)" }} />
          <h3 className="font-serif gold-text" style={{ fontSize: "1.4rem" }}>Bloquear Horarios Puntuales</h3>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          Cerrá un horario específico de un día en particular (ej. una especialista con turno médico ese día a las 12hs).
        </p>
        <form onSubmit={handleBlockSlot} style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <input type="date" required value={slotDateToBlock} onChange={(e) => setSlotDateToBlock(e.target.value)} style={{ ...inputStyle, flexGrow: 1, minWidth: "160px" }} />
          <select value={slotTimeToBlock} onChange={(e) => setSlotTimeToBlock(e.target.value)} style={inputStyle}>
            {BASE_TIME_SLOTS.map((t) => <option key={t} value={t}>{t} hs</option>)}
          </select>
          <button type="submit" className="btn-outline-gold" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>Bloquear Horario</button>
        </form>
        {settings.blockedSlots.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[...settings.blockedSlots].sort().map((key) => {
              const [d, t] = key.split("_");
              return (
                <div key={key} style={blockPill}>
                  <span style={{ color: "#fff", fontWeight: "500" }}>{formatDate(d)} — {t} hs</span>
                  <button onClick={() => onRemoveBlockedSlot(key)} className="btn-icon" style={{ width: "28px", height: "28px", color: "var(--accent-red)" }} title="Desbloquear horario">
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic" }}>No hay horarios bloqueados.</p>
        )}
      </div>

      {/* Horarios extra */}
      <div className="gold-card" style={{ padding: "26px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <PlusCircle size={20} style={{ color: "var(--accent-green)" }} />
          <h3 className="font-serif gold-text" style={{ fontSize: "1.4rem" }}>Agregar Horario Extra</h3>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          Habilitá un turno puntual fuera de la grilla fija (ej. un 19:30 excepcional para una clienta VIP).
        </p>
        <form onSubmit={handleAddExtraSlot} style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <input type="date" required value={extraDate} onChange={(e) => setExtraDate(e.target.value)} style={{ ...inputStyle, flexGrow: 1, minWidth: "160px" }} />
          <input type="time" required step="60" value={extraTime} onChange={(e) => setExtraTime(e.target.value)} style={inputStyle} />
          <button type="submit" className="btn-gold" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>Agregar</button>
        </form>
        {settings.extraSlots.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[...settings.extraSlots].sort().map((key) => {
              const [d, t] = key.split("_");
              return (
                <div key={key} style={extraPill}>
                  <span style={{ color: "#fff", fontWeight: "500" }}>{formatDate(d)} — {t} hs</span>
                  <button onClick={() => onRemoveExtraSlot(key)} className="btn-icon" style={{ width: "28px", height: "28px", color: "var(--accent-red)" }} title="Quitar horario extra">
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic" }}>No hay horarios extra agregados.</p>
        )}
      </div>

      {/* Seña para clientas restringidas */}
      <div className="gold-card" style={{ padding: "26px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <ShieldAlert size={20} style={{ color: "var(--gold-primary)" }} />
          <h3 className="font-serif gold-text" style={{ fontSize: "1.4rem" }}>Seña para Clientas Restringidas</h3>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          Monto e instrucciones que se le muestran a una clienta marcada como &quot;Restringida&quot; (por inasistencias) cuando reserva un turno. Queda a la espera hasta que apruebes la seña desde la pestaña de Turnos.
        </p>
        <form onSubmit={handleSaveDeposit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "480px" }}>
          <div>
            <label style={{ fontSize: "0.82rem", color: "var(--gold-light)", fontWeight: "600", display: "block", marginBottom: "6px" }}>Monto de la Seña (ARS)</label>
            <input type="number" min="0" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.82rem", color: "var(--gold-light)", fontWeight: "600", display: "block", marginBottom: "6px" }}>Instrucciones de Pago</label>
            <textarea rows={2} value={depositInstructions} onChange={(e) => setDepositInstructions(e.target.value)} style={{ ...inputStyle, width: "100%", resize: "vertical" }} />
          </div>
          <button type="submit" className="btn-gold" style={{ padding: "10px 20px", fontSize: "0.85rem", alignSelf: "flex-start" }}>Guardar Configuración</button>
        </form>
      </div>

    </div>
  );
}
