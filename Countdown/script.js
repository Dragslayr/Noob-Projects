let body = document.querySelector("body");
let cnt = 10;
setInterval(() => {
  if (cnt >= 0) {
    console.log(cnt);
    body.textContent = cnt;
    body.style.backgroundColor = cnt % 2 === 1 ? "white" : "red";
    body.style.color = cnt % 2 === 0 ? "white" : "black";
    cnt--;
  } else if (cnt === -1) {
    body.textContent = "FIRE! 🔥";
  } else {
    clearInterval(interval);
  }
}, 1000);
