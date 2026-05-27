import { useState, useCallback } from "react";
import { WORDS } from "../data/words";
import Celebration from "../components/Celebration";
import { useSpeech } from "../hooks/useSpeech";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeRound(allWords) {
  const pool = shuffle(allWords).slice(0, 4);
  const correct = pool[Math.floor(Math.random() * pool.length)];
  return { pool, correct };
}

export default function Adivinhar({ onBack, onStar }) {
  const { speak } = useSpeech();
  const [round, setRound] = useState(() => makeRound(WORDS));
  const [chosen, setChosen] = useState(null);
  const [celebrating, setCelebrating] = useState(false);
  const [score, setScore] = useState(0);

  const nextRound = useCallback(() => {
    setRound(makeRound(WORDS));
    setChosen(null);
  }, []);

  const playWord = () => speak(round.correct.word);

  const guess = (word) => {
    if (chosen) return;
    setChosen(word);
    if (word.id === round.correct.id) {
      setCelebrating(true);
      onStar();
      setScore((s) => s + 1);
      setTimeout(nextRound, 1800);
    } else {
      speak("Tente de novo!");
      setTimeout(() => setChosen(null), 1000);
    }
  };

  return (
    <div className="page">
      {celebrating && <Celebration onClose={() => setCelebrating(false)} />}

      <div className="page__header">
        <h2 className="page__title">🎯 Adivinhar</h2>
        <span className="score-badge">⭐ {score}</span>
      </div>

      <div className="guess-prompt">
        <button className="big-listen-btn" onClick={playWord} aria-label="Ouvir a palavra">
          🔊
        </button>
        <p className="guess-instruction">Qual imagem você ouviu?</p>
        <button className="replay-btn" onClick={playWord}>
          Ouvir de novo
        </button>
      </div>

      <div className="guess-grid">
        {round.pool.map((w) => {
          let cls = "guess-card";
          if (chosen) {
            if (w.id === round.correct.id) cls += " guess-card--correct";
            else if (chosen.id === w.id) cls += " guess-card--wrong";
          }
          return (
            <button key={w.id} className={cls} onClick={() => guess(w)}>
              <span className="guess-emoji">{w.emoji}</span>
              <span className="guess-label">{w.word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
