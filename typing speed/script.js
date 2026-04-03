let timer = document.querySelector(".timer");
let input = document.querySelector("input");
let reset = document.querySelector("button");
let given = document.querySelector(".given");

given.textContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dolor fuga veritatis consequatur architecto vel quod illo ea fugit veniam libero nostrum dignissimos, id labore deleniti accusamus alias nesciunt nam?";

let time = 5;
let isTimerRunning = false;
let intervalID;
function cntDown() {
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
  if (!isTimerRunning) cntDown();
});
reset.addEventListener("click", () => {
  time = 5;
  clearInterval(intervalID);
  timer.textContent = "Time";
  isTimerRunning = false;
  input.value = "";
});
