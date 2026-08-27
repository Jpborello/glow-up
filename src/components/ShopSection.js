"use client";

import { useState } from "react";
import { INITIAL_PRODUCTS } from "../data/initialData";
import { BUSINESS_INFO } from "../lib/constants";
import FallbackImage from "./FallbackImage";
import { ShoppingBag, Sparkles, Dumbbell, Shirt, Pill, Check, Send, X, ShoppingCart } from "lucide-react";

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = activeCategory === "all"
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);
    setCart(updated);
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getWhatsAppCartLink = () => {
    let text = "¡Hola GLOW UP! Quisiera realizar un pedido de la tienda:%0A%0A";
    cart.forEach((item) => {
      text += `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString("es-AR")}%0A`;
    });
    text += `%0A*Total a abonar:* $${totalAmount.toLocaleString("es-AR")}`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="tienda" className="section-padding" style={{ position: "relative" }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 50px auto" }}>
          <span className="badge-gold" style={{ marginBottom: "16px" }}>
            <Dumbbell size={14} style={{ color: "var(--gold-primary)" }} />
            <span>Activewear & Nutrición Fitness</span>
          </span>
          <h2 className="font-serif" style={{ fontSize: "2.8rem", marginBottom: "16px" }}>
            Tienda <span className="gold-text">GLOW Fitness</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Complementa tu cuidado personal con nuestros conjuntos deportivos seamless de alto impacto y suplementación de máxima calidad.
          </p>
        </div>

        {/* Filter Bar & Cart Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "btn-gold" : "btn-outline-gold"}
              style={{ padding: "8px 18px", fontSize: "0.85rem" }}
            >
              Todo
            </button>
            <button
              onClick={() => setActiveCategory("ropa")}
              className={activeCategory === "ropa" ? "btn-gold" : "btn-outline-gold"}
              style={{ padding: "8px 18px", fontSize: "0.85rem" }}
            >
              <Shirt size={14} />
              <span>Ropa Deportiva</span>
            </button>
            <button
              onClick={() => setActiveCategory("suplementos")}
              className={activeCategory === "suplementos" ? "btn-gold" : "btn-outline-gold"}
              style={{ padding: "8px 18px", fontSize: "0.85rem" }}
            >
              <Pill size={14} />
              <span>Suplementos</span>
            </button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-gold"
            style={{ padding: "10px 20px", fontSize: "0.9rem", position: "relative" }}
          >
            <ShoppingCart size={18} />
            <span>Mi Carrito</span>
            {cart.length > 0 && (
              <span
                style={{
                  background: "#000",
                  color: "var(--gold-light)",
                  fontWeight: "800",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "6px"
                }}
              >
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "28px" }}>
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="gold-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span className="badge-gold" style={{ fontSize: "0.7rem" }}>
                    {prod.badge}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {prod.category === "ropa" ? "Seamless" : "Nutrición"}
                  </span>
                </div>

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "180px",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    marginBottom: "16px",
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FallbackImage src={prod.image} alt={prod.name} fill sizes="(max-width: 640px) 100vw, 270px" style={{ objectFit: "cover" }} />
                </div>

                <h3 className="font-serif" style={{ fontSize: "1.3rem", color: "#fff", marginBottom: "8px", lineHeight: "1.2" }}>
                  {prod.name}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                  {prod.description}
                </p>

                {prod.sizes && (
                  <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                    {prod.sizes.map(s => (
                      <span key={s} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", color: "var(--text-muted)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="gold-text font-serif" style={{ fontSize: "1.4rem", fontWeight: "700" }}>
                  ${prod.price.toLocaleString("es-AR")}
                </span>
                <button
                  onClick={() => addToCart(prod)}
                  className="btn-gold"
                  style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                >
                  <ShoppingBag size={14} />
                  <span>Agregar</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div
            className="gold-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "460px",
              width: "100%",
              padding: "28px",
              background: "#12141c",
              border: "1px solid var(--gold-primary)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingCart size={20} style={{ color: "var(--gold-primary)" }} />
                <h3 className="font-serif gold-text" style={{ fontSize: "1.6rem" }}>Tu Carrito Fitness</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="btn-icon" style={{ width: "32px", height: "32px" }}>
                <X size={16} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)" }}>
                Tu carrito está vacío. Agrega productos de ropa o suplementos.
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "280px", overflowY: "auto", marginBottom: "20px", paddingRight: "4px" }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "var(--radius-sm)" }}>
                      <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#fff" }}>{item.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--gold-light)" }}>${item.price.toLocaleString("es-AR")} c/u</div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ width: "24px", height: "24px", borderRadius: "4px", border: "1px solid var(--gold-border)", background: "none", color: "#fff", cursor: "pointer" }}>-</button>
                        <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ width: "24px", height: "24px", borderRadius: "4px", border: "1px solid var(--gold-border)", background: "none", color: "#fff", cursor: "pointer" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid rgba(212,175,55,0.2)", paddingTop: "16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1rem", fontWeight: "700", color: "#fff" }}>Total a Confirmar:</span>
                  <span className="gold-text font-serif" style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                    ${totalAmount.toLocaleString("es-AR")}
                  </span>
                </div>

                <a
                  href={getWhatsAppCartLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ width: "100%", justifyContent: "center", padding: "12px", background: "#25D366", color: "#fff" }}
                >
                  <Send size={18} />
                  <span>Encargar Pedido por WhatsApp</span>
                </a>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
