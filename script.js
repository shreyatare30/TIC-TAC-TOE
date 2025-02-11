  const gameBoard = document.getElementById("gameBoard");
  const statusMessage = document.getElementById("statusMessage");
  const restartButton = document.getElementById("restartButton");
  const winnerPopup = document.getElementById("winnerPopup");
  const popupMessage = document.getElementById("popupMessage");
  const newGameButton = document.getElementById("newGameButton");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes("") ? null : "Draw";
  }

  function showPopup(message) {
    popupMessage.textContent = message;
    winnerPopup.style.display = "flex";
  }

  function updateGameStatus() {
    const winner = checkWinner();
    if (winner) {
      isGameActive = false;
      if (winner === "Draw") {
        showPopup("It's a Draw!");
      } else {
        showPopup(`Player ${winner} Wins!`);
      }
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }

  function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    updateGameStatus();
  }

  function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;

    document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
    winnerPopup.style.display = "none";
  }

  gameBoard.addEventListener("click", handleCellClick);
  restartButton.addEventListener("click", restartGame);
  newGameButton.addEventListener("click", restartGame);

  statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
