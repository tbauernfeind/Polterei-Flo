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
  200,  // F10
  220,  // F11 (You never walk alone)
  260,  // F12 (Algorithmus)
  280   // F13 (Tennis)
];

// --- Fragen-Array ---
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
      "Wer ist der Interpret des Ballermannhits „Buongiorno"?",
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
      "Welcher Song wurde von 2 der 4 Hegerboys bei ihrem Auftritt im Jahr 2018 in Viki's Pub zum Besten gegeben?",
    answers: [
      "A) Let It Be",
      "B) Sympathy for the Devil",
      "C) Smells Like Teen Spirit",
      "D) Baba O'Riley"
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
      "Mit welchem Dur-Akkord beginnt die berühmte Liverpool-Hymne „You Never Walk Alone"?",
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

// Geldstufen den Fragen zuordnen
questions = questions.map((q, index) => ({
  ...q,
  prize: prizeLevels[index] || prizeLevels[prizeLevels.length - 1]
}));

// --- DOM-Elemente ---
const questionTextEl  = document.getElementById("questionText");
const questionMetaEl  = document.getElementById("questionMeta");
const answerButtons   = [
  document.getElementById("answer0"),
  document.getElementById("answer1"),
  document.getElementById("answer2"),
  document.getElementById("answer3")
];
const answerShells = [
  document.getElementById("shell0"),
  document.getElementById("shell1"),
  document.getElementById("shell2"),
  document.getElementById("shell3")
];
const confirmBtn      = document.getElementById("confirmAnswer");
const fiftyFiftyBtn   = document.getElementById("fiftyFifty");
const askAudienceBtn  = document.getElementById("askAudience");
const phoneAFriendBtn = document.getElementById("phoneAFriend");
const prizeSteps      = Array.from(document.querySelectorAll(".prize-step"));

// --- State ---
let currentQuestionIndex = 0;
let selectedIndex = null;
let answered = false;
let totalWon = 0;

let fiftyUsed   = false;
let audienceUsed = false;
let phoneUsed   = false;

// --- Frage laden ---
function loadQuestion() {
  const q = questions[currentQuestionIndex];

  questionTextEl.textContent = q.text;
  questionMetaEl.textContent =
    `Frage ${currentQuestionIndex + 1} von ${questions.length} · ${q.prize} €`;

  answerButtons.forEach((btn, idx) => {
    btn.querySelector('.ans-text').textContent = q.answers[idx];
    btn.classList.remove("selected", "correct", "wrong");
    btn.disabled = false;
  });
  answerShells.forEach(s => s.classList.remove("selected", "correct", "wrong", "removed"));

  selectedIndex = null;
  answered = false;
  confirmBtn.disabled = true;

  updatePrizeLadder();

  // Joker-Zustände wiederherstellen
  syncLifeline(fiftyFiftyBtn,   fiftyUsed);
  syncLifeline(askAudienceBtn,  audienceUsed);
  syncLifeline(phoneAFriendBtn, phoneUsed);
}

function syncLifeline(btn, used) {
  if (used) {
    btn.disabled = true;
    btn.classList.add("used");
  } else {
    btn.disabled = false;
    btn.classList.remove("used");
  }
}

function updatePrizeLadder() {
  const total = prizeSteps.length; // 13

  prizeSteps.forEach((step, idxFromTop) => {
    step.classList.remove("active", "passed");
    const levelOfStep = total - 1 - idxFromTop; // level 0..12 von oben nach unten
    if (levelOfStep < currentQuestionIndex) {
      step.classList.add("passed");
    }
  });

  // Aktive Stufe markieren (aktuelle Frage)
  const activeFromTop = total - 1 - currentQuestionIndex;
  if (prizeSteps[activeFromTop]) {
    prizeSteps[activeFromTop].classList.add("active");
  }
}

loadQuestion();

// --- Tap-Helfer (Click + Touch für iPad) ---
function addTapListener(element, handler) {
  element.addEventListener("click", handler);
  element.addEventListener(
    "touchstart",
    (e) => { handler(e); e.preventDefault(); },
    { passive: false }
  );
}

// --- Antwort auswählen ---
answerButtons.forEach((btn) => {
  addTapListener(btn, () => {
    if (answered) return;
    answerButtons.forEach((b, i) => {
      b.classList.remove("selected");
      answerShells[i].classList.remove("selected");
    });
    const idx = parseInt(btn.dataset.index, 10);
    btn.classList.add("selected");
    answerShells[idx].classList.add("selected");
    selectedIndex = idx;
    confirmBtn.disabled = false;
  });
});

// --- Antwort bestätigen ---
addTapListener(confirmBtn, () => {
  if (answered || selectedIndex === null) return;
  answered = true;
  confirmBtn.disabled = true;

  const q = questions[currentQuestionIndex];

  // Richtige Antwort immer grün
  answerButtons[q.correctIndex].classList.add("correct");
  answerShells[q.correctIndex].classList.remove("selected");
  answerShells[q.correctIndex].classList.add("correct");

  if (selectedIndex === q.correctIndex) {
    totalWon = q.prize;
  } else {
    // Falsch gewählte Antwort rot
    answerButtons[selectedIndex].classList.remove("selected");
    answerButtons[selectedIndex].classList.add("wrong");
    answerShells[selectedIndex].classList.remove("selected");
    answerShells[selectedIndex].classList.add("wrong");
  }

  answerButtons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === q.correctIndex) {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
      }, 2000);
    } else {
      setTimeout(() => {
        alert(`Glückwunsch – du gehst mit ${totalWon} € ins Casino! 🎉`);
      }, 1500);
    }
  } else {
    setTimeout(() => {
      alert(`Glückwunsch – du gehst mit ${totalWon} € ins Casino!`);
    }, 1500);
  }
});

// --- Joker ---

// 50:50
addTapListener(fiftyFiftyBtn, () => {
  if (answered || fiftyUsed) return;

  const q = questions[currentQuestionIndex];
  const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.correctIndex);
  shuffleArray(wrongIndices);
  const toRemove = wrongIndices.slice(0, 2);

  toRemove.forEach((idx) => {
    answerButtons[idx].disabled = true;
    answerButtons[idx].querySelector('.ans-text').textContent = "";
    answerShells[idx].classList.add("removed");
  });

  fiftyUsed = true;
  syncLifeline(fiftyFiftyBtn, true);
});

// Publikumsjoker – nur Effekt: Button sperren
addTapListener(askAudienceBtn, () => {
  if (answered || audienceUsed) return;
  audienceUsed = true;
  syncLifeline(askAudienceBtn, true);
});

// Telefonjoker – nur Effekt: Button sperren
addTapListener(phoneAFriendBtn, () => {
  if (answered || phoneUsed) return;
  phoneUsed = true;
  syncLifeline(phoneAFriendBtn, true);
});

// --- Hilfsfunktionen ---
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
