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
  220,  // F11
  260,  // F12
  280   // F13
];

// --- Fragen-Array ---
// Antworten im Format "A) Text" – der Präfix wird beim Anzeigen entfernt
let questions = [
  {
    text: 'Was sagt Moneyboy in seinem Hit "Dreh den Swag auf", nachdem er kurz in den Spiegel sieht und besagten Swag aufgedreht hat?',
    answers: ["A) Brrrr", "B) Whatup", "C) Pa Brate", "D) Sheeesh"],
    correctIndex: 1
  },
  {
    text: "Wie heißt der größte Berg Goldwörths, dem Heimatort Josef Luegmayers?",
    answers: ["A) Monty Goldy", "B) Gold Everest", "C) Goldglockner", "D) Goldhöhe"],
    correctIndex: 0
  },
  {
    text: 'Wer ist der Interpret des Ballermannhits „Buongiorno“?',
    answers: [
      "A) Ikke Hüftgold & Mickie Krause",
      "B) Peter Wackel & Julian Sommer",
      "C) Ikke Hüftgold & Peter Wackel",
      "D) Lorenz Büffel & Peter Wackel"
    ],
    correctIndex: 2
  },
  {
    text: "Zebras sind dem großen Philosophen Christoph Geibinger zufolge …",
    answers: [
      "A) bei Nacht auch nur schwarz.",
      "B) nicht bunt.",
      "C) sehr schöne Tiere.",
      "D) praktisch um die Straße zu überqueren."
    ],
    correctIndex: 2
  },
  {
    text: "Unter dem Namen welchen Gebäcks ist Fabian Simone noch bekannt?",
    answers: ["A) Salzstangerl", "B) Kornspitz", "C) Mohnflesserl", "D) Semmerl"],
    correctIndex: 1
  },
  {
    text: "Welcher Song wurde von 2 der 4 Hegerboys bei ihrem Auftritt im Jahr 2018 in Viki's Pub zum Besten gegeben?",
    answers: ["A) Let It Be", "B) Sympathy for the Devil", "C) Smells Like Teen Spirit", "D) Baba O'Riley"],
    correctIndex: 1
  },
  {
    text: "Mit welchen Worten wurden Thomas und Yasmin Bauernfeind bei ihrem Besuch 2019 in Paris von Florian in der ersten Nacht aufgeschreckt?",
    answers: ["A) Wer ist das", "B) Wer sind Sie", "C) Was ist das", "D) Was wollen Sie"],
    correctIndex: 1
  },
  {
    text: "Welche Zeitmarke schaffte der Topathlet Paul Nöbauer bei seinem Sieg 2017 beim Pfeilheim-Steigenlauf zu schlagen?",
    answers: ["A) 5 min", "B) 4 min", "C) 3 min", "D) 2 min"],
    correctIndex: 2
  },
  {
    text: "Wie heißt die Textzeile in der inoffiziellen Heimhymne korrekt?",
    answers: [
      "A) Geiler ois die Polizei erlaubt...",
      "B) Steiler ois die Kiwarei erlaubt...",
      "C) Feiner ois die Polizei erlaubt...",
      "D) Steiler ois die Polizei erlaubt..."
    ],
    correctIndex: 0
  },
  {
    text: "Wie heißt das Maskottchen von Schalke 04?",
    answers: ["A) Boris", "B) Christoph", "C) Donald", "D) Erwin"],
    correctIndex: 3
  },
  {
    text: 'Mit welchem Dur-Akkord beginnt die berühmte Liverpool-Hymne „You Never Walk Alone“?',
    answers: ["A) B", "B) C", "C) D", "D) A"],
    correctIndex: 1
  },
  {
    text: "Welcher Algorithmus löst das Problem der kürzesten Pfade in einem Graphen mit negativen Kantengewichten, aber ohne negative Zyklen, in O(V·E)-Zeit?",
    answers: [
      "A) Dijkstra-Algorithmus",
      "B) Floyd-Warshall-Algorithmus",
      "C) Bellman-Ford-Algorithmus",
      "D) A*-Algorithmus"
    ],
    correctIndex: 2
  },
  {
    text: "Wer erreichte beim Wimbledon-Herreneinzelbewerb 1993 das Viertelfinale nicht?",
    answers: ["A) Michael Stich", "B) Andre Agassi", "C) Goran Ivanišević", "D) Cédric Pioline"],
    correctIndex: 2
  }
];

// Geldstufen zuordnen
questions = questions.map((q, i) => ({ ...q, prize: prizeLevels[i] }));

// Entfernt "A) ", "B) " usw. – da der Badge das Kürzel bereits zeigt
function stripPrefix(text) {
  return text.replace(/^[A-D]\)\s*/, '');
}

// --- DOM-Elemente ---
const questionTextEl  = document.getElementById("questionText");
const questionMetaEl  = document.getElementById("questionMeta");
const answerButtons   = [
  document.getElementById("answer0"),
  document.getElementById("answer1"),
  document.getElementById("answer2"),
  document.getElementById("answer3")
];
// Shells werden nur für den 50:50-Effekt (opacity) verwendet
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

let fiftyUsed    = false;
let audienceUsed = false;
let phoneUsed    = false;

// --- Frage laden ---
function loadQuestion() {
  const q = questions[currentQuestionIndex];

  questionTextEl.textContent = q.text;
  questionMetaEl.textContent =
    "Frage " + (currentQuestionIndex + 1) + " von " + questions.length + " · " + q.prize + " €";

  // Buttons zurücksetzen – Klassen NUR auf dem Button, nicht auf der Shell
  answerButtons.forEach(function(btn, idx) {
    btn.querySelector('.ans-text').textContent = stripPrefix(q.answers[idx]);
    btn.classList.remove("selected", "correct", "wrong");
    btn.disabled = false;
  });

  // Shells: nur "removed" zurücksetzen
  answerShells.forEach(function(s) { s.classList.remove("removed"); });

  selectedIndex = null;
  answered = false;
  confirmBtn.disabled = true;

  updatePrizeLadder();
  syncLifeline(fiftyFiftyBtn,   fiftyUsed);
  syncLifeline(askAudienceBtn,  audienceUsed);
  syncLifeline(phoneAFriendBtn, phoneUsed);
}

function syncLifeline(btn, used) {
  btn.disabled = used;
  if (used) {
    btn.classList.add("used");
  } else {
    btn.classList.remove("used");
  }
}

function updatePrizeLadder() {
  var total = prizeSteps.length; // 13

  prizeSteps.forEach(function(step, idxFromTop) {
    step.classList.remove("active", "passed");
    // level dieses Steps (0 = 10€, 12 = 280€)
    var levelOfStep = total - 1 - idxFromTop;
    if (levelOfStep < currentQuestionIndex) {
      step.classList.add("passed");
    }
  });

  // Aktuelle Frage markieren
  var activeFromTop = total - 1 - currentQuestionIndex;
  if (prizeSteps[activeFromTop]) {
    prizeSteps[activeFromTop].classList.add("active");
  }
}

loadQuestion();

// --- Tap-Helfer: Click + Touch für iPad ---
function addTapListener(element, handler) {
  element.addEventListener("click", handler);
  element.addEventListener("touchstart", function(e) {
    handler(e);
    e.preventDefault();
  }, { passive: false });
}

// --- Antwort auswählen ---
answerButtons.forEach(function(btn) {
  addTapListener(btn, function() {
    if (answered) return;

    // Alle Buttons: "selected" entfernen
    answerButtons.forEach(function(b) { b.classList.remove("selected"); });

    var idx = parseInt(btn.dataset.index, 10);
    btn.classList.add("selected");
    selectedIndex = idx;
    confirmBtn.disabled = false;
  });
});

// --- Antwort bestätigen ---
addTapListener(confirmBtn, function() {
  if (answered || selectedIndex === null) return;
  answered = true;
  confirmBtn.disabled = true;

  var q = questions[currentQuestionIndex];

  // "selected" zuerst von allen entfernen, dann Ergebnis-Klassen setzen
  answerButtons.forEach(function(b) { b.classList.remove("selected"); });

  // Richtige Antwort grün
  answerButtons[q.correctIndex].classList.add("correct");

  if (selectedIndex !== q.correctIndex) {
    // Gewählte falsche Antwort rot
    answerButtons[selectedIndex].classList.add("wrong");
  }

  // Alle Buttons sperren
  answerButtons.forEach(function(btn) { btn.disabled = true; });

  // Ergebnis verarbeiten
  if (selectedIndex === q.correctIndex) {
    totalWon = q.prize;
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(function() {
        currentQuestionIndex++;
        loadQuestion();
      }, 2000);
    } else {
      setTimeout(function() {
        alert("Glückwunsch – du gehst mit " + totalWon + " € ins Casino! 🎉");
      }, 1500);
    }
  } else {
    setTimeout(function() {
      alert("Glückwunsch – du gehst mit " + totalWon + " € ins Casino!");
    }, 1500);
  }
});

// --- Joker ---

// 50:50
addTapListener(fiftyFiftyBtn, function() {
  if (answered || fiftyUsed) return;

  var q = questions[currentQuestionIndex];
  var wrongIndices = [0, 1, 2, 3].filter(function(i) { return i !== q.correctIndex; });
  shuffleArray(wrongIndices);
  var toRemove = wrongIndices.slice(0, 2);

  toRemove.forEach(function(idx) {
    answerButtons[idx].disabled = true;
    answerButtons[idx].querySelector('.ans-text').textContent = "";
    answerShells[idx].classList.add("removed"); // gesamte Zelle ausblenden
  });

  fiftyUsed = true;
  syncLifeline(fiftyFiftyBtn, true);
});

// Publikumsjoker
addTapListener(askAudienceBtn, function() {
  if (answered || audienceUsed) return;
  audienceUsed = true;
  syncLifeline(askAudienceBtn, true);
});

// Telefonjoker
addTapListener(phoneAFriendBtn, function() {
  if (answered || phoneUsed) return;
  phoneUsed = true;
  syncLifeline(phoneAFriendBtn, true);
});

// --- Hilfsfunktion ---
function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
}
