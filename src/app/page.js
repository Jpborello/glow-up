"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import BookingSection from "../components/BookingSection";
import ShopSection from "../components/ShopSection";
import AdminDashboard from "../components/AdminDashboard";
import Footer from "../components/Footer";
import { INITIAL_APPOINTMENTS, INITIAL_CLIENTS, INITIAL_REVIEWS, DEFAULT_SETTINGS } from "../data/initialData";

function normalizePhone(phone) {
  return (phone || "").replace(/\D/g, "");
}

function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved);
  } catch (e) {
    return fallback;
  }
}

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [preselectedBookingService, setPreselectedBookingService] = useState(null);

  // Load from localStorage or fallback to INITIAL mock data
  useEffect(() => {
    setAppointments(loadFromStorage("glowup_appointments", INITIAL_APPOINTMENTS));
    setClients(loadFromStorage("glowup_clients", INITIAL_CLIENTS));
    setReviews(loadFromStorage("glowup_reviews", INITIAL_REVIEWS));
    setSettings(loadFromStorage("glowup_settings", DEFAULT_SETTINGS));
  }, []);

  // Save changes to localStorage
  const saveAppointments = (newApps) => {
    setAppointments(newApps);
    localStorage.setItem("glowup_appointments", JSON.stringify(newApps));
  };

  const saveClients = (newClients) => {
    setClients(newClients);
    localStorage.setItem("glowup_clients", JSON.stringify(newClients));
  };

  const saveReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem("glowup_reviews", JSON.stringify(newReviews));
  };

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("glowup_settings", JSON.stringify(newSettings));
  };

  // Handlers - Turnos
  const handleAppointmentCreated = (newAppointment) => {
    const updatedApps = [newAppointment, ...appointments];
    saveAppointments(updatedApps);

    // Also update client points in CRM or create client
    const pointsEarned = Math.floor(newAppointment.price / 100);
    const existingClientIndex = clients.findIndex(c => normalizePhone(c.phone) === normalizePhone(newAppointment.clientPhone));

    if (existingClientIndex > -1) {
      const updatedClients = [...clients];
      const cli = { ...updatedClients[existingClientIndex] };
      cli.points += pointsEarned;
      cli.totalSpent += newAppointment.price;
      cli.visitsCount += 1;
      cli.lastVisit = newAppointment.date;
      if (cli.points >= 700) cli.tier = "Platinum VIP";
      else if (cli.points >= 300) cli.tier = "Gold VIP";
      updatedClients[existingClientIndex] = cli;
      saveClients(updatedClients);
    } else {
      const newClient = {
        id: `cli-${Date.now()}`,
        name: newAppointment.clientName,
        phone: newAppointment.clientPhone,
        email: newAppointment.clientEmail,
        points: pointsEarned,
        tier: pointsEarned >= 300 ? "Gold VIP" : "Silver",
        totalSpent: newAppointment.price,
        visitsCount: 1,
        lastVisit: newAppointment.date,
        trustStatus: "trusted",
        noShowCount: 0
      };
      saveClients([newClient, ...clients]);
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = appointments.map(app => app.id === id ? { ...app, status: newStatus } : app);
    saveAppointments(updated);
  };

  const handleDeleteAppointment = (id) => {
    const updated = appointments.filter(app => app.id !== id);
    saveAppointments(updated);
  };

  const handleAddManualAppointment = (manualApp) => {
    const updated = [manualApp, ...appointments];
    saveAppointments(updated);
  };

  // Marcar/deshacer inasistencia: además de cambiar el estado del turno, suma o
  // resta una inasistencia a la clienta y, a partir de la 2da, la restringe
  // automáticamente (le exige seña en su próximo turno) tal como en Mili.
  const handleMarkNoShow = (id, isNoShow) => {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;

    const updatedApps = appointments.map(app =>
      app.id === id ? { ...app, status: isNoShow ? "No Asistió" : "Confirmado" } : app
    );
    saveAppointments(updatedApps);

    const clientIndex = clients.findIndex(c => normalizePhone(c.phone) === normalizePhone(appointment.clientPhone));
    if (clientIndex === -1) return;

    const updatedClients = [...clients];
    const cli = { ...updatedClients[clientIndex] };
    const currentCount = cli.noShowCount || 0;
    cli.noShowCount = isNoShow ? currentCount + 1 : Math.max(0, currentCount - 1);
    if (isNoShow && cli.noShowCount >= 2 && cli.trustStatus === "trusted") {
      cli.trustStatus = "restricted";
    }
    updatedClients[clientIndex] = cli;
    saveClients(updatedClients);
  };

  const handleApproveDeposit = (id) => {
    const updated = appointments.map(app => app.id === id ? { ...app, status: "Confirmado" } : app);
    saveAppointments(updated);
  };

  const handleAddClientPoints = (clientId, pointsToAdd) => {
    const updated = clients.map(c => {
      if (c.id === clientId) {
        const newPts = c.points + pointsToAdd;
        let newTier = c.tier;
        if (newPts >= 700) newTier = "Platinum VIP";
        else if (newPts >= 300) newTier = "Gold VIP";
        return { ...c, points: newPts, tier: newTier };
      }
      return c;
    });
    saveClients(updated);
  };

  const handleSetClientTrustStatus = (phone, newStatus) => {
    const updated = clients.map(c =>
      normalizePhone(c.phone) === normalizePhone(phone) ? { ...c, trustStatus: newStatus } : c
    );
    saveClients(updated);
  };

  // Handlers - Opiniones
  const handleApproveReview = (id) => {
    saveReviews(reviews.map(r => r.id === id ? { ...r, status: "Aprobada" } : r));
  };

  const handleDeleteReview = (id) => {
    saveReviews(reviews.filter(r => r.id !== id));
  };

  // Handlers - Horarios / Configuración
  const handleToggleWeekday = (day) => {
    const isBlocked = settings.blockedWeekdays.includes(day);
    const updated = {
      ...settings,
      blockedWeekdays: isBlocked
        ? settings.blockedWeekdays.filter(d => d !== day)
        : [...settings.blockedWeekdays, day]
    };
    saveSettings(updated);
  };

  const handleAddBlockedDate = (date) => {
    if (settings.blockedDates.includes(date)) return;
    saveSettings({ ...settings, blockedDates: [...settings.blockedDates, date] });
  };

  const handleRemoveBlockedDate = (date) => {
    saveSettings({ ...settings, blockedDates: settings.blockedDates.filter(d => d !== date) });
  };

  const handleAddBlockedSlot = (date, time) => {
    const key = `${date}_${time}`;
    if (settings.blockedSlots.includes(key)) return;
    saveSettings({ ...settings, blockedSlots: [...settings.blockedSlots, key] });
  };

  const handleRemoveBlockedSlot = (key) => {
    saveSettings({ ...settings, blockedSlots: settings.blockedSlots.filter(k => k !== key) });
  };

  const handleAddExtraSlot = (date, time) => {
    const key = `${date}_${time}`;
    if (settings.extraSlots.includes(key)) return;
    saveSettings({ ...settings, extraSlots: [...settings.extraSlots, key] });
  };

  const handleRemoveExtraSlot = (key) => {
    saveSettings({ ...settings, extraSlots: settings.extraSlots.filter(k => k !== key) });
  };

  const handleSaveDepositSettings = ({ restrictedDepositAmount, depositPaymentInstructions }) => {
    saveSettings({ ...settings, restrictedDepositAmount, depositPaymentInstructions });
  };

  const handleSelectServiceToBook = (service) => {
    setPreselectedBookingService(service);
    const turnosEl = document.getElementById("turnos");
    if (turnosEl) turnosEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-dark)", color: "var(--text-main)" }}>
      {/* Navigation Header */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        appointmentsCount={appointments.filter(a => a.status === "Confirmado").length}
      />

      {/* Hero Presentation */}
      <HeroSection />

      {/* About Us / Quienes Somos */}
      <AboutSection reviews={reviews.filter(r => r.status === "Aprobada")} />

      {/* Services Showcase */}
      <ServicesSection onSelectServiceToBook={handleSelectServiceToBook} />

      {/* 3 Sectors Booking Engine */}
      <BookingSection
        preselectedService={preselectedBookingService}
        onAppointmentCreated={handleAppointmentCreated}
        settings={settings}
        clients={clients}
      />

      {/* Activewear & Supplements Shop */}
      <ShopSection />

      {/* Footer */}
      <Footer />

      {/* Admin Panel Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        appointments={appointments}
        clients={clients}
        reviews={reviews}
        settings={settings}
        onUpdateAppointmentStatus={handleUpdateStatus}
        onAddManualAppointment={handleAddManualAppointment}
        onDeleteAppointment={handleDeleteAppointment}
        onMarkNoShow={handleMarkNoShow}
        onApproveDeposit={handleApproveDeposit}
        onAddClientPoints={handleAddClientPoints}
        onSetClientTrustStatus={handleSetClientTrustStatus}
        onApproveReview={handleApproveReview}
        onDeleteReview={handleDeleteReview}
        onToggleWeekday={handleToggleWeekday}
        onAddBlockedDate={handleAddBlockedDate}
        onRemoveBlockedDate={handleRemoveBlockedDate}
        onAddBlockedSlot={handleAddBlockedSlot}
        onRemoveBlockedSlot={handleRemoveBlockedSlot}
        onAddExtraSlot={handleAddExtraSlot}
        onRemoveExtraSlot={handleRemoveExtraSlot}
        onSaveDepositSettings={handleSaveDepositSettings}
      />
    </main>
  );
}
