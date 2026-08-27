"use client";

import { useState } from "react";
import { LayoutDashboard, Calendar, Users, TrendingUp, Award, MessageSquare, Settings, X, Menu, ChevronDown } from "lucide-react";
import { BASE_TIME_SLOTS } from "../data/initialData";
import AppointmentsTab from "./admin/AppointmentsTab";
import ClientsTab from "./admin/ClientsTab";
import MetricsTab from "./admin/MetricsTab";
import ReviewsTab from "./admin/ReviewsTab";
import SettingsTab from "./admin/SettingsTab";

const TABS = [
  { id: "metrics", label: "Métricas", Icon: TrendingUp },
  { id: "appointments", label: "Turnos", Icon: Calendar },
  { id: "clients", label: "Fidelización", Icon: Award },
  { id: "reviews", label: "Opiniones", Icon: MessageSquare },
  { id: "settings", label: "Horarios", Icon: Settings }
];

export default function AdminDashboard({
  isOpen,
  onClose,
  appointments,
  clients,
  reviews,
  settings,
  onUpdateAppointmentStatus,
  onAddManualAppointment,
  onDeleteAppointment,
  onMarkNoShow,
  onApproveDeposit,
  onAddClientPoints,
  onSetClientTrustStatus,
  onApproveReview,
  onDeleteReview,
  onToggleWeekday,
  onAddBlockedDate,
  onRemoveBlockedDate,
  onAddBlockedSlot,
  onRemoveBlockedSlot,
  onAddExtraSlot,
  onRemoveExtraSlot,
  onSaveDepositSettings
}) {
  const [activeTab, setActiveTab] = useState("metrics");
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);

  if (!isOpen) return null;

  const pendingDepositCount = appointments.filter(a => a.status === "Seña Pendiente").length;
  const pendingReviewsCount = reviews.filter(r => r.status === "Pendiente").length;

  const getBadgeCount = (id) => {
    if (id === "appointments") return pendingDepositCount;
    if (id === "reviews") return pendingReviewsCount;
    return 0;
  };

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="gold-card admin-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "1180px",
          width: "100%",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          background: "#0d0f17",
          border: "1px solid var(--gold-primary)",
          boxShadow: "0 0 50px rgba(212,175,55,0.3)",
          overflow: "hidden"
        }}
      >
        {/* Admin Header */}
        <div
          className="admin-panel-header"
          style={{
            padding: "24px 30px",
            borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            background: "linear-gradient(90deg, rgba(26,29,40,1) 0%, rgba(13,15,23,1) 100%)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            <div style={{ padding: "8px", borderRadius: "8px", background: "var(--gold-gradient)", color: "#000", flexShrink: 0 }}>
              <LayoutDashboard size={22} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2 className="font-serif gold-text admin-panel-title" style={{ fontSize: "1.8rem", lineHeight: "1.15" }}>
                Panel de Control & Fidelización
              </h2>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                GLOW UP - Management Dashboard
              </span>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon" style={{ width: "38px", height: "38px", flexShrink: 0 }}>
            <X size={20} />
          </button>
        </div>

        {/* Admin Navigation Tabs — fila de pills en tablet/desktop */}
        <div className="admin-panel-tabs admin-tabs-desktop" style={{ display: "flex", gap: "10px", padding: "16px 30px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)", flexWrap: "wrap" }}>
          {TABS.map(({ id, label, Icon }) => {
            const badgeCount = getBadgeCount(id);
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={activeTab === id ? "btn-gold" : "btn-outline-gold"}
                style={{ padding: "8px 20px", fontSize: "0.88rem", position: "relative" }}
              >
                <Icon size={16} />
                <span>{label}</span>
                {badgeCount > 0 && (
                  <span style={{ background: activeTab === id ? "#000" : "var(--gold-primary)", color: activeTab === id ? "var(--gold-light)" : "#000", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px", fontWeight: "800" }}>
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selector tipo hamburguesa — solo aparece en celular (ver media query abajo) */}
        <div className="admin-tabs-mobile" style={{ position: "relative", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
          <button
            onClick={() => setIsTabMenuOpen(!isTabMenuOpen)}
            className="btn-outline-gold"
            style={{ width: "100%", justifyContent: "space-between", padding: "10px 16px" }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Menu size={16} />
              {currentTab && <currentTab.Icon size={16} />}
              <span>{currentTab?.label}</span>
              {getBadgeCount(activeTab) > 0 && (
                <span style={{ background: "var(--gold-primary)", color: "#000", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px", fontWeight: "800" }}>
                  {getBadgeCount(activeTab)}
                </span>
              )}
            </span>
            <ChevronDown size={16} style={{ transform: isTabMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
          </button>

          {isTabMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: "16px",
                right: "16px",
                background: "#12141c",
                border: "1px solid var(--gold-primary)",
                borderRadius: "var(--radius-sm)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                overflow: "hidden",
                zIndex: 20
              }}
            >
              {TABS.map(({ id, label, Icon }) => {
                const badgeCount = getBadgeCount(id);
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => { setActiveTab(id); setIsTabMenuOpen(false); }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "13px 16px",
                      background: isActive ? "rgba(212,175,55,0.15)" : "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      color: isActive ? "var(--gold-light)" : "#fff",
                      fontWeight: isActive ? "700" : "500",
                      fontSize: "0.92rem",
                      textAlign: "left",
                      cursor: "pointer"
                    }}
                  >
                    <Icon size={16} />
                    <span style={{ flex: 1 }}>{label}</span>
                    {badgeCount > 0 && (
                      <span style={{ background: "var(--gold-primary)", color: "#000", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px", fontWeight: "800" }}>
                        {badgeCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Cierra el menú desplegable al tocar afuera */}
        {isTabMenuOpen && (
          <div
            className="admin-tabs-mobile"
            onClick={() => setIsTabMenuOpen(false)}
            style={{ position: "absolute", inset: 0, zIndex: 15 }}
          />
        )}

        {/* Content Body */}
        <div className="admin-panel-body" style={{ padding: "30px", overflowY: "auto", flex: 1 }}>
          {activeTab === "metrics" && <MetricsTab appointments={appointments} clients={clients} />}

          {activeTab === "appointments" && (
            <AppointmentsTab
              appointments={appointments}
              onUpdateAppointmentStatus={onUpdateAppointmentStatus}
              onAddManualAppointment={onAddManualAppointment}
              onDeleteAppointment={onDeleteAppointment}
              onMarkNoShow={onMarkNoShow}
              onApproveDeposit={onApproveDeposit}
              timeSlotOptions={BASE_TIME_SLOTS}
            />
          )}

          {activeTab === "clients" && (
            <ClientsTab clients={clients} onAddClientPoints={onAddClientPoints} onSetClientTrustStatus={onSetClientTrustStatus} />
          )}

          {activeTab === "reviews" && (
            <ReviewsTab reviews={reviews} onApproveReview={onApproveReview} onDeleteReview={onDeleteReview} />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              settings={settings}
              onToggleWeekday={onToggleWeekday}
              onAddBlockedDate={onAddBlockedDate}
              onRemoveBlockedDate={onRemoveBlockedDate}
              onAddBlockedSlot={onAddBlockedSlot}
              onRemoveBlockedSlot={onRemoveBlockedSlot}
              onAddExtraSlot={onAddExtraSlot}
              onRemoveExtraSlot={onRemoveExtraSlot}
              onSaveDepositSettings={onSaveDepositSettings}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-tabs-mobile {
          display: none;
        }
        @media (max-width: 640px) {
          .admin-panel-header {
            padding: 16px !important;
          }
          .admin-panel-title {
            font-size: 1.3rem !important;
          }
          .admin-panel-body {
            padding: 16px !important;
          }
          .admin-tabs-desktop {
            display: none !important;
          }
          .admin-tabs-mobile {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
