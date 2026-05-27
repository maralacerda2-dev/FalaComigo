import { useState } from "react";
import { PHRASES_PARTS } from "../data/words";
import Celebration from "../components/Celebration";
import { useSpeech } from "../hooks/useSpeech";

export default function MontarFrase({ onBack, onStar }) {
  const { speak } = useSpeech();
  const [selected, setSelected] = useState({ sujeito: null, verbo: null, objeto: null });
  const [celebrating, setCelebrating] = useState(false);

  const pick = (type, item) => {
    setSelected((s) => ({ ...s, [type]: item }));
    speak(item.label);
  };

  const phrase = [selected.sujeito, selected.verbo, selected.objeto]
    .filter(Boolean)
    .map((p) => p.label)
    .join(" ");

  const isComplete = selected.sujeito && selected.verbo && selected.objeto;

  const speakPhrase = () => {
    if (!isComplete) return;
    speak(phrase, 0.8);
    setCelebrating(true);
    onStar();
  };

  const reset = () => setSelected({ sujeito: null, verbo: null, objeto: null });

  return (
    <div className="page">
      {celebrating && <Celebration onClose={() => setCelebrating(false)} />}

      <div className="page__header">
        <h2 className="page__title">💬 Montar Frase</h2>
      </div>

      <div className="phrase-display">
        <div className="phrase-slots">
          {["sujeito", "verbo", "objeto"].map((type) => (
            <div
              key={type}
              className={`phrase-slot ${selected[type] ? "phrase-slot--filled" : ""}`}
            >
              {selected[type] ? (
                <>
                  <span className="phrase-slot__emoji">{selected[type].emoji}</span>
                  <span className="phrase-slot__word">{selected[type].label}</span>
                </>
              ) : (
                <span className="phrase-slot__placeholder">
                  {type === "sujeito" ? "Quem?" : type === "verbo" ? "O quê faz?" : "O quê?"}
                </span>
              )}
            </div>
          ))}
        </div>

        {isComplete && (
          <button className="speak-phrase-btn" onClick={speakPhrase}>
            🔊 Falar a frase!
          </button>
        )}
      </div>

      {["sujeito", "verbo", "objeto"].map((type) => (
        <div key={type} className="phrase-section">
          <h3 className="phrase-section__title">
            {type === "sujeito" ? "👤 Quem?" : type === "verbo" ? "🤲 O que faz?" : "🎯 O quê?"}
          </h3>
          <div className="phrase-options">
            {PHRASES_PARTS[type].map((item) => (
              <button
                key={item.id}
                className={`phrase-chip ${selected[type]?.id === item.id ? "phrase-chip--active" : ""}`}
                onClick={() => pick(type, item)}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="reset-btn" onClick={reset}>🔄 Recomeçar</button>
    </div>
  );
}
