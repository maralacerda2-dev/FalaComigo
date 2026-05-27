import { useSpeech } from "../hooks/useSpeech";

export default function WordCard({ word, emoji, big = false, onClick }) {
  const { speak } = useSpeech();

  const handleClick = () => {
    speak(word);
    if (onClick) onClick();
  };

  return (
    <button
      className={`word-card ${big ? "word-card--big" : ""}`}
      onClick={handleClick}
      aria-label={`Falar: ${word}`}
    >
      <span className="word-card__emoji">{emoji}</span>
      <span className="word-card__label">{word}</span>
    </button>
  );
}
