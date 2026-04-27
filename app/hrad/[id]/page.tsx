import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HradDetail from "../../components/HradDetail";
import BackToHome from "../../components/BackToHome";
import { hrady } from "../../data/hrady";

export default async function HradPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  
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