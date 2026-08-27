"use client";

import { useState } from "react";
import { INITIAL_SERVICES } from "../data/initialData";
import FallbackImage from "./FallbackImage";
import { Sparkles, Clock, Check, Eye, Hand, Flame, Sun, Scissors, Smile, Shield, Flower2, X, ArrowRight, Calendar } from "lucide-react";

export default function ServicesSection({ onSelectServiceToBook }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedModalService, setSelectedModalService] = useState(null);

  const categories = [
    { id: "all", label: "Todos los Servicios", Icon: null },
    { id: "eyes", label: "Pestañas & Cejas", Icon: Eye },
    { id: "hands", label: "Nails (Manos & Pies)", Icon: Hand },
    { id: "body", label: "Depilación, Bronceado & Capilar", Icon: Flower2 }
  ];

  const filteredServices = activeCategory === "all"
    ? INITIAL_SERVICES
    : INITIAL_SERVICES.filter(s => s.sectorId === activeCategory);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case "Eye": return <Eye size={22} />;
      case "Hand": return <Hand size={22} />;
      case "Flame": return <Flame size={22} />;
      case "Sun": return <Sun size={22} />;
      case "Scissors": return <Scissors size={22} />;
      case "Smile": return <Smile size={22} />;
      case "Shield": return <Shield size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <section id="servicios" className="section-padding" style={{ position: "relative" }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px auto" }}>
          <span className="badge-gold" style={{ marginBottom: "16px" }}>
            <Sparkles size={14} style={{ color: "var(--gold-primary)" }} />
            <span>Tratamientos de Autor & Tecnología</span>
          </span>
          <h2 className="font-serif" style={{ fontSize: "2.8rem", marginBottom: "16px" }}>
            Nuestra Carta de <span className="gold-text">Servicios Exclusivos</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Selecciona un tratamiento para ver todos los detalles o agendar tu sesión de forma directa.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "44px"
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={activeCategory === cat.id ? "btn-gold" : "btn-outline-gold"}
              style={{ padding: "10px 22px", fontSize: "0.9rem" }}
            >
              {cat.Icon && <cat.Icon size={14} />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="gold-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "28px"
              }}
            >
              <div>
                {/* Foto del servicio (sangra hasta el borde de la card; si la foto
                    todavía no existe en /public, se ve el fondo dorado degradé) */}
                <div
                  style={{
                    position: "relative",
                    width: "calc(100% + 56px)",
                    height: "150px",
                    margin: "-28px -28px 18px -28px",
                    background: "var(--gold-gradient-soft)",
                    borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                    overflow: "hidden"
                  }}
                >
                  <FallbackImage src={service.image} alt={service.title} fill sizes="(max-width: 640px) 100vw, 320px" style={{ objectFit: "cover" }} />
                </div>

                {/* Sector Badge & Tag */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span className="badge-gold" style={{ fontSize: "0.72rem" }}>
                    {service.sectorName}
                  </span>
                  {service.tag && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        color: "var(--gold-light)",
                        background: "rgba(212, 175, 55, 0.2)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        border: "1px solid rgba(212, 175, 55, 0.3)"
                      }}
                    >
                      {service.tag}
                    </span>
                  )}
                </div>

                {/* Service Header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "var(--gold-gradient-soft)",
                      border: "1px solid var(--gold-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gold-primary)",
                      flexShrink: 0
                    }}
                  >
                    {getServiceIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif" style={{ fontSize: "1.35rem", color: "#fff", lineHeight: "1.2" }}>
                      {service.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                      <Clock size={13} />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "20px" }}>
                  {service.description}
                </p>
              </div>

              {/* Price & Action Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.06)"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Inversión</div>
                  <div className="gold-text font-serif" style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                    ${service.price.toLocaleString("es-AR")}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setSelectedModalService(service)}
                    className="btn-outline-gold"
                    style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                  >
                    Detalles
                  </button>

                  <button
                    onClick={() => onSelectServiceToBook(service)}
                    className="btn-gold"
                    style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                  >
                    <Calendar size={14} />
                    <span>Reservar</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedModalService && (
        <div className="modal-overlay" onClick={() => setSelectedModalService(null)}>
          <div
            className="gold-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "520px",
              width: "100%",
              padding: "32px",
              background: "#12141c",
              border: "1px solid var(--gold-primary)",
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.3)"
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span className="badge-gold" style={{ fontSize: "0.75rem", marginBottom: "8px" }}>
                  {selectedModalService.sectorName}
                </span>
                <h3 className="font-serif gold-text" style={{ fontSize: "1.8rem", marginTop: "4px" }}>
                  {selectedModalService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalService(null)}
                className="btn-icon"
                style={{ width: "36px", height: "36px" }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: "var(--text-main)", fontSize: "0.98rem", marginBottom: "20px" }}>
              {selectedModalService.description}
            </p>

            {/* Checklist */}
            <div style={{ marginBottom: "24px", background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--gold-light)", marginBottom: "10px", textTransform: "uppercase" }}>
                Beneficios del Tratamiento:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {selectedModalService.details.map((detail, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    <div style={{ color: "var(--gold-primary)", flexShrink: 0 }}>
                      <Check size={16} />
                    </div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Booking Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Duración aprox: {selectedModalService.duration}</div>
                <div className="gold-text font-serif" style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                  ${selectedModalService.price.toLocaleString("es-AR")}
                </div>
              </div>

              <button
                onClick={() => {
                  const s = selectedModalService;
                  setSelectedModalService(null);
                  onSelectServiceToBook(s);
                }}
                className="btn-gold"
                style={{ padding: "12px 24px" }}
              >
                <Calendar size={16} />
                <span>Reservar este Turno</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
