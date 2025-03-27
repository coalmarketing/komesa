import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SkákaciHrady from "./components/SkákaciHrady";
import Reference from "./components/Reference";
import Kontakt from "./components/Kontakt";
import NejcastejsiDotazy from "./components/NejcastejsiDotazy";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <SkákaciHrady />
      <Reference />
      <Kontakt />
      <NejcastejsiDotazy />
      <Footer />
    </>
  );
}
