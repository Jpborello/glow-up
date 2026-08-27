"use client";

import { useState } from "react";
import Image from "next/image";

// Envoltorio de next/image que se "borra" solo si la foto todavía no existe
// en /public (mientras no subamos las fotos reales) en vez de mostrar el
// ícono de imagen rota. El contenedor que lo usa debe tener su propio fondo
// (color, degradé o ícono) para que quede prolijo mientras tanto.
export default function FallbackImage({ src, alt, fill, sizes, style, className }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;

  return (
    <Image
      src={src}
      alt={alt || ""}
      fill={fill}
      sizes={sizes}
      style={style}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
