import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="w-[min(1300px,100%)] mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">404 - Stránka nenalezena</h1>
        <p className="text-xl md:text-2xl mb-8 text-center">Bohužel, požadovaná stránka nebyla nalezena.</p>
        <Link
          href="/"
          className="bg-gradient-to-r from-[#F34B6D] to-[#374091] text-white px-10 py-3 rounded-[1.3rem] text-2xl font-bold hover:opacity-90 transition-opacity"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
      <Footer />
    </>
  );
} 