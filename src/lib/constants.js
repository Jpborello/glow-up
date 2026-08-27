// Datos reales del negocio. Se editan acá una sola vez y se reflejan en toda
// la web (footer, links de WhatsApp de turnos/tienda, Instagram, dirección).
export const BUSINESS_INFO = {
  name: "GLOW UP",
  // 3417 79-7695 en formato internacional para links wa.me (54 + 9 + área + número)
  whatsappNumber: "5493417797695",
  whatsappDisplay: "+54 341 779-7695",
  instagramUrl: "https://www.instagram.com/glowupestetica.ok/",
  instagramHandle: "@glowupestetica.ok",
  address: "Avellaneda 2421, Rosario"
};

// Las 3 socias/especialistas y qué sector de tratamientos atiende cada una.
// photo apunta a /public/team/<archivo> — mientras no subamos las fotos reales
// se muestra un avatar con la inicial en dorado (ver AboutSection y BookingSection).
export const SPECIALISTS = {
  emi: { name: "Emi", role: "Depilación Definitiva & Bronceado Orgánico", photo: "/team/emi.jpg" },
  aye: { name: "Aye", role: "Pestañas & Estilismo de Cejas", photo: "/team/aye.jpg" },
  keila: { name: "Keila", role: "Tratamientos Capilares", photo: "/team/keila.jpg" },
  hands: { name: "Equipo Biuty Hands", role: "Nails & Pedicuría", photo: null }
};
