let timer = document.querySelector(".timer");
let input = document.querySelector("input");
let reset = document.querySelector("button");
let given = document.querySelector(".given");

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
function timerFn() {
  isTimerRunning = true;
  intervalID = setInterval(() => {
    if (time > 0) {
      timer.textContent = time;
      time--;
    } else {
      timer.textContent = "Time's UP!";
      clearInterval(intervalID);
      isTimerRunning = false;
    }
  }, 1000);
}

given.children[0].style.backgroundColor = "black";
given.children[0].style.color = "white";

input.addEventListener("keydown", (e) => {
  if (arrPosition >= text.length || time === 0) return;
  if (e.key.length > 1 && e.key !== "Backspace") return;
  if (!isTimerRunning) timerFn();

  let span = given.children[arrPosition];
  span.style.backgroundColor = "";
  span.style.color = "";
  if (e.key === "Backspace" && arrPosition >= 0) {
    if (arrPosition > 0) arrPosition--;
    span = given.children[arrPosition];
    span.style.color = "";
  } else if (e.key == givenArr[arrPosition]) {
    span.style.color = "green";
    arrPosition++;
  } else {
    span.style.color = "red";
    arrPosition++;
  }
  if (arrPosition === text.length) {
    timer.textContent = "Complete!";
    clearInterval(intervalID);
  }
  if (arrPosition < text.length) {
    let newSpan = given.children[arrPosition];
    newSpan.style.backgroundColor = "black";
    newSpan.style.color = "white";
  }
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
  timer.textContent = 30;
  isTimerRunning = false;
  input.value = "";
});
