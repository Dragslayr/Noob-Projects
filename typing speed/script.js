let timer = document.querySelector(".timer");
let input = document.querySelector("input");
let reset = document.querySelector("button");
let given = document.querySelector(".given");
let wpmClass = document.querySelector(".wpm");
let accuracyClass = document.querySelector(".accuracy");

given.textContent =
  "lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dolor fuga veritatis consequatur architecto vel quod illo ea fugit veniam libero nostrum dignissimos, id labore deleniti accusamus alias nesciunt nam?";

let text = given.textContent;
given.textContent = "";
let givenArr = [];

for (let i = 0; i < text.length; i++) {
  let span = document.createElement("span");
  span.textContent = text[i];
  given.appendChild(span);
  givenArr[i] = text[i];
}
let time = 30;
let isTimerRunning = false;
let intervalID;
let arrPosition = 0;

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

given.children[0].style.backgroundColor = "black";
given.children[0].style.color = "white";

let correctChars = 0;
let wrongChars = 0;

input.addEventListener("mousedown", (e) => {
  e.preventDefault();
  input.focus();
});
input.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) {
    e.preventDefault();
    return;
  }

  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    return;
  }
});
input.addEventListener("input", (e) => {
  if (!isTimerRunning && time > 0) timerFn();

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

  if (arrPosition >= text.length) {
    timer.textContent = "Complete!";
    clearInterval(intervalID);
    input.disabled = true;
    stats();
    return;
  }

  let currentSpan = given.children[arrPosition];
  currentSpan.style.backgroundColor = "black";
  currentSpan.style.color = "white";
});

reset.addEventListener("click", () => {
  time = 30;
  for (let i = 0; i < text.length; i++) {
    let span = given.children[i];
    span.style.backgroundColor = "";
    span.style.color = "";
  }
  given.children[0].style.backgroundColor = "black";
  given.children[0].style.color = "white";
  clearInterval(intervalID);
  arrPosition = 0;
  correctChars = 0;
  wrongChars = 0;
  timer.textContent = 30;
  isTimerRunning = false;
  input.value = "";
  input.disabled = false;
  wpmClass.textContent = "wpm";
  accuracyClass.textContent = "accuracy";
});
