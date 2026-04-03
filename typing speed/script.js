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

input.addEventListener("keydown", (e) => {
  if (e.key.length > 1 && e.key !== "Backspace") return;
  if (!isTimerRunning) timerFn();
  let span = given.children[arrPosition];
  if (e.key == "Backspace" && arrPosition > 0) {
    arrPosition--;
    span = given.children[arrPosition];
    span.style.color = "";
  } else if (e.key == givenArr[arrPosition]) {
    span.style.color = "green";
    arrPosition++;
  } else {
    span.style.color = "red";
    arrPosition++;
  }
});
reset.addEventListener("click", () => {
  time = 5;
  clearInterval(intervalID);
  timer.textContent = "Time";
  isTimerRunning = false;
  input.value = "";
});
