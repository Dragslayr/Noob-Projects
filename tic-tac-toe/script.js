let cells = document.querySelectorAll(".cell");
let resetButton = document.getElementById("reset-button");
let cnt = 0;

function markCell(event) {
  let cell = event.target;
  if (cell.textContent === "") {
    if (cnt % 2 === 0) {
      cell.textContent = "X";
    } else {
      cell.textContent = "O";
    }
    cnt++;
  }
  let winner = checkWin();
  setTimeout(() => {
    if (winner) {
      alert(winner + " wins!");
      resetGame();
    } else if (cnt === 9) {
      alert("It's a draw!");
      resetGame();
    }
  }, 1);
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  cnt = 0;
}

function checkWin() {
  let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return cells[a].textContent;
    }
  }
  return null;
}

resetButton.addEventListener("click", resetGame);
cells.forEach((cell) => {
  cell.addEventListener("click", markCell);
});
