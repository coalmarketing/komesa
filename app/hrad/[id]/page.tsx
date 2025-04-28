import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HradDetail from "../../components/HradDetail";
import BackToHome from "../../components/BackToHome";
import { hrady } from "../../data/hrady";

export default function HradPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  
  // Najít hrad podle ID
  const hrad = hrady.find(h => h.id === id);
  
  // Kontrola, zda hrad existuje
  if (!hrad) {
    notFound();
  }
  
  return (
    <>
      <Navbar />
      <HradDetail hrad={hrad} />
      <Footer />
      <BackToHome />
    </>
  );
} 