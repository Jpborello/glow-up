"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Sparkles, ShieldCheck, Dumbbell, Award, Users, Star } from "lucide-react";
import { SPECIALISTS } from "../lib/constants";

const TEAM = [
  { ...SPECIALISTS.emi, key: "emi" },
  { ...SPECIALISTS.aye, key: "aye" },
  { ...SPECIALISTS.keila, key: "keila" }
];

function TeamAvatar({ specialist }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = specialist.photo && !imgFailed;
  return (
    <div
      style={{
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        margin: "0 auto 16px auto",
        padding: "3px",
        background: "var(--gold-gradient)",
        boxShadow: "0 0 25px rgba(212,175,55,0.35)",
        position: "relative"
      }}
    >
      {showPhoto ? (
        <Image
          src={specialist.photo}
          alt={specialist.name}
          fill
          sizes="110px"
          style={{ borderRadius: "50%", objectFit: "cover" }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#0b0c10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span className="font-serif gold-text" style={{ fontSize: "2.6rem", fontWeight: "700" }}>
            {specialist.name.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function AboutSection({ reviews = [] }) {
  const values = [
    {
      icon: Award,
      title: "Especialistas Certificadas",
      description: "Nuestro equipo está compuesto por profesionales apasionadas en estética facial, corporal y nails con actualización continua."
    },
    {
      icon: ShieldCheck,
      title: "Insumos & Tecnología Premium",
      description: "Utilizamos pigmentos orgánicos veganos, insumos esterilizados e instrumental médico-estético de máxima seguridad."
    },
    {
      icon: Sparkles,
      title: "Ambiente VIP & Relajación",
      description: "Espacios divididos en 3 sectores especializados (*Biuty Body*, *Biuty Hands*, *Biuty Eyes*) con aromaterapia y atención dedicada."
    },
    {
      icon: Dumbbell,
      title: "Universo Beauty & Fitness",
      description: "Entendemos que la belleza se potencia con un estilo de vida saludable. Por eso integramos suplementos y ropa deportiva exclusiva."
    }
  ];

  return (
    <section id="quienes-somos" className="section-padding" style={{ position: "relative", background: "rgba(11, 13, 19, 0.6)" }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 60px auto" }}>
          <span className="badge-gold" style={{ marginBottom: "16px" }}>
            <Heart size={14} style={{ color: "var(--gold-primary)" }} />
            <span>Nuestra Historia & Esencia</span>
          </span>
          <h2 className="font-serif" style={{ fontSize: "2.8rem", marginBottom: "16px" }}>
            Quiénes Somos en <span className="gold-text">GLOW UP</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.7" }}>
            Nacimos con la misión de redefinir el concepto de centro de estética en la ciudad, uniendo la maestría técnica en cuidados personales con la energía del mundo fitness.
          </p>
        </div>

        {/* Story Text Box */}
        <div
          className="gold-card"
          style={{
            padding: "40px",
            marginBottom: "60px",
            background: "linear-gradient(135deg, rgba(24, 27, 36, 0.8) 0%, rgba(17, 19, 26, 0.95) 100%)"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }} className="story-grid">
            <div>
              <h3 className="font-serif gold-text" style={{ fontSize: "2rem", marginBottom: "16px" }}>
                Un espacio creado para consentirte y brillar
              </h3>
              <p style={{ color: "var(--text-main)", marginBottom: "16px", lineHeight: "1.7" }}>
                En **GLOW UP - Beauty & Fitness**, cada detalle fue diseñado para que tu visita sea una pausa reconfortante en tu rutina diaria. Desde la música tenue y los aromas relajantes hasta el trato personalizado de nuestras profesionales.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.7" }}>
                No solo embellecemos tus cejas, pestañas o uñas con técnicas de autor; también te acompañamos en tu desarrollo saludable con nuestra línea de suplementación y outfits deportivos diseñados para hacerte sentir invencible.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                <div className="gold-text font-serif" style={{ fontSize: "2.5rem", fontWeight: "700" }}>3</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: "600" }}>Sectores Especializados</div>
              </div>

              <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                <div className="gold-text font-serif" style={{ fontSize: "2.5rem", fontWeight: "700" }}>100%</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: "600" }}>Insumos Certificados</div>
              </div>

              <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                <div className="gold-text font-serif" style={{ fontSize: "2.5rem", fontWeight: "700" }}>7</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: "600" }}>Servicios de Alta Gama</div>
              </div>

              <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                <div className="gold-text font-serif" style={{ fontSize: "2.5rem", fontWeight: "700" }}>VIP</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: "600" }}>Programa de Puntos</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {values.map((val, idx) => {
            const IconComponent = val.icon;
            return (
              <div key={idx} className="gold-card" style={{ padding: "30px" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    background: "var(--gold-gradient-soft)",
                    border: "1px solid var(--gold-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "var(--gold-primary)"
                  }}
                >
                  <IconComponent size={24} />
                </div>
                <h4 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "10px", color: "#fff" }}>
                  {val.title}
                </h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Nuestro Equipo: las 3 especialistas detrás de cada sector */}
        <div style={{ marginTop: "60px" }}>
          <h3 className="font-serif" style={{ fontSize: "1.8rem", textAlign: "center", marginBottom: "30px" }}>
            Conocé a <span className="gold-text">Nuestro Equipo</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            {TEAM.map((specialist) => (
              <div key={specialist.key} className="gold-card" style={{ padding: "28px 20px", textAlign: "center" }}>
                <TeamAvatar specialist={specialist} />
                <h4 className="font-serif" style={{ fontSize: "1.3rem", color: "#fff", marginBottom: "6px" }}>
                  {specialist.name}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--gold-light)" }}>{specialist.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonios de clientas (reseñas aprobadas desde el panel de Admin) */}
        {reviews.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <h3 className="font-serif" style={{ fontSize: "1.8rem", textAlign: "center", marginBottom: "30px" }}>
              Lo que dicen nuestras <span className="gold-text">clientas</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px" }}>
              {reviews.slice(0, 3).map((rev) => (
                <div key={rev.id} className="glass-panel" style={{ padding: "24px", borderRadius: "var(--radius-md)" }}>
                  <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={14} style={{ color: "var(--gold-primary)" }} fill="var(--gold-primary)" />
                    ))}
                  </div>
                  <p style={{ color: "var(--text-main)", fontSize: "0.92rem", fontStyle: "italic", lineHeight: "1.6", marginBottom: "14px" }}>
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <span style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: "600" }}>— {rev.clientName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        @media (max-width: 850px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
