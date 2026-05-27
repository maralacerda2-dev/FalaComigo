import { useState } from "react";
import Home from "./pages/Home";
import PrimeirasWords from "./pages/PrimeirasWords";
import MontarFrase from "./pages/MontarFrase";
import Adivinhar from "./pages/Adivinhar";
import OuvirFalar from "./pages/OuvirFalar";
import Stars from "./components/Stars";

export default function App() {
  const [page, setPage] = useState("home");
  const [stars, setStars] = useState(0);

  const addStar = () => setStars((s) => s + 1);
  const goHome = () => setPage("home");

  const renderPage = () => {
    switch (page) {
      case "words":    return <PrimeirasWords onBack={goHome} onStar={addStar} />;
      case "frase":    return <MontarFrase    onBack={goHome} onStar={addStar} />;
      case "adivinhar":return <Adivinhar      onBack={goHome} onStar={addStar} />;
      case "ouvir":   return <OuvirFalar      onBack={goHome} onStar={addStar} />;
      default:        return <Home onNavigate={setPage} stars={stars} />;
    }
  };

  return (
    <div className="app-shell">
      {page !== "home" && (
        <header className="topbar">
          <button className="back-btn" onClick={goHome} aria-label="Voltar">◀</button>
          <span className="app-name">falacomigo 🌟</span>
          <Stars count={stars} />
        </header>
      )}
      {renderPage()}
    </div>
  );
}
