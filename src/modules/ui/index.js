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
    const cells = renderCells(player.gameboard);
    const selector = `.gameboard[data-player-tag="${player.name}"]`;
    const gameboard = document.querySelector(selector);
    gameboard.replaceChildren(...cells);
  }
  document.querySelector("h1").textContent = currentPlayer.name;
}

export function clearUI() {
  document.body.innerHTML = "";
}

function renderCells(gameboard) {
  const size = gameboard.size;
  const cells = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = renderCell(x, y, gameboard.getCell(x, y));
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
