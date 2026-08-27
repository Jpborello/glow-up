"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { INITIAL_SERVICES } from "../data/initialData";
import { getSlotsForDate, isDateBookable } from "../lib/scheduling";
import { SPECIALISTS, BUSINESS_INFO } from "../lib/constants";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle2, Sparkles, Send, ShieldAlert, ChevronRight, ArrowLeft, AlertTriangle, Flower2, Hand, Eye } from "lucide-react";

// Normaliza un teléfono a solo dígitos para poder comparar dos números
// aunque estén tipeados distinto (con o sin +54, espacios, guiones, etc.)
function normalizePhone(phone) {
  return (phone || "").replace(/\D/g, "");
}

export default function BookingSection({ preselectedService, onAppointmentCreated, settings, clients = [] }) {
  // Sectors definitions as requested
  const sectors = [
    {
      id: "body",
      name: "Biuty Body",
      Icon: Flower2,
      subtitle: "Depilación Definitiva, Bronceado & Capilar"
    },
    {
      id: "hands",
      name: "Biuty Hands",
      Icon: Hand,
      subtitle: "Nails, Kapping, Esculpidas & Pedicuría"
    },
    {
      id: "eyes",
      name: "Biuty Eyes",
      Icon: Eye,
      subtitle: "Pestañas & Estilismo de Cejas"
    }
  ];

  const [activeSector, setActiveSector] = useState("eyes");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const [step, setStep] = useState(1);
  const [createdTicket, setCreatedTicket] = useState(null);
  const [blockedMessage, setBlockedMessage] = useState("");

  // If a preselected service comes from ServicesSection
  useEffect(() => {
    if (preselectedService) {
      setActiveSector(preselectedService.sectorId);
      setSelectedService(preselectedService);
      setStep(2);
      // Scroll to turnos
      const el = document.getElementById("turnos");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [preselectedService]);

  const currentSectorServices = INITIAL_SERVICES.filter(s => s.sectorId === activeSector);
  const currentSectorObj = sectors.find(s => s.id === activeSector);

  // Horarios disponibles para la fecha elegida: combina la grilla fija cada 2hs
  // (8 a 18hs) con lo que la admin haya bloqueado o habilitado como extra.
  const dateIsBookable = selectedDate ? isDateBookable(selectedDate, settings) : true;
  const timeSlots = useMemo(() => getSlotsForDate(selectedDate, settings), [selectedDate, settings]);

  // Clienta ya registrada que coincide con el teléfono ingresado (si existe),
  // para saber si tiene que pagar seña (restringida) o no puede reservar (bloqueada).
  const matchingClient = useMemo(() => {
    const normalized = normalizePhone(clientInfo.phone);
    if (!normalized) return null;
    return clients.find(c => normalizePhone(c.phone) === normalized) || null;
  }, [clientInfo.phone, clients]);

  const trustStatus = matchingClient?.trustStatus || "trusted";

  // Cada tratamiento tiene una especialista fija asignada (Emi, Aye o Keila,
  // según el sector) — no hace falta que la clienta elija profesional.
  const assignedSpecialist = selectedService ? SPECIALISTS[selectedService.specialistKey] : null;

  const handleSelectService = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    setSelectedTime("");
    if (value && !isDateBookable(value, settings)) {
      setBlockedMessage("No atendemos ese día. Elegí otra fecha del calendario (trabajamos de Lunes a Sábado, salvo feriados puntuales).");
    } else {
      setBlockedMessage("");
    }
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !clientInfo.name || !clientInfo.phone) {
      alert("Por favor completa los campos requeridos.");
      return;
    }

    if (trustStatus === "blocked") {
      return; // El formulario ya muestra el aviso y oculta el botón de confirmar, esto es un resguardo extra.
    }

    const appointmentId = `TURN-${Math.floor(1000 + Math.random() * 9000)}`;
    const requiresDeposit = trustStatus === "restricted";

    const newAppointment = {
      id: appointmentId,
      sectorId: activeSector,
      sectorName: currentSectorObj.name,
      serviceName: selectedService.title,
      clientName: clientInfo.name,
      clientPhone: clientInfo.phone,
      clientEmail: clientInfo.email || "No especificado",
      date: selectedDate,
      time: selectedTime,
      specialist: assignedSpecialist ? `${assignedSpecialist.name} - ${assignedSpecialist.role}` : "Especialista asignada",
      price: selectedService.price,
      status: requiresDeposit ? "Seña Pendiente" : "Confirmado",
      createdAt: new Date().toISOString()
    };

    setCreatedTicket(newAppointment);
    onAppointmentCreated(newAppointment);
    setStep(4); // Success ticket step
  };

  const getWhatsAppLink = (ticket) => {
    const isPendingDeposit = ticket.status === "Seña Pendiente";
    const depositLine = isPendingDeposit
      ? `%0A%0A*Tu turno queda a la espera de la seña de $${(settings?.restrictedDepositAmount || 0).toLocaleString("es-AR")}.*%0A${encodeURIComponent(settings?.depositPaymentInstructions || "")}%0AAdjunto mi comprobante de pago.`
      : "";
    const text = `¡Hola GLOW UP! Quisiera confirmar mi turno para *${ticket.serviceName}* en *${ticket.sectorName}*.%0A%0AFecha: ${ticket.date}%0AHora: ${ticket.time} hs%0AEspecialista: ${ticket.specialist}%0ACliente: ${ticket.clientName}%0ATeléfono: ${ticket.clientPhone}%0ACódigo Turno: #${ticket.id}${depositLine}%0A%0A¡Muchas gracias!`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
  };

  const resetForm = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    setClientInfo({ name: "", phone: "", email: "", notes: "" });
    setCreatedTicket(null);
    setBlockedMessage("");
  };

  return (
    <section id="turnos" className="section-padding" style={{ position: "relative", background: "linear-gradient(180deg, rgba(8,9,12,1) 0%, rgba(18,20,28,0.9) 100%)" }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 50px auto" }}>
          <span className="badge-gold" style={{ marginBottom: "16px" }}>
            <CalendarIcon size={14} style={{ color: "var(--gold-primary)" }} />
            <span>Sistema de Reservas Online</span>
          </span>
          <h2 className="font-serif" style={{ fontSize: "2.8rem", marginBottom: "16px" }}>
            Reserva tu Turno en nuestros <span className="gold-text">3 Sectores</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Elige el área de tratamiento que deseas realizarte y selecciona la fecha ideal para tu atención personalizada. Atendemos de Lunes a Sábado, de 8 a 18hs.
          </p>
        </div>

        {/* 3 Main Sector Tabs Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "40px"
          }}
          className="sectors-tabs-grid"
        >
          {sectors.map((sec) => {
            const isSelected = activeSector === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSector(sec.id);
                  setSelectedService(null);
                  setStep(1);
                }}
                className="gold-card"
                style={{
                  padding: "20px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  border: isSelected ? "2px solid var(--gold-primary)" : "1px solid rgba(212, 175, 55, 0.2)",
                  background: isSelected ? "var(--gold-gradient-soft)" : "var(--bg-card)",
                  boxShadow: isSelected ? "var(--gold-glow)" : "none"
                }}
              >
                <sec.Icon size={30} style={{ color: "var(--gold-primary)", marginBottom: "10px" }} />
                <h3 className="font-serif gold-text" style={{ fontSize: "1.4rem", fontWeight: "700" }}>
                  {sec.name}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  {sec.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Booking Container */}
        <div
          className="gold-card"
          style={{
            padding: "36px",
            background: "var(--bg-card)",
            maxWidth: "900px",
            margin: "0 auto",
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)"
          }}
        >

          {/* Stepper Indicator */}
          {step < 4 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="badge-gold" style={{ fontSize: "0.8rem" }}>
                  Paso {step} de 3
                </span>
                <span style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff" }}>
                  {step === 1 && `Seleccionar Servicio de ${currentSectorObj.name}`}
                  {step === 2 && "Especialista, Fecha & Horario"}
                  {step === 3 && "Confirmar mis Datos de Contacto"}
                </span>
              </div>

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="btn-outline-gold"
                  style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                >
                  <ArrowLeft size={14} />
                  <span>Volver</span>
                </button>
              )}
            </div>
          )}

          {/* STEP 1: Select Service for Active Sector */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "20px" }}>
                Selecciona uno de los servicios disponibles para <strong style={{ color: "var(--gold-light)" }}>{currentSectorObj.name}</strong>:
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
                {currentSectorServices.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => handleSelectService(svc)}
                    className="gold-card"
                    style={{
                      padding: "20px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      border: selectedService?.id === svc.id ? "1px solid var(--gold-primary)" : "1px solid rgba(255,255,255,0.1)"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--gold-light)", fontWeight: "700" }}>{svc.category}</span>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{svc.duration}</span>
                      </div>
                      <h4 className="font-serif" style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "8px" }}>
                        {svc.title}
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                        {svc.description}
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="gold-text font-serif" style={{ fontSize: "1.3rem", fontWeight: "700" }}>
                        ${svc.price.toLocaleString("es-AR")}
                      </span>
                      <span className="btn-gold" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                        Elegir <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Specialist, Date & Time */}
          {step === 2 && selectedService && (
            <div>
              {/* Selected Summary Bar */}
              <div style={{ background: "rgba(212,175,55,0.08)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius-sm)", padding: "14px 20px", marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--gold-light)", textTransform: "uppercase" }}>Servicio Elegido:</span>
                  <div className="font-serif gold-text" style={{ fontSize: "1.3rem", fontWeight: "700" }}>{selectedService.title} (${selectedService.price.toLocaleString("es-AR")})</div>
                </div>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "var(--gold-light)", fontSize: "0.85rem", textDecoration: "underline", cursor: "pointer" }}>
                  Cambiar
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }} className="step2-grid">

                {/* Especialista asignada: cada tratamiento tiene una profesional fija */}
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", color: "#fff", marginBottom: "10px" }}>
                    1. Tu Profesional Asignada:
                  </label>
                  {assignedSpecialist && (
                    <div
                      style={{
                        padding: "16px 18px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--gold-primary)",
                        background: "rgba(212,175,55,0.1)",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          background: "var(--gold-gradient)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        {assignedSpecialist.photo ? (
                          <Image
                            src={assignedSpecialist.photo}
                            alt={assignedSpecialist.name}
                            fill
                            sizes="48px"
                            style={{ objectFit: "cover" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : null}
                        <span className="font-serif" style={{ fontSize: "1.3rem", fontWeight: "700", color: "#0b0c10" }}>
                          {assignedSpecialist.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: "1rem", color: "#fff", fontWeight: "700" }}>{assignedSpecialist.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--gold-light)" }}>{assignedSpecialist.role}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date & Time Picker */}
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", color: "#fff", marginBottom: "10px" }}>
                    2. Fecha del Turno:
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--gold-border)",
                      background: "#0b0c10",
                      color: "#fff",
                      fontSize: "0.95rem",
                      marginBottom: blockedMessage ? "10px" : "20px"
                    }}
                  />

                  {blockedMessage && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-sm)", padding: "10px 12px", marginBottom: "20px", fontSize: "0.82rem", color: "#f87171" }}>
                      <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: "1px" }} />
                      <span>{blockedMessage}</span>
                    </div>
                  )}

                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", color: "#fff", marginBottom: "10px" }}>
                    3. Horarios Disponibles:
                  </label>
                  {dateIsBookable && timeSlots.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          style={{
                            padding: "10px",
                            borderRadius: "var(--radius-sm)",
                            border: selectedTime === slot ? "1px solid var(--gold-primary)" : "1px solid rgba(255,255,255,0.1)",
                            background: selectedTime === slot ? "var(--gold-gradient)" : "rgba(255,255,255,0.05)",
                            color: selectedTime === slot ? "#000" : "#fff",
                            fontWeight: "700",
                            fontSize: "0.9rem",
                            cursor: "pointer"
                          }}
                        >
                          {slot} hs
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px dashed rgba(255,255,255,0.1)" }}>
                      {selectedDate ? "No hay horarios disponibles para esta fecha." : "Elegí primero una fecha para ver los horarios."}
                    </div>
                  )}
                </div>

              </div>

              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                  className="btn-gold"
                  style={{ padding: "12px 30px", opacity: (!selectedDate || !selectedTime) ? 0.5 : 1 }}
                >
                  <span>Siguiente: Tus Datos</span>
                  <ChevronRight size={18} />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Client Details Form */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-grid">
                <div>
                  <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "var(--gold-light)", marginBottom: "6px" }}>
                    Nombre & Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Sofia Martínez"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--gold-border)",
                      background: "#0b0c10",
                      color: "#fff"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "var(--gold-light)", marginBottom: "6px" }}>
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: +54 9 11 1234-5678"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--gold-border)",
                      background: "#0b0c10",
                      color: "#fff"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "var(--gold-light)", marginBottom: "6px" }}>
                  Email de Contacto (opcional)
                </label>
                <input
                  type="email"
                  placeholder="sofia@ejemplo.com"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--gold-border)",
                    background: "#0b0c10",
                    color: "#fff"
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "var(--gold-light)", marginBottom: "6px" }}>
                  Notas o Preferencias Especiales
                </label>
                <textarea
                  rows={3}
                  placeholder="Indícanos si tenés alguna alergia, preferencia de tono o consulta previa..."
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--gold-border)",
                    background: "#0b0c10",
                    color: "#fff",
                    resize: "vertical"
                  }}
                />
              </div>

              {/* Aviso de clienta restringida: le informamos que va a tener que pagar seña */}
              {trustStatus === "restricted" && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "rgba(212,175,55,0.1)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginBottom: "24px" }}>
                  <ShieldAlert size={20} style={{ color: "var(--gold-primary)", flexShrink: 0, marginTop: "1px" }} />
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    <strong style={{ color: "var(--gold-light)" }}>Tu turno va a quedar pendiente de una seña de ${(settings?.restrictedDepositAmount || 0).toLocaleString("es-AR")}.</strong> {settings?.depositPaymentInstructions} Una vez que confirmes el pago por WhatsApp, aprobamos tu turno.
                  </div>
                </div>
              )}

              {/* Aviso de clienta bloqueada: no puede reservar online */}
              {trustStatus === "blocked" ? (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-sm)", padding: "16px 18px" }}>
                  <AlertTriangle size={20} style={{ color: "#f87171", flexShrink: 0, marginTop: "1px" }} />
                  <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                    <strong style={{ color: "#f87171" }}>Este número no puede reservar turnos online por el momento.</strong> Por favor escribinos directamente por WhatsApp para coordinar tu turno.
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
                  <CheckCircle2 size={18} />
                  <span>{trustStatus === "restricted" ? "Reservar y Continuar a la Seña" : "Confirmar Reserva de Turno"}</span>
                </button>
              )}
            </form>
          )}

          {/* STEP 4: Success Ticket & WhatsApp Confirmation */}
          {step === 4 && createdTicket && (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--gold-gradient)",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto",
                  boxShadow: "0 0 30px rgba(212,175,55,0.5)"
                }}
              >
                <CheckCircle2 size={38} />
              </div>

              <h3 className="font-serif gold-text" style={{ fontSize: "2.2rem", marginBottom: "8px" }}>
                {createdTicket.status === "Seña Pendiente" ? "¡Turno Registrado!" : "¡Turno Reservado con Éxito!"}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "24px" }}>
                {createdTicket.status === "Seña Pendiente"
                  ? "Tu turno quedó registrado y a la espera de la seña. Enviá tu comprobante por WhatsApp para que lo confirmemos."
                  : "Tu turno ha sido registrado en nuestro sistema. Haz clic abajo para enviarnos tu confirmación directa por WhatsApp."}
              </p>

              {/* Digital Ticket Box */}
              <div
                style={{
                  background: "#0b0c10",
                  border: "1px solid var(--gold-primary)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                  textAlign: "left",
                  maxWidth: "480px",
                  margin: "0 auto 30px auto",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(212,175,55,0.3)", paddingBottom: "12px", marginBottom: "16px" }}>
                  <span className="font-serif gold-text" style={{ fontWeight: "700", fontSize: "1.2rem" }}>GLOW UP TICKET</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: "700" }}>#{createdTicket.id}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.92rem" }}>
                  <div><strong style={{ color: "var(--gold-light)" }}>Sector:</strong> {createdTicket.sectorName}</div>
                  <div><strong style={{ color: "var(--gold-light)" }}>Tratamiento:</strong> {createdTicket.serviceName}</div>
                  <div><strong style={{ color: "var(--gold-light)" }}>Fecha & Hora:</strong> {createdTicket.date} a las {createdTicket.time} hs</div>
                  <div><strong style={{ color: "var(--gold-light)" }}>Profesional:</strong> {createdTicket.specialist}</div>
                  <div><strong style={{ color: "var(--gold-light)" }}>Clienta:</strong> {createdTicket.clientName} ({createdTicket.clientPhone})</div>
                  <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "1.1rem", fontWeight: "700" }}>
                    Monto total: <span className="gold-text">${createdTicket.price.toLocaleString("es-AR")}</span>
                  </div>
                  {createdTicket.status === "Seña Pendiente" && (
                    <div style={{ fontSize: "0.85rem", color: "var(--gold-light)", background: "rgba(212,175,55,0.1)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
                      Seña requerida: ${(settings?.restrictedDepositAmount || 0).toLocaleString("es-AR")} — {settings?.depositPaymentInstructions}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
                <a
                  href={getWhatsAppLink(createdTicket)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ padding: "14px 28px", background: "#25D366", color: "#fff" }}
                >
                  <Send size={18} />
                  <span>{createdTicket.status === "Seña Pendiente" ? "Enviar Comprobante por WhatsApp" : "Enviar Confirmación a WhatsApp"}</span>
                </a>

                <button onClick={resetForm} className="btn-outline-gold" style={{ padding: "14px 24px" }}>
                  <span>Reservar Otro Turno</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .sectors-tabs-grid {
            grid-template-columns: 1fr !important;
          }
          .step2-grid, .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
