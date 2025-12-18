import "./style.css";

export default function renderGameboard(size, playerTag) {
  const gameboard = document.createElement("div");
  gameboard.classList.add("gameboard");
  gameboard.style.setProperty("--size", size);
  gameboard.dataset.playerTag = playerTag;

  return gameboard;
}
