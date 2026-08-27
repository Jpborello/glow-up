"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, LayoutDashboard, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar({ onOpenAdmin, appointmentsCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Quiénes Somos", href: "#quienes-somos" },
    { name: "Servicios", href: "#servicios" },
    { name: "Sectores & Turnos", href: "#turnos" },
    { name: "Tienda & Fitness", href: "#tienda" },
  ];

  return (
    <header className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid var(--gold-border)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px", padding: "0 20px" }}>
        
        {/* Brand Logo */}
        <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
          <div style={{
            position: "relative",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            padding: "2px",
            background: "var(--gold-gradient)",
            boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)"
          }}>
            <Image
              src="/logo.jpeg"
              alt="GLOW UP Logo"
              width={44}
              height={44}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="font-serif gold-text" style={{ fontSize: "1.45rem", fontWeight: "700", letterSpacing: "1px", lineHeight: "1.1" }}>
              GLOW UP
            </span>
            <span style={{ fontSize: "0.68rem", color: "var(--gold-light)", letterSpacing: "2.5px", fontWeight: "600", textTransform: "uppercase" }}>
              Beauty & Fitness
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: "var(--text-main)",
                fontSize: "0.92rem",
                fontWeight: "500",
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--gold-primary)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-main)")}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          
          {/* Admin Panel Button */}
          <button
            onClick={onOpenAdmin}
            className="btn-outline-gold"
            style={{ padding: "8px 16px", fontSize: "0.85rem", position: "relative" }}
            title="Abrir Panel de Administración & Fidelización"
          >
            <LayoutDashboard size={16} />
            <span>Admin</span>
            {appointmentsCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                background: "var(--gold-primary)",
                color: "#000",
                fontSize: "0.7rem",
                fontWeight: "800",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {appointmentsCount}
              </span>
            )}
          </button>

          {/* Book Turn CTA */}
          <a href="#turnos" className="btn-gold desktop-cta" style={{ padding: "10px 22px", fontSize: "0.88rem" }}>
            <Calendar size={16} />
            <span>Pedir Turno</span>
          </a>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-icon mobile-toggle"
            aria-label="Abrir Menú"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            background: "rgba(11, 12, 16, 0.98)",
            borderBottom: "1px solid var(--gold-border)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                color: "var(--text-main)",
                fontSize: "1.05rem",
                fontWeight: "600",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#turnos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-gold"
            style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
          >
            <Calendar size={18} />
            <span>Reservar Turno Ahora</span>
          </a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
