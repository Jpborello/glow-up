// Initial Mock Data for GLOW UP - Beauty & Fitness Demo

// Horarios base del motor de turnos: cada 2 horas, de 8 a 18hs.
export const BASE_TIME_SLOTS = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

export const WEEKDAY_LABELS = [
  { label: "Domingo", val: 0 },
  { label: "Lunes", val: 1 },
  { label: "Martes", val: 2 },
  { label: "Miércoles", val: 3 },
  { label: "Jueves", val: 4 },
  { label: "Viernes", val: 5 },
  { label: "Sábado", val: 6 }
];

// Configuración editable desde el panel de Admin (pestaña "Horarios").
// blockedWeekdays: días de la semana cerrados (0=Domingo ... 6=Sábado). Por defecto
// solo domingo está cerrado, así queda Lunes a Sábado como pediste.
// blockedDates: feriados o días puntuales cerrados por completo ("YYYY-MM-DD").
// blockedSlots: horarios puntuales deshabilitados ("YYYY-MM-DD_HH:MM").
// extraSlots: horarios puntuales habilitados fuera de la grilla fija ("YYYY-MM-DD_HH:MM").
export const DEFAULT_SETTINGS = {
  blockedWeekdays: [0],
  blockedDates: [],
  blockedSlots: [],
  extraSlots: [],
  restrictedDepositAmount: 5000,
  depositPaymentInstructions: "Alias para transferencia: glowup.beauty — envianos el comprobante por WhatsApp para que confirmemos tu turno."
};

export const INITIAL_SERVICES = [
  {
    id: "lashes-01",
    sectorId: "eyes",
    sectorName: "Biuty Eyes",
    specialistKey: "aye",
    image: "/img/servicios/pestanas.jpg",
    title: "Lifting & Laminado de Pestañas",
    category: "Pestañas",
    description: "Curvatura natural intensa con nutrición de keratina y tinte negro azabache. Duración 6-8 semanas.",
    price: 18500,
    duration: "60 min",
    icon: "Eye",
    tag: "Más Pedido",
    details: ["Nutrición intensiva con Keratina", "Tinte de alta definición incluido", "No maltrata tu pestaña natural", "Ideal para miradas expresivas sin rímel"]
  },
  {
    id: "lashes-02",
    sectorId: "eyes",
    sectorName: "Biuty Eyes",
    specialistKey: "aye",
    image: "/img/servicios/pestanas.jpg",
    title: "Extensiones Pestañas 2D / 3D Volumen",
    category: "Pestañas",
    description: "Técnica de abanicos super ligeros para un efecto de densidad elegante sin sobrecargar el folículo.",
    price: 26000,
    duration: "100 min",
    icon: "Sparkles",
    tag: "VIP Choice",
    details: ["Aislamiento pestaña por pestaña", "Adhesivo hipoalergénico de alta retención", "Efecto ojo de gato o muñeca a elección"]
  },
  {
    id: "brows-01",
    sectorId: "eyes",
    sectorName: "Biuty Eyes",
    specialistKey: "aye",
    image: "/img/servicios/cejas.jpg",
    title: "Diseño & Perfilado de Cejas con Henna",
    category: "Estilismo en Cejas",
    description: "Visagismo según las facciones de tu rostro + epilación con hilo/cera elástica y pigmentación orgánica.",
    price: 16000,
    duration: "45 min",
    icon: "Smile",
    tag: "Tendencia",
    details: ["Mapeo facial personalizado", "Pigmentos naturales veganos", "Efecto sombras definido por 2 semanas en piel"]
  },
  {
    id: "brows-02",
    sectorId: "eyes",
    sectorName: "Biuty Eyes",
    specialistKey: "aye",
    image: "/img/servicios/cejas.jpg",
    title: "Laminado de Cejas (Brow Lamination)",
    category: "Estilismo en Cejas",
    description: "Redireccionamiento del vello para cejas más pobladas, peinadas y fijas con aspecto Glow.",
    price: 19500,
    duration: "50 min",
    icon: "Zap",
    tag: "Top Seller",
    details: ["Fijación de larga duración (6 semanas)", "Hidratación post-tratamiento con aceite de argán", "Ideal para cejas rebeldes o poco pobladas"]
  },
  {
    id: "nails-01",
    sectorId: "hands",
    sectorName: "Biuty Hands",
    specialistKey: "hands",
    image: "/img/servicios/nails.jpg",
    title: "Manicuría Semipermanente Premium",
    category: "Nails",
    description: "Limpieza combinada rusa de cutículas + esmaltado semipermanente de alta cobertura y brillo espejo.",
    price: 15500,
    duration: "60 min",
    icon: "Hand",
    tag: "Clásico",
    details: ["Manicuría rusa profunda", "Gama de +120 tonos de esmaltes importados", "Nail art básico o nivelado incluido"]
  },
  {
    id: "nails-02",
    sectorId: "hands",
    sectorName: "Biuty Hands",
    specialistKey: "hands",
    image: "/img/servicios/nails.jpg",
    title: "Kapping Gel / Soft Gel Sculpting",
    category: "Nails",
    description: "Capa protectora de gel fortalecedor sobre uña natural o extensión con tips de gel de seda.",
    price: 24000,
    duration: "90 min",
    icon: "Shield",
    tag: "Recomendado",
    details: ["Previene la rotura de uñas débiles", "Estructura perfecta con curvatura C", "Duración de 21 a 30 días impecables"]
  },
  {
    id: "laser-01",
    sectorId: "body",
    sectorName: "Biuty Body",
    specialistKey: "emi",
    image: "/img/servicios/depilacion.jpg",
    title: "Depilación Definitiva Triláser Soprano",
    category: "Depilación Definitiva",
    description: "Cabezal de zafiro helado ultra confort (-5°C). Apto para todo tipo de pieles durante todo el año.",
    price: 28000,
    duration: "45 min",
    icon: "Flame",
    tag: "Tecnología Top",
    details: ["Sesión cuerpo completo (Axilas, Cavado completo, Piernas)", "Tecnología Triláser 3D indolora", "Resultados visibles desde la 1era sesión"]
  },
  {
    id: "tan-01",
    sectorId: "body",
    sectorName: "Biuty Body",
    specialistKey: "emi",
    image: "/img/servicios/bronceado.jpg",
    title: "Bronceado Orgánico DHA (Sunless Tan)",
    category: "Bronceado Orgánico",
    description: "Fórmula 100% caña de azúcar y antioxidantes. Color dorado caribeño sin daños UV ni manchas.",
    price: 19000,
    duration: "30 min",
    icon: "Sun",
    tag: "Glow Instant",
    details: ["Aplicación con micro-bruma uniforme", "Secado rápido en 10 minutos", "Duración de 7 a 10 días radiantes"]
  },
  {
    id: "capilar-01",
    sectorId: "body",
    sectorName: "Biuty Body",
    specialistKey: "keila",
    image: "/img/servicios/capilar.jpg",
    title: "Nutrición Molecular & Botox Capilar Glow",
    category: "Tratamientos Capilares",
    description: "Sellado de cutículas, eliminación del encrespamiento y restauración intensa de aminoácidos.",
    price: 29500,
    duration: "90 min",
    icon: "Scissors",
    tag: "Lujo Capilar",
    details: ["Ácido hialurónico capilar + colágeno", "Brillo de diamante sin alterar la forma natural", "Aroma exquisito de larga duración"]
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-01",
    category: "ropa",
    name: "Set Deportivo Seamless 'Glow Gold'",
    description: "Top deportivo con soporte medio + Legging tiro alto moldeador con detalles dorados reflectivos.",
    price: 38500,
    badge: "Edición Limitada",
    sizes: ["S", "M", "L"],
    colors: ["Negro Ébano", "Nude Champagne"],
    image: "/img/tienda/ropa-1.jpg"
  },
  {
    id: "prod-02",
    category: "ropa",
    name: "Biker Short & Top Luxe Activewear",
    description: "Tela compresiva de secado rápido efecto segunda piel con cintura anticorte.",
    price: 32000,
    badge: "Best Seller",
    sizes: ["S", "M", "L"],
    colors: ["Negro Ónix", "Bronce Metálico"],
    image: "/img/tienda/ropa-2.jpg"
  },
  {
    id: "prod-03",
    category: "suplementos",
    name: "Colágeno Hidrolizado + Ácido Hialurónico",
    description: "Polvo micronizado sabor Vainilla Francesa. Fortalece uñas, cabello, articulaciones y elastina de la piel.",
    price: 24500,
    badge: "Belleza Desde Adentro",
    sizeInfo: "300g (30 porciones)",
    image: "/img/tienda/suplementos-1.jpg"
  },
  {
    id: "prod-04",
    category: "suplementos",
    name: "Iso-Glow Protein Isolate 100%",
    description: "Proteína pura isolatada de rápida absorción sin azúcar ni lactosa. Ideal para recuperar músculo magro.",
    price: 42000,
    badge: "Alta Pureza",
    sizeInfo: "900g (30 porciones)",
    image: "/img/tienda/suplementos-2.jpg"
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "TURN-9821",
    sectorId: "eyes",
    sectorName: "Biuty Eyes",
    serviceName: "Lifting & Laminado de Pestañas",
    clientName: "Valentina Rossi",
    clientPhone: "+54 9 11 4522-8819",
    clientEmail: "v.rossi@gmail.com",
    date: "2026-08-27",
    time: "16:00",
    specialist: "Sofia - Lash Artist",
    price: 18500,
    status: "Confirmado",
    createdAt: "2026-08-26T14:20:00"
  },
  {
    id: "TURN-9822",
    sectorId: "hands",
    sectorName: "Biuty Hands",
    serviceName: "Kapping Gel / Soft Gel Sculpting",
    clientName: "Camila Fernández",
    clientPhone: "+54 9 11 6390-1122",
    clientEmail: "cami.f@outlook.com",
    date: "2026-08-27",
    time: "18:00",
    specialist: "Camila - Nails Specialist",
    price: 24000,
    status: "Confirmado",
    createdAt: "2026-08-26T16:45:00"
  },
  {
    id: "TURN-9823",
    sectorId: "body",
    sectorName: "Biuty Body",
    serviceName: "Depilación Definitiva Triláser Soprano",
    clientName: "Lucía Maidana",
    clientPhone: "+54 9 11 2234-9988",
    clientEmail: "lumai@gmail.com",
    date: "2026-08-28",
    time: "12:00",
    specialist: "Valentina - Laser Specialist",
    price: 28000,
    status: "Pendiente",
    createdAt: "2026-08-26T18:10:00"
  },
  {
    id: "TURN-9824",
    sectorId: "body",
    sectorName: "Biuty Body",
    serviceName: "Bronceado Orgánico DHA (Sunless Tan)",
    clientName: "Mariana Albornoz",
    clientPhone: "+54 9 11 7712-4455",
    clientEmail: "mari.albornoz@hotmail.com",
    date: "2026-08-28",
    time: "16:00",
    specialist: "Valentina - Body Specialist",
    price: 19000,
    status: "Completado",
    createdAt: "2026-08-25T11:00:00"
  }
];

export const INITIAL_CLIENTS = [
  {
    id: "cli-101",
    name: "Valentina Rossi",
    phone: "+54 9 11 4522-8819",
    email: "v.rossi@gmail.com",
    points: 450,
    tier: "Gold VIP",
    totalSpent: 95000,
    visitsCount: 5,
    lastVisit: "2026-08-20",
    trustStatus: "trusted",
    noShowCount: 0
  },
  {
    id: "cli-102",
    name: "Camila Fernández",
    phone: "+54 9 11 6390-1122",
    email: "cami.f@outlook.com",
    points: 820,
    tier: "Platinum VIP",
    totalSpent: 168000,
    visitsCount: 8,
    lastVisit: "2026-08-15",
    trustStatus: "trusted",
    noShowCount: 0
  },
  {
    id: "cli-103",
    name: "Lucía Maidana",
    phone: "+54 9 11 2234-9988",
    email: "lumai@gmail.com",
    points: 210,
    tier: "Silver",
    totalSpent: 42000,
    visitsCount: 2,
    lastVisit: "2026-08-02",
    trustStatus: "restricted",
    noShowCount: 1
  },
  {
    id: "cli-104",
    name: "Mariana Albornoz",
    phone: "+54 9 11 7712-4455",
    email: "mari.albornoz@hotmail.com",
    points: 360,
    tier: "Gold VIP",
    totalSpent: 76000,
    visitsCount: 4,
    lastVisit: "2026-08-25",
    trustStatus: "trusted",
    noShowCount: 0
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-01",
    clientName: "Florencia G.",
    comment: "Ambiente hermoso y muy prolijo. Me hice el laminado de pestañas y el resultado quedó natural, tal cual lo esperaba. ¡Recomendadísimo!",
    rating: 5,
    status: "Aprobada",
    createdAt: "2026-08-10T12:00:00"
  },
  {
    id: "rev-02",
    clientName: "Sol Ibáñez",
    comment: "El sistema de turnos online es comodísimo, pude reservar mi kapping en dos minutos desde el celu. Las chicas son un amor.",
    rating: 5,
    status: "Aprobada",
    createdAt: "2026-08-15T09:30:00"
  },
  {
    id: "rev-03",
    clientName: "Antonella Ruiz",
    comment: "Primera vez que me hago depilación láser ahí y la atención fue excelente, muy poco dolorosa. Ya reservé mi próxima sesión.",
    rating: 5,
    status: "Pendiente",
    createdAt: "2026-08-24T17:45:00"
  }
];
