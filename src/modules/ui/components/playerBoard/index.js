import "./style.css";

export default function renderPlayerBoard(playerTag, gameBoard) {
  const playerBoard = document.createElement("div");
  playerBoard.classList.add("player-board");
  playerBoard.append(playerTag, gameBoard);
  return playerBoard;
}
