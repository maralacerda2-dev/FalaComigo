import { useState } from "react";
import { WORDS, CATEGORIES } from "../data/words";
import WordCard from "../components/WordCard";
import Celebration from "../components/Celebration";

export default function PrimeirasWords({ onBack, onStar }) {
  const [category, setCategory] = useState("all");
  const [celebrating, setCelebrating] = useState(false);

  const filtered =
    category === "all" ? WORDS : WORDS.filter((w) => w.category === category);

  const handleWord = () => {
    setCelebrating(true);
    onStar();
  };

  return (
    <div className="page">
      {celebrating && <Celebration onClose={() => setCelebrating(false)} />}

      <div className="page__header">
        <h2 className="page__title">🔤 Primeiras Palavras</h2>
      </div>

      <div className="category-scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${category === cat.id ? "category-chip--active" : ""}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <div className="words-grid">
        {filtered.map((w) => (
          <WordCard
            key={w.id}
            word={w.word}
            emoji={w.emoji}
            onClick={handleWord}
          />
        ))}
      </div>
    </div>
  );
}
