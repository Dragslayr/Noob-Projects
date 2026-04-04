let timer = document.querySelector(".timer");
let input = document.querySelector("input");
let reset = document.querySelector("button");
let given = document.querySelector(".given");
let wpmClass = document.querySelector(".wpm");
let accuracyClass = document.querySelector(".accuracy");
let typeSound = new Audio("short-click-of-a-computer-mouse.mp3");

let text = "";
let givenArr = [];
let time = 30;
let isTimerRunning = false;
let intervalID;
let arrPosition = 0;
let correctChars = 0;
let wrongChars = 0;

const epicQuotes = [
  "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
  "The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing and primeval. It is not slain when the body is slain.",
  "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself to protect the pious and to annihilate the miscreants.",
  "Change is the law of the universe. You can be a millionaire, or a pauper in an instant. What is yours today, was somebody else's yesterday and will be somebody else's tomorrow.",
  "Man is made by his belief. As he believes, so he is. A person is what their thoughts have made them; so take care about what you think. Words are secondary. Thoughts live; they travel far.",
  "The mind is restless and difficult to restrain, but it is subdued by practice. Set thy heart upon thy work, but never on its reward. The only way you can conquer me is through love, and there I am gladly conquered.",
  "He who has let go of hatred, who treats all beings with kindness and compassion, who is always serene, unmoved by pain or pleasure, free of the 'I' and 'mine', self-controlled, firm in person, entire heart and mind given to me—he is dear to me.",
];

async function loadQuote() {
  try {
    given.textContent = "Summoning the Charioteer...";
    const randomIndex = Math.floor(Math.random() * epicQuotes.length);
    text = epicQuotes[randomIndex];
    setupGame();
  } catch (error) {
    text = "Do your duty without thought of the fruit.";
    setupGame();
  }
}

function setupGame() {
  given.innerHTML = "";
  givenArr = [];
  for (let i = 0; i < text.length; i++) {
    let span = document.createElement("span");
    span.textContent = text[i];
    given.appendChild(span);
    givenArr[i] = text[i];
  }
  if (given.children.length > 0) {
    given.children[0].style.backgroundColor = "black";
    given.children[0].style.color = "white";
  }
}

function stats() {
  let timeSpent = 30 - time;
  let wpm = Math.round((correctChars / 5 / timeSpent) * 60) || 0;
  let accuracy =
    Math.round((correctChars / (correctChars + wrongChars)) * 100) || 0;
  wpmClass.textContent = "wpm: " + wpm;
  accuracyClass.textContent = "accuracy: " + accuracy;
}

function timerFn() {
  isTimerRunning = true;
  intervalID = setInterval(() => {
    if (time > 0) {
      timer.textContent = time;
      time--;
    } else {
      timer.textContent = "Time's UP!";
      input.disabled = true;
      clearInterval(intervalID);
      isTimerRunning = false;
      stats();
    }
  }, 1000);
}

// 🛑 THE MOUSE BLOCKER IS BACK!
input.addEventListener("mousedown", (e) => {
  e.preventDefault();
  input.focus();
});

input.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.key.startsWith("Arrow")) {
    e.preventDefault();
  }
});

input.addEventListener("input", (e) => {
  typeSound.currentTime = 0;
  typeSound.play();

  // 🚨 THE SUPERVILLAIN ERASER IS BACK! (Mobile Anti-Cheat)
  // If they tap autocomplete (insertReplacementText) or paste multiple letters...
  if (
    e.inputType === "insertReplacementText" ||
    (e.data && e.data.length > 1)
  ) {
    let lastSpace = input.value.lastIndexOf(" "); // Find where the word started
    input.value = input.value.substring(0, lastSpace + 1); // Nuke the cheat!
  }

  if (!isTimerRunning && time === 30) timerFn();

  const typedText = input.value;
  arrPosition = typedText.length;

  if (arrPosition > text.length) {
    input.value = typedText.substring(0, text.length);
    arrPosition = text.length;
  }

  for (let i = 0; i < text.length; i++) {
    let span = given.children[i];
    span.style.color = "";
    span.style.backgroundColor = "";
  }

  correctChars = 0;
  wrongChars = 0;

  for (let i = 0; i < arrPosition; i++) {
    let span = given.children[i];
    if (typedText[i] === givenArr[i]) {
      span.style.color = "green";
      correctChars++;
    } else {
      span.style.color = "red";
      wrongChars++;
    }
  }

  if (arrPosition === text.length && text.length > 0) {
    timer.textContent = "Complete!";
    clearInterval(intervalID);
    input.disabled = true;
    stats();
    return;
  }

  if (arrPosition < text.length) {
    let newSpan = given.children[arrPosition];
    newSpan.style.backgroundColor = "black";
    newSpan.style.color = "white";
  }
});

reset.addEventListener("click", () => {
  time = 30;
  timer.textContent = 30;
  clearInterval(intervalID);
  isTimerRunning = false;
  input.value = "";
  input.disabled = false;
  arrPosition = 0;
  correctChars = 0;
  wrongChars = 0;
  wpmClass.textContent = "wpm";
  accuracyClass.textContent = "accuracy";
  loadQuote();
});

loadQuote();
