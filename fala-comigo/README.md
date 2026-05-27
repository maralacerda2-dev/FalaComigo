# 🌟 Fala Comigo

App de comunicação aumentativa e alternativa (CAA) para crianças com TEA e dificuldades de comunicação.

## Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| 🔤 Primeiras Palavras | Grade de palavras com emoji + síntese de voz em PT-BR |
| 💬 Montar Frase | Construtor visual de frases (Sujeito + Verbo + Objeto) |
| 🎯 Adivinhar | Jogo: ouve a palavra e escolhe a imagem certa |
| 🔊 Ouvir e Falar | Reconhecimento de voz — a criança fala e o app valida |

## Como rodar

```bash
cd fala-comigo
npm install
npm run dev
```

Abre no navegador: http://localhost:5173

## Estrutura

```
src/
  App.jsx              # Roteamento principal
  App.css              # Todos os estilos
  data/
    words.js           # Palavras, frases e categorias
  hooks/
    useSpeech.js       # Web Speech API (síntese de voz)
  components/
    Stars.jsx          # Contador de estrelas
    WordCard.jsx       # Card de palavra clicável
    Celebration.jsx    # Animação de parabéns
  pages/
    Home.jsx           # Tela inicial
    PrimeirasWords.jsx # Módulo de palavras
    MontarFrase.jsx    # Módulo de frases
    Adivinhar.jsx      # Jogo de adivinhação
    OuvirFalar.jsx     # Reconhecimento de voz
```

## Tecnologias

- **React 18** + Vite
- **Web Speech API** — síntese de voz e reconhecimento (PT-BR)
- CSS puro (fonte Nunito, design acessível e colorido)

## Próximas expansões sugeridas

- [ ] Sistema de perfis (múltiplas crianças)
- [ ] Mais categorias de palavras com imagens reais
- [ ] Modo histórias (sequência de imagens narrativa)
- [ ] Painel para responsáveis (progresso, estrelas ganhas)
- [ ] Sons de recompensa personalizados
- [ ] Modo offline (PWA)
- [ ] Teclado de símbolos PECS
