import Stars from "../components/Stars";

const ACTIVITIES = [
  { id: "words",    emoji: "🔤", label: "Primeiras Palavras", badge: null },
  { id: "frase",    emoji: "💬", label: "Montar Frase",       badge: "NOVO" },
  { id: "adivinhar",emoji: "🎯", label: "Adivinhar",          badge: null },
  { id: "ouvir",   emoji: "🔊", label: "Ouvir e Falar",       badge: null },
];

export default function Home({ onNavigate, stars }) {
  return (
    <div className="home">
      <header className="home__header">
        <div className="home__toprow">
          <span className="app-name">falacomigo 🌟</span>
          <Stars count={stars} />
        </div>
      </header>

      <div className="home__hero">
        <div className="home__avatar">😊</div>
        <h1 className="home__title">Olá! Vamos falar juntos?</h1>
        <p className="home__subtitle">Toque em uma atividade para começar</p>
      </div>

      <div className="activity-grid">
        {ACTIVITIES.map((act) => (
          <button
            key={act.id}
            className="activity-btn"
            onClick={() => onNavigate(act.id)}
            aria-label={act.label}
          >
            {act.badge && <span className="activity-badge">{act.badge}</span>}
            <span className="activity-emoji">{act.emoji}</span>
            <span className="activity-label">{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
