import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HradDetail from "../../components/HradDetail";
import { hrady } from "../../data/hrady";

export default function HradPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  
  // Kontrola, zda hrad existuje
  if (isNaN(id) || id < 0 || id >= hrady.length) {
    notFound();
  }
  
  const hrad = hrady[id];
  
  return (
    <>
      <Navbar />
      <HradDetail hrad={hrad} />
      <Footer />
    </>
  );
} 