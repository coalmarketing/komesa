"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function BackToHome() {
  return (
    <Link 
      href="/" 
      aria-label="Zpět na domovskou stránku"
      className="fixed bottom-6 right-6 p-3 rounded-full bg-[#F34B6D] text-white shadow-lg hover:bg-[#374091] transition-all duration-300 z-50"
    >
      <FaHome />
    </Link>
  );
} 