"use client";

import Image from "next/image";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Star, Award, Zap, Flower2, Hand, Eye } from "lucide-react";

const SECTOR_STRIP = [
  { label: "Biuty Body", Icon: Flower2 },
  { label: "Biuty Hands", Icon: Hand },
  { label: "Biuty Eyes", Icon: Eye }
];

export default function HeroSection() {
  return (
    <section
      id="inicio"
      style={{
        position: "relative",
        padding: "100px 24px 80px 24px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        minHeight: "85vh"
      }}
    >
      {/* Foto de fondo del hero (si /img/hero.jpg todavía no existe, CSS
          simplemente no pinta nada acá y queda el fondo oscuro de siempre) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/img/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          zIndex: 0
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(8,9,12,0.35) 0%, rgba(8,9,12,0.9) 100%)",
          zIndex: 0
        }}
      />

      {/* Background Radial Glow */}
      <div
        className="glow-orb glow-orb-gold"
        style={{
          width: "500px",
          height: "500px",
          top: "-100px",
          right: "-100px",
          opacity: 0.6
        }}
      />
      <div
        className="glow-orb glow-orb-gold"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-50px",
          left: "-100px",
          opacity: 0.4
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="hero-grid">
          
          {/* Left Column Text Content */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "24px" }}>
            
            <div className="badge-gold">
              <Sparkles size={14} style={{ color: "var(--gold-primary)" }} />
              <span>Experiencia de Lujo en Estética & Fitness</span>
            </div>

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
                fontWeight: "700",
                lineHeight: "1.15",
                letterSpacing: "-0.5px"
              }}
            >
              Resalta tu belleza, <br />
              <span className="gold-text">potencia tu energía.</span>
            </h1>

            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "560px", lineHeight: "1.7" }}>
              Bienvenida a <strong style={{ color: "var(--gold-light)" }}>GLOW UP</strong>. Tu centro integral de estética con sectores exclusivos para <strong style={{ color: "#fff" }}>Pestañas, Cejas, Nails, Depilación Definitiva, Bronceado Orgánico y Tratamientos Capilares</strong>, complementado con nuestra línea de <strong style={{ color: "var(--gold-light)" }}>Ropa & Suplementos Deportivos</strong>.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "10px" }}>
              <a href="#turnos" className="btn-gold" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                <Calendar size={18} />
                <span>Reservar mi Turno</span>
              </a>

              <a href="#servicios" className="btn-outline-gold" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                <span>Ver Servicios</span>
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Highlights Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginTop: "36px",
                width: "100%",
                paddingTop: "24px",
                borderTop: "1px solid rgba(212, 175, 55, 0.15)"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-primary)", fontWeight: "800", fontSize: "1.3rem" }}>
                  <Star size={18} fill="var(--gold-primary)" />
                  <span>4.9 / 5</span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>+1.500 Clientas VIP</div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-light)", fontWeight: "800", fontSize: "1.3rem" }}>
                  <Award size={18} />
                  <span>3 Sectores</span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>Body, Hands & Eyes</div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-green)", fontWeight: "800", fontSize: "1.3rem" }}>
                  <Zap size={18} />
                  <span>Soprano Ice</span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>Depilación Indolora</div>
              </div>
            </div>

          </div>

          {/* Right Column Visual Banner */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div
              className="gold-card"
              style={{
                position: "relative",
                padding: "44px 32px 32px 32px",
                maxWidth: "440px",
                width: "100%",
                textAlign: "center",
                background: "linear-gradient(180deg, rgba(26,29,40,0.92) 0%, rgba(12,13,18,0.97) 100%)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.65)",
                overflow: "hidden"
              }}
            >
              {/* Decorative corner glow, kept inside the card */}
              <div
                style={{
                  position: "absolute",
                  top: "-90px",
                  right: "-90px",
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0) 70%)",
                  pointerEvents: "none"
                }}
              />

              <div
                style={{
                  position: "relative",
                  width: "172px",
                  height: "172px",
                  margin: "0 auto 24px auto"
                }}
              >
                {/* Fine outer ring, separated from the gold disc for a more jewelry-like frame */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-9px",
                    borderRadius: "50%",
                    border: "1px solid rgba(212, 175, 55, 0.35)"
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    padding: "4px",
                    background: "var(--gold-gradient)",
                    boxShadow: "0 0 40px rgba(212, 175, 55, 0.45)"
                  }}
                >
                  <Image
                    src="/logo.jpeg"
                    alt="Glow Up Logo Showcase"
                    width={164}
                    height={164}
                    style={{ borderRadius: "50%", objectFit: "cover", width: "100%", height: "100%" }}
                    priority
                  />
                </div>
              </div>

              <h2 className="font-serif gold-text" style={{ fontSize: "2rem", marginBottom: "8px" }}>
                GLOW UP
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--gold-light)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "28px", fontWeight: "700" }}>
                Beauty & Fitness Sanctuary
              </p>

              {/* Sector Strip: reemplaza los badges con emoji por íconos de línea prolijos */}
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  borderTop: "1px solid rgba(212, 175, 55, 0.15)",
                  paddingTop: "22px"
                }}
              >
                {SECTOR_STRIP.map((sector, idx) => (
                  <div
                    key={sector.label}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0 8px",
                      borderLeft: idx > 0 ? "1px solid rgba(212, 175, 55, 0.12)" : "none"
                    }}
                  >
                    <sector.Icon size={18} style={{ color: "var(--gold-primary)" }} />
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "600" }}>
                      {sector.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
