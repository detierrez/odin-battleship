import renderCell from "./components/cell";
import renderGameboard from "./components/gameboard";
import renderPlayerBoard from "./components/playerBoard";

export function initializeUI(players, onClick) {
  for (const player of players) {
    const playerTag = renderPlayerTag(player.name);
    const gameboard = renderGameboard(
      player.gameboard.board.length,
      player.name,
    );
    gameboard.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.classList.contains("cell")) return;
      const { row, col } = target.dataset;
      onClick(player, row, col);
    });

    const playerBoard = renderPlayerBoard(playerTag, gameboard);
    document.body.append(playerBoard);
  }
  document.body.append(renderPlayerTag(players[0].name));
}

export function updateUI(players, currentPlayer) {
  for (const player of players) {
    const cells = renderCells(player.gameboard.board);
    const selector = `.gameboard[data-player-tag="${player.name}"]`;
    const gameboard = document.querySelector(selector);
    gameboard.replaceChildren(...cells);
  }
  document.querySelector("h1").textContent = currentPlayer.name;
}

export function clearUI() {
  document.body.innerHTML = "";
}

function renderCells(board) {
  const size = board.length;
  const cells = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const item = board[row][col];
      const text = item === "missed" ? "-" : item === null ? " " : "S";
      const cell = renderCell(row, col, text);
      cells.push(cell);
    }
  }
  return cells;
}

function renderPlayerTag(name) {
  const playerTag = document.createElement("h1");
  playerTag.textContent = name;
  return playerTag;
}
