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

async function loadQuote() {
  try {
    given.textContent = "Summoning the Charioteer...";
    const chapter = Math.floor(Math.random() * 18) + 1;
    const sloka = Math.floor(Math.random() * 20) + 1;
    const response = await fetch(
      `https://bhagavadgitaapi.in/slok/${chapter}/${sloka}`,
    );
    const data = await response.json();
    text = data.siva.et || data.purohit.et;
    setupGame();
  } catch (error) {
    text =
      "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.";
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

  if (
    e.inputType === "insertReplacementText" ||
    (e.data && e.data.length > 1)
  ) {
    let lastSpace = input.value.lastIndexOf(" ");
    input.value = input.value.substring(0, lastSpace + 1);
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
