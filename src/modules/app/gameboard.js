class Gameboard {
  constructor(size = 10) {
    this.board = arrayOfNulls(size).map(() => arrayOfNulls(size));
  }

  shipAt(row, col) {
    return this.board[row][col];
  }

  placeShip(ship, row, col) {
    this.board[row][col] = ship;
  }

  receiveAttack(row, col) {
    const item = this.board[row][col];
    if (item !== null) return;
    if (item === null) {
      this[row][col] = false;
    }
    item.hit()
  }
}

function arrayOfNulls(size) {
  return Array(size).fill(null);
}

export default Gameboard;
