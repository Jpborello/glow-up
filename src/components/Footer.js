"use client";

import Image from "next/image";
import { Heart, Camera, Phone, MapPin, Clock, Sparkles, Send, Flower2, Hand, Eye, Zap } from "lucide-react";

const FOOTER_SECTORS = [
  { label: "Biuty Body", Icon: Flower2 },
  { label: "Biuty Hands", Icon: Hand },
  { label: "Biuty Eyes", Icon: Eye },
  { label: "Glow Fitness", Icon: Zap }
];
import { BUSINESS_INFO } from "../lib/constants";

export default function Footer() {
  return (
    <footer style={{ background: "#050608", borderTop: "1px solid var(--gold-border)", padding: "70px 24px 30px 24px", color: "var(--text-muted)", position: "relative" }}>
      <div className="container">
        
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "40px", marginBottom: "50px" }} className="footer-grid">
          
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  padding: "2px",
                  background: "var(--gold-gradient)",
                  boxShadow: "0 0 15px rgba(212,175,55,0.3)"
                }}
              >
                <Image
                  src="/logo.jpeg"
                  alt="GLOW UP Logo"
                  width={38}
                  height={38}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </div>
              <span className="font-serif gold-text" style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                GLOW UP
              </span>
            </div>

            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", maxWidth: "340px", marginBottom: "20px" }}>
              Centro integral de belleza y acondicionamiento fitness. Tu lugar de desconexión, cuidado de autor y suplementación deportiva premium.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" title="Instagram">
                <Camera size={18} />
              </a>
              <a href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn-icon" title="WhatsApp">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif gold-text" style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Navegación</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem" }}>
              <a href="#inicio" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Inicio</a>
              <a href="#quienes-somos" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Quiénes Somos</a>
              <a href="#servicios" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Servicios</a>
              <a href="#turnos" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Reservar Turno</a>
              <a href="#tienda" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Tienda & Suplementos</a>
            </div>
          </div>

          {/* Sectores */}
          <div>
            <h4 className="font-serif gold-text" style={{ fontSize: "1.2rem", marginBottom: "16px" }}>3 Sectores</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem" }}>
              {FOOTER_SECTORS.map((sector) => (
                <span key={sector.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <sector.Icon size={14} style={{ color: "var(--gold-primary)" }} />
                  {sector.label}
                </span>
              ))}
            </div>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-serif gold-text" style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Atención & Ubicación</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <MapPin size={16} style={{ color: "var(--gold-primary)" }} />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={16} style={{ color: "var(--gold-primary)" }} />
                <span>{BUSINESS_INFO.whatsappDisplay}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Clock size={16} style={{ color: "var(--gold-primary)" }} />
                <span>Lun a Sáb: 08:00 a 18:00 hs</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "0.82rem"
          }}
        >
          <div>
            © {new Date().getFullYear()} GLOW UP - Beauty & Fitness. Todos los derechos reservados.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }} className="badge-gold">
            <Sparkles size={12} />
            <span>Ready to Deploy on Vercel</span>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
