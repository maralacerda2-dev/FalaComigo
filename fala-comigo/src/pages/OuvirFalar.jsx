import { useState, useRef } from "react";
import { WORDS } from "../data/words";
import Celebration from "../components/Celebration";
import { useSpeech } from "../hooks/useSpeech";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function OuvirFalar({ onBack, onStar }) {
  const { speak } = useSpeech();
  const [queue] = useState(() => shuffle(WORDS));
  const [idx, setIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | null
  const [heard, setHeard] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const recognitionRef = useRef(null);

  const current = queue[idx % queue.length];

  const speakWord = () => speak(current.word);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz. Tente o Chrome.");
      return;
    }

    setListening(true);
    setResult(null);
    setHeard("");

    const rec = new SpeechRecognition();
    rec.lang = "pt-BR";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    recognitionRef.current = rec;

    rec.onresult = (e) => {
      const transcripts = Array.from(e.results[0]).map((r) =>
        r.transcript.toLowerCase().trim()
      );
      const target = current.word.toLowerCase();
      const correct = transcripts.some((t) => t.includes(target) || target.includes(t));
      setHeard(transcripts[0]);
      setResult(correct ? "correct" : "wrong");
      setListening(false);
      if (correct) {
        setCelebrating(true);
        onStar();
        setTimeout(() => setIdx((i) => i + 1), 1800);
      }
    };

    rec.onerror = () => {
      setListening(false);
      setResult("wrong");
      setHeard("Não entendi. Tente de novo!");
    };

    rec.onend = () => setListening(false);
    rec.start();
  };

  const skip = () => {
    setResult(null);
    setHeard("");
    setIdx((i) => i + 1);
  };

  return (
    <div className="page">
      {celebrating && <Celebration onClose={() => setCelebrating(false)} />}

      <div className="page__header">
        <h2 className="page__title">🔊 Ouvir e Falar</h2>
      </div>

      <div className="listen-card">
        <div className="listen-emoji">{current.emoji}</div>
        <div className="listen-word">{current.word}</div>
        <button className="listen-speak-btn" onClick={speakWord}>
          🔊 Ouvir
        </button>
      </div>

      <p className="listen-instruction">Agora diga em voz alta:</p>

      <button
        className={`mic-btn ${listening ? "mic-btn--active" : ""}`}
        onClick={startListening}
        disabled={listening}
        aria-label="Gravar voz"
      >
        {listening ? "🎙️ Ouvindo..." : "🎤 Falar"}
      </button>

      {result && (
        <div className={`result-badge result-badge--${result}`}>
          {result === "correct"
            ? `✅ Correto! Você disse: "${heard}"`
            : `❌ Você disse: "${heard}" — tente de novo!`}
        </div>
      )}

      <button className="skip-btn" onClick={skip}>
        Pular →
      </button>
    </div>
  );
}
