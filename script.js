// --- Geldstufen in aufsteigender Reihenfolge (Index 0 = erste Frage) ---
const prizeLevels = [
  10,   // F1
  20,   // F2
  30,   // F3
  40,   // F4
  50,   // F5
  75,   // F6
  100,  // F7
  125,  // F8
  150,  // F9
  200,  // F10  <- hier ist die 200-€-Marke
  220,  // F11
  240,  // F12
  260   // F13
];

// --- Fragen-Array ---
// prize wird aus prizeLevels gesetzt, Reihenfolge = Geldleiter
let questions = [
  {
    text:
      'Was sagt Moneyboy in seinem Hit "Dreh den Swag auf", nachdem er kurz in den Spiegel sieht und besagten Swag aufgedreht hat?',
    answers: [
      "A) Brrrr",
      "B) Whatup",
      "C) Pa Brate",
      "D) Sheeesh"
    ],
    correctIndex: 1
  },
  {
    text:
      "Wie heißt der größte Berg Goldwörths, dem Heimatort Josef Luegmayers?",
    answers: [
      "A) Monty Goldy",
      "B) Gold Everest",
      "C) Goldglockner",
      "D) Goldhöhe"
    ],
    correctIndex: 0
  },
  {
    text:
      "Wer ist der Interpret des Ballermannhits „Buongiorno“?",
    answers: [
      "A) Ikke Hüftgold & Mickie Krause",
      "B) Peter Wackel & Julian Sommer",
      "C) Ikke Hüftgold & Peter Wackel",
      "D) Lorenz Büffel & Peter Wackel"
    ],
    correctIndex: 2
  },
  {
    text:
      "Zebras sind dem großen Philosophen Christoph Geibinger zufolge …",
    answers: [
      "A) bei Nacht auch nur schwarz.",
      "B) nicht bunt.",
      "C) sehr schöne Tiere.",
      "D) praktisch um die Straße zu überqueren."
    ],
    correctIndex: 2
  },
  {
    text:
      "Unter dem Namen welchen Gebäcks ist Fabian Simone noch bekannt?",
    answers: [
      "A) Salzstangerl",
      "B) Kornspitz",
      "C) Mohnflesserl",
      "D) Semmerl"
    ],
    correctIndex: 1
  },
  {
    text:
      "Welcher Song wurde von 2 der 4 Hegerboys bei ihrem Auftritt im Jahr 2018 in Viki‘s Pub zum Besten gegeben?",
    answers: [
      "A) Let It Be",
      "B) Sympathy for the Devil",
      "C) Smells Like Teen Spirit",
      "D) Baba O‘Riley"
    ],
    correctIndex: 1
  },
  {
    text:
      "Mit welchen Worten wurden Thomas und Yasmin Bauernfeind bei ihrem Besuch 2019 in Paris von Florian in der ersten Nacht aufgeschreckt?",
    answers: [
      "A) Wer ist das",
      "B) Wer sind Sie",
      "C) Was ist das",
      "D) Was wollen Sie"
    ],
    correctIndex: 1
  },
  {
    text:
      "Welche Zeitmarke schaffte der Topathlet Paul Nöbauer bei seinem Sieg 2017 beim Pfeilheim-Steigenlauf zu schlagen?",
    answers: [
      "A) 5 min",
      "B) 4 min",
      "C) 3 min",
      "D) 2 min"
    ],
    correctIndex: 2
  },
  {
    text:
      "Wie heißt die Textzeile in der inoffiziellen Heimhymne korrekt?",
    answers: [
      "A) Geiler ois die Polizei erlaubt...",
      "B) Steiler ois die Kiwarei erlaubt...",
      "C) Feiner ois die Polizei erlaubt...",
      "D) Steiler ois die Polizei erlaubt..."
    ],
    correctIndex: 0
  },
  {
    text:
      "Wie heißt das Maskottchen von Schalke 04?",
    answers: [
      "A) Boris",
      "B) Christoph",
      "C) Donald",
      "D) Erwin"
    ],
    correctIndex: 3
  },
  {
    text:
      "Mit welchem Dur-Akkord beginnt die berühmte Liverpool-Hymne „You Never Walk Alone“?",
    answers: [
      "A) B",
      "B) C",
      "C) D",
      "D) A"
    ],
    correctIndex: 1
  },
  {
    text:
      "Welcher Algorithmus löst das Problem der kürzesten Pfade in einem Graphen mit negativen Kantengewichten, aber ohne negative Zyklen, in O(V·E)-Zeit?",
    answers: [
      "A) Dijkstra-Algorithmus",
      "B) Floyd-Warshall-Algorithmus",
      "C) Bellman-Ford-Algorithmus",
      "D) A*-Algorithmus"
    ],
    correctIndex: 2
  },
  {
    text:
      "Wer erreichte beim Wimbledon-Herreneinzelbewerb 1993 das Viertelfinale nicht?",
    answers: [
      "A) Michael Stich",
      "B) Andre Agassi",
      "C) Goran Ivanišević",
      "D) Cédric Pioline"
    ],
    correctIndex: 2
  }
];

// prizeLevel den Fragen zuordnen (Frage 1 = 10 €, ..., Frage 13 = 260 €)
questions = questions.map((q, index) => ({
  ...q,
  prize: prizeLevels[index] || prizeLevels[prizeLevels.length - 1]
}));

// --- DOM-Elemente ---
const questionTextEl = document.getElementById("questionText");
const answerButtons = [
  document.getElementById("answer0"),
  document.getElementById("answer1"),
  document.getElementById("answer2"),
  document.getElementById("answer3")
];
const confirmBtn = document.getElementById("confirmAnswer");

const fiftyFiftyBtn = document.getElementById("fiftyFifty");
const askAudienceBtn = document.getElementById("askAudience");
const phoneAFriendBtn = document.getElementById("phoneAFriend");

const prizeSteps = Array.from(document.querySelectorAll(".prize-step"));

// --- State-Variablen ---
let currentQuestionIndex = 0;
let selectedIndex = null;
let answered = false;
// totalWon = letzter sicher erspielter Betrag (letzte richtige Frage)
let totalWon = 0;

// Joker-Flags: nur 1x pro Spiel
let fiftyUsed = false;
let audienceUsed = false;
let phoneUsed = false;

// --- Frage laden ---
function loadQuestion() {
  const q = questions[currentQuestionIndex];

  questionTextEl.textContent = q.text;

  answerButtons.forEach((btn, idx) => {
    btn.textContent = q.answers[idx];
    btn.classList.remove("selected", "correct", "wrong");
    btn.disabled = false;
  });

  selectedIndex = null;
  answered = false;
  confirmBtn.disabled = true;

  updatePrizeLadder();

  // Joker-Zustand entsprechend Flag setzen
  if (fiftyUsed) {
    fiftyFiftyBtn.disabled = true;
    fiftyFiftyBtn.classList.add("used");
  } else {
    fiftyFiftyBtn.disabled = false;
    fiftyFiftyBtn.classList.remove("used");
  }

  if (audienceUsed) {
    askAudienceBtn.disabled = true;
    askAudienceBtn.classList.add("used");
  } else {
    askAudienceBtn.disabled = false;
    askAudienceBtn.classList.remove("used");
  }

  if (phoneUsed) {
    phoneAFriendBtn.disabled = true;
    phoneAFriendBtn.classList.add("used");
  } else {
    phoneAFriendBtn.disabled = false;
    phoneAFriendBtn.classList.remove("used");
  }
}

function updatePrizeLadder() {
  // Wir haben 13 Stufen, oberste = 260 €, unterste = 10 €
  // currentQuestionIndex 0 => 10 €, 12 => 260 €
  const totalSteps = prizeSteps.length;

  prizeSteps.forEach((step) => step.classList.remove("active"));

  const activeIndexFromBottom = currentQuestionIndex; // 0..12
  const activeIndexFromTop = totalSteps - 1 - activeIndexFromBottom;

  if (prizeSteps[activeIndexFromTop]) {
    prizeSteps[activeIndexFromTop].classList.add("active");
  }
}

loadQuestion();

// --- Tap-Handler-Helfer (Click + Touch für iPad) ---
function addTapListener(element, handler) {
  element.addEventListener("click", handler);
  element.addEventListener(
    "touchstart",
    function (e) {
      handler(e);
      e.preventDefault();
    },
    { passive: false }
  );
}

// --- Antwort auswählen ---
answerButtons.forEach((btn) => {
  addTapListener(btn, () => {
    if (answered) return;
    answerButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedIndex = parseInt(btn.dataset.index, 10);
    confirmBtn.disabled = false;
  });
});

// --- Antwort bestätigen ---
addTapListener(confirmBtn, () => {
  if (answered || selectedIndex === null) return;
  answered = true;
  confirmBtn.disabled = true;

  const q = questions[currentQuestionIndex];

  // Richtig / falsch einfärben
  answerButtons.forEach((btn, idx) => {
    if (idx === q.correctIndex) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === q.correctIndex) {
    // Nur hier totalWon aktualisieren – bei falscher Antwort bleibt der alte Wert
    totalWon = q.prize;
  } else {
    answerButtons[selectedIndex].classList.add("wrong");
  }

  // Nach Beantwortung alle Buttons sperren
  answerButtons.forEach((btn) => (btn.disabled = true));

  // Wenn richtig und es noch eine nächste Frage gibt -> nach kurzer Pause weiter
  if (selectedIndex === q.correctIndex) {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
      }, 2000);
    } else {
      // Letzte Frage richtig beantwortet
      setTimeout(() => {
        alert(`Glückwunsch du gehst mit ${totalWon} € ins Casino!`);
      }, 1500);
    }
  } else {
    // Falsche Antwort: totalWon ist noch der letzte richtige Betrag (oder 0)
    setTimeout(() => {
      alert(`Glückwunsch du gehst mit ${totalWon} € ins Casino!`);
    }, 1500);
  }
});

// --- Joker-Funktionen ---

// 1) 50:50 – nur 1x pro Spiel
addTapListener(fiftyFiftyBtn, () => {
  if (answered || fiftyUsed) return;

  const q = questions[currentQuestionIndex];
  const wrongIndices = [0, 1, 2, 3].filter(
    (i) => i !== q.correctIndex
  );

  shuffleArray(wrongIndices);
  const toRemove = wrongIndices.slice(0, 2);

  toRemove.forEach((idx) => {
    answerButtons[idx].disabled = true;
    answerButtons[idx].textContent = "";
  });

  fiftyUsed = true;
  fiftyFiftyBtn.disabled = true;
  fiftyFiftyBtn.classList.add("used");
});

// 2) Publikum – nur 1x pro Spiel, ohne Effekt
addTapListener(askAudienceBtn, () => {
  if (answered || audienceUsed) return;

  audienceUsed = true;
  askAudienceBtn.disabled = true;
  askAudienceBtn.classList.add("used");
});

// 3) Telefonjoker – nur 1x pro Spiel, ohne Effekt
addTapListener(phoneAFriendBtn, () => {
  if (answered || phoneUsed) return;

  phoneUsed = true;
  phoneAFriendBtn.disabled = true;
  phoneAFriendBtn.classList.add("used");
});

// --- Hilfsfunktion shuffle (nur für 50:50 genutzt) ---
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
