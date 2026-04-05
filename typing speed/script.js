let timer = document.querySelector(".timer");
let input = document.querySelector("input");
let resetBtn = document.querySelector("#resetBtn");
let given = document.querySelector(".given");
let wpmClass = document.querySelector(".wpm");
let accuracyClass = document.querySelector(".accuracy");
let timeSelect = document.querySelector("#timeSelect");
let caseSelect = document.querySelector("#caseSelect");
let bestWpmDisplay = document.querySelector("#bestWpm");

let typeSound = new Audio("short-click-of-a-computer-mouse.mp3");
let clickSound = new Audio("mixkit-modern-technology-select-3124.wav");
let cheatSound = new Audio("mixkit-on-or-off-light-switch-tap-2585.wav");

let text = "";
let givenArr = [];
let defaultTime = 30;
let time = 30;
let isTimerRunning = false;
let intervalID;
let arrPosition = 0;
let correctChars = 0;
let wrongChars = 0;
let previousInput = "";

let highScore = localStorage.getItem("typingHighScore") || 0;
bestWpmDisplay.textContent = highScore;

async function loadQuote() {
  try {
    given.textContent = "Loading existential crisis...";
    const randomSkip = Math.floor(Math.random() * 140);
    const response = await fetch(
      `https://dummyjson.com/quotes?limit=3&skip=${randomSkip}`,
    );
    const data = await response.json();
    text = data.quotes.map((q) => q.quote).join(" ");

    if (caseSelect.value === "lower") {
      text = text.toLowerCase();
    }

    setupGame();
  } catch (error) {
    text =
      "The stoic philosopher observes the chaos of the world not with apathy, but with a tranquil mind. We suffer more often in imagination than in reality. True freedom is found not in the absence of conflict, but in the absolute mastery of one's own internal reactions to the external world.";
    if (caseSelect.value === "lower") text = text.toLowerCase();
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
  let timeSpent = defaultTime - time;
  if (timeSpent === 0) timeSpent = 1;

  let wpm = Math.round((correctChars / 5 / timeSpent) * 60) || 0;
  let accuracy =
    Math.round((correctChars / (correctChars + wrongChars)) * 100) || 0;

  wpmClass.textContent = "wpm: " + wpm;
  accuracyClass.textContent = "accuracy: " + accuracy + "%";

  if (wpm > highScore) {
    highScore = wpm;
    localStorage.setItem("typingHighScore", highScore);
    bestWpmDisplay.textContent = highScore;
  }
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

input.addEventListener("mousedown", (e) => {
  e.preventDefault();
  input.focus();
});

input.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.key.startsWith("Arrow")) {
    e.preventDefault();
    try {
      cheatSound.currentTime = 0;
      cheatSound.play();
    } catch (err) {}
  }
});

input.addEventListener("input", (e) => {
  if (
    e.inputType === "insertReplacementText" ||
    e.inputType === "insertFromPaste" ||
    (e.data && e.data.length > 1)
  ) {
    try {
      cheatSound.currentTime = 0;
      cheatSound.play();
    } catch (err) {}
    input.value = previousInput;
  } else {
    try {
      typeSound.currentTime = 0;
      typeSound.play();
    } catch (err) {}
    previousInput = input.value;
  }

  if (!isTimerRunning && time === defaultTime) timerFn();

  let typedText = input.value;

  if (typedText.length > text.length) {
    typedText = typedText.substring(0, text.length);
    input.value = typedText;
    previousInput = input.value;
  }

  arrPosition = typedText.length;

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
      if (givenArr[i] === " ") {
        span.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
      }
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

function playClickSound() {
  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch (err) {}
}

function resetGame() {
  playClickSound();
  defaultTime = parseInt(timeSelect.value);
  time = defaultTime;
  timer.textContent = time;

  clearInterval(intervalID);
  isTimerRunning = false;
  input.value = "";
  previousInput = "";
  input.disabled = false;
  arrPosition = 0;
  correctChars = 0;
  wrongChars = 0;
  wpmClass.textContent = "wpm";
  accuracyClass.textContent = "accuracy";
  loadQuote();
}

resetBtn.addEventListener("click", resetGame);
timeSelect.addEventListener("change", resetGame);
caseSelect.addEventListener("change", resetGame);

loadQuote();
timer.textContent = defaultTime;
