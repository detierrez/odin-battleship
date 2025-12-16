const MISSED_SHOT = "missed";

class Gameboard {
  constructor(size = 10) {
    this.board = arrayOfNulls(size).map(() => arrayOfNulls(size));
    this.ships = [];
  }

  itemAt(row, col) {
    return this.board[row][col];
  }

  placeShip(ship, row, col) {
    this.board[row][col] = ship;
    this.ships.push(ship);
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

  get areAllShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk) return false;
    }
    return true;
  }
}

function arrayOfNulls(size) {
  return Array(size).fill(null);
}

export default Gameboard;
