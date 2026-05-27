import { useEffect, useState } from "react";

const MESSAGES = [
  "Muito bem! 🎉",
  "Incrível! ⭐",
  "Parabéns! 🌟",
  "Ótimo! 👏",
  "Que legal! 🎊",
];

export default function Celebration({ onClose }) {
  const [msg] = useState(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);

  useEffect(() => {
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="celebration" role="alert" aria-live="assertive">
      <div className="celebration__inner">
        <div className="celebration__stars">⭐⭐⭐</div>
        <div className="celebration__msg">{msg}</div>
      </div>
    </div>
  );
}
