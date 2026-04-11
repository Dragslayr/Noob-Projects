let select = document.querySelector("select");
let time = document.querySelector(".time");
let thead = document.querySelector(".thead");
let startBtn = document.querySelector(".start button");
let resetBtn = document.querySelector(".reset button");
let quote = document.querySelector(".quote");
let cntdown = document.querySelector(".cntdown");
let boxes = document.querySelectorAll(".box");
const api_url = "https://dummyjson.com/quotes/random";
let clickSound = new Audio("assets/clickSound.wav");
let hoverSound = new Audio("assets/hover.wav");
let bgm = new Audio("assets/bgm.wav");
async function getQuote() {
  try {
    quote.textContent = "loading...";
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const text = data.quote;
    quote.textContent = text;
  } catch (error) {
    console.log("error message:", error.message);
    quote.textContent = "The only true wisdom is in knowing you know nothing";
  }
}

function showCntdown(min, sec) {
  boxes[0].textContent = Math.floor(min / 10);
  boxes[1].textContent = Math.floor(min % 10);
  boxes[2].textContent = Math.floor(sec / 10);
  boxes[3].textContent = Math.floor(sec % 10);
}
let intervalId = null;
function callCntdown() {
  if (intervalId) return;
  let min = Number(select.value);
  let sec = 0;

  intervalId = setInterval(() => {
    if (min === 0 && sec === 0) {
      clickSound.currentTime = 0;
      clickSound.play();
      bgm.currentTime = 0;
      bgm.pause();
      time.hidden = false;
      time.textContent = "congrats! keep it up.";
      cntdown.style.display = "none";
      clearInterval(intervalId);
      intervalId = null;
      return;
    }
    console.log(`${min} : ${sec}`);
    if (sec === 0) {
      min--;
      sec = 59;
    }
    if (sec === 30) getQuote();
    showCntdown(min, sec);
    sec--;
  }, 1000);
}

select.addEventListener("change", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  time.textContent = select.value + "min";
});

startBtn.addEventListener("click", () => {
  if (select.value != "time") {
    clickSound.currentTime = 0;

    clickSound.play();

    bgm.currentTime = 0;
    bgm.volume = 0.2;
    bgm.loop = true;
    bgm.play();

    getQuote();
    startBtn.hidden = true;
    resetBtn.hidden = false;
    thead.hidden = true;
    time.hidden = true;
    cntdown.style.display = "flex";
    showCntdown(Number(select.value), 0);
    callCntdown();
  }
});

resetBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  startBtn.hidden = false;
  resetBtn.hidden = true;
  thead.hidden = false;
  quote.textContent = "";
  time.hidden = false;
  cntdown.style.display = "none";
  clearInterval(intervalId);
  intervalId = null;
  bgm.pause();
  bgm.currentTime = 0;
});

select.addEventListener("mouseover", () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
});
select.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
});

startBtn.addEventListener("mouseover", () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
});

resetBtn.addEventListener("mouseover", () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
});
