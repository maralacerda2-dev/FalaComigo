export function useSpeech() {
  const speak = (text, rate = 0.85) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "pt-BR";
    utt.rate = rate;
    utt.pitch = 1.1;

    const voices = window.speechSynthesis.getVoices();
    const ptBR = voices.find(
      (v) => v.lang === "pt-BR" || v.lang.startsWith("pt")
    );
    if (ptBR) utt.voice = ptBR;

    window.speechSynthesis.speak(utt);
  };

  return { speak };
}
