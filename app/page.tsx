import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SkákaciHrady from "./components/SkákaciHrady";
import Reference from "./components/Reference";
import Kontakt from "./components/Kontakt";
import NejcastejsiDotazy from "./components/NejcastejsiDotazy";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <div id="skakaci-hrady">
        <SkákaciHrady />
      </div>
      <div id="reference">
        <Reference />
      </div>
      <div id="kontakt">
        <Kontakt />
      </div>
      <div id="nejcastejsi-dotazy">
        <NejcastejsiDotazy />
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
