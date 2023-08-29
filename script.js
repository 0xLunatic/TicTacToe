const cells = document.querySelectorAll("td");
let currentPlayer = "X";
const messageElement = document.getElementById("message");
let swapState;

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
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

function aiTurn() {
  swapState = true;
  const emptyCells = Array.from(cells).filter((cell) => !cell.textContent);
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiCell = emptyCells[randomIndex];

    // Delay AI move by 2 seconds (2000 milliseconds)
    setTimeout(() => {
      aiCell.textContent = "O";
      swapState = false;
      messageElement.textContent = "It's your turn!";
      const aiWinner = checkWin();
      if (aiWinner) {
        messageElement.textContent = `${aiWinner} wins! Clearing the area!`;
        setTimeout(() => {
          cells.forEach((cell) => {
            cell.textContent = "";
            swapState = false;
            messageElement.textContent = "It's your turn!";
          });
        }, 2000);
      } else {
        const remainingEmptyCells = Array.from(cells).filter(
          (cell) => !cell.textContent
        );
        if (remainingEmptyCells.length === 0) {
          messageElement.textContent = "It's a draw!";
        }
      }
    }, 2000);
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!swapState) {
      if (!cell.textContent) {
        cell.textContent = currentPlayer;
        messageElement.textContent = "It's your turn!";
        const winner = checkWin();
        if (winner) {
          messageElement.textContent = `${winner} wins! Clearing the arena!`;
          setTimeout(() => {
            cells.forEach((cell) => {
              cell.textContent = "";
              swapState = false;
              messageElement.textContent = "It's your turn!";
            });
          }, 2000);
        } else {
          messageElement.textContent = "It's now AI turn!";
          aiTurn();
        }
      }
    }
  });
});
