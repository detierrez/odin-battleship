const MISSED_SHOT = "missed";

class Gameboard {
  constructor(size = 10) {
    this.board = arrayOfNulls(size).map(() => arrayOfNulls(size));
    this.ships = [];
  }

  itemAt(row, col) {
    return this.board[row][col];
  }

  placeShip(ship, row, col, isVertical = false) {
    if (!this.canPlaceShip(ship, row, col, isVertical)) return false;

    for (let i = 0; i < ship.length; i++) {
      this.board[row + i * isVertical][col + i * !isVertical] = ship;
    }

    this.ships.push(ship);

    return true;
  }

  canPlaceShip(ship, row, col, isVertical) {
    // ship can't get out of range
    if (row < 0 || col < 0) return false;

    const end = (isVertical ? row : col) + ship.length - 1;
    const maxIndex = this.board.length - 1;
    if (end > maxIndex) return false;

    // ships can't touch on the ends
    const hasSternSpace = isVertical ? row - 1 >= 0 : col - 1 >= 0;
    let offRow = isVertical ? row - 1 : row;
    let offCol = isVertical ? col : col - 1;
    if (hasSternSpace && this.board[offRow][offCol] !== null) return false;

    const hasBowSpace = end + 1 <= maxIndex;
    offRow = isVertical ? end + 1 : row;
    offCol = isVertical ? col : end + 1;
    if (hasBowSpace && this.board[offRow][offCol] !== null) return false;

    // ships can't touch on the sides
    const hasPortSpace = isVertical ? col - 1 >= 0 : row - 1 >= 0;
    const offStart = hasPortSpace ? -1 : 0;

    const hasStarbSpace = isVertical
      ? col + 1 <= maxIndex
      : row + 1 <= maxIndex;
    const offEnd = hasStarbSpace ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      for (let j = offStart; j <= offEnd; j++) {
        offRow = isVertical ? row + i : row + j;
        offCol = isVertical ? col + j : col + i;
        if (this.board[offRow][offCol] !== null) return false;
      }
    }

    return true;
  }

  randomPlace(ship) {
    const maxIndex = this.board.length - 1;

    while (true) {
      const rndRow = randInt(maxIndex);
      const rndCol = randInt(maxIndex);
      const rndDir = randBool();
      if (this.placeShip(ship, rndRow, rndCol, rndDir)) {
        return;
      }
    }
  }

  receiveAttack(row, col) {
    const item = this.board[row][col];
    if (item === MISSED_SHOT) return;
    if (item === null) {
      this.board[row][col] = MISSED_SHOT;
      return;
    }
    item.hit();
  }

  get hasAllShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk) return false;
    }
    return true;
  }
}

function arrayOfNulls(size) {
  return Array(size).fill(null);
}

function randInt(b, a = 0) {
  return Math.floor(Math.random() * b + 1) + a;
}

function randBool() {
  return Math.random() >= 0.5;
}

export default Gameboard;
