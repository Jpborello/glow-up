import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";

// Serif elegante para títulos y acentos dorados: Cormorant Garamond ya tenía
// la curvatura fina y femenina que buscábamos, así que la mantenemos.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Sans para cuerpo de texto y UI: reemplaza a Plus Jakarta Sans (muy geométrica
// y corporativa) por Poppins, de trazo redondeado y más cálido/armonioso.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "GLOW UP | Beauty & Fitness - Centro de Estética VIP",
  description: "Centro de estética integral de alta gama. Pestañas, Estilismo de Cejas, Nails, Depilación Definitiva, Bronceado Orgánico, Capilar y Tienda de Ropa & Suplementos Deportivos.",
  keywords: ["Estética", "Glow Up", "Pestañas", "Cejas", "Nails", "Depilación Definitiva", "Bronceado Orgánico", "Tratamientos Capilares", "Suplementos Deportivos", "Ropa Deportiva"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}

