import "./style.css";

export default function renderCell(row, col, content) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.textContent = content;
  return cell;
}
