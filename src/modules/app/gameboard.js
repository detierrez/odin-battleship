class Gameboard {
  constructor(size = 10) {
    this.board = arrayOfNulls(size).map(() => arrayOfNulls(size));
    this.size = this.board.length;
    this.maxIndex = this.board.length - 1;
    this.ships = [];
    this.firedCoords = new Set();
  }

  getCell(x, y) {
    const cellValue = this.board[x][y];
    const isHit = this.firedCoords.has(`${x},${y}`);

    if (cellValue === null) {
      if (isHit) {
        return "-";
      } else {
        return " ";
      }
    } else {
      if (isHit) {
        return "X";
      } else {
        return "S";
      }
    }
  }

  placeShip(ship, x, y, isVertical = false) {
    if (!this.canPlaceShip(ship, x, y, isVertical)) return false;

    for (let i = 0; i < ship.length; i++) {
      this.board[x + i * isVertical][y + i * !isVertical] = ship;
    }

    this.ships.push(ship);

    return true;
  }

  canPlaceShip(ship, x, y, isVertical) {
    // ship can't get out of range
    if (x < 0 || y < 0) return false;

    const end = (isVertical ? x : y) + ship.length - 1;
    if (end > this.maxIndex) return false;

    let x_, y_;
    // it's rear can't touch another ship
    const hasSternSpace = isVertical ? x - 1 >= 0 : y - 1 >= 0;
    [x_, y_] = isVertical ? [x - 1, y] : [x, y - 1];
    if (hasSternSpace && this.board[x_][y_] !== null) return false;

    // it's tip can't touch another ship
    const hasBowSpace = end + 1 <= this.maxIndex;
    [x_, y_] = isVertical ? [end + 1, y] : [x, end + 1];
    if (hasBowSpace && this.board[x_][y_] !== null) return false;

    // ships can't touch on the sides
    const hasPortSpace = isVertical ? y - 1 >= 0 : x - 1 >= 0;
    const wStart = hasPortSpace ? -1 : 0;

    const hasStarbSpace = isVertical
      ? y + 1 <= this.maxIndex
      : x + 1 <= this.maxIndex;
    const wEnd = hasStarbSpace ? 1 : 0;

    for (let lOffset = 0; lOffset < ship.length; lOffset++) {
      for (let wOffset = wStart; wOffset <= wEnd; wOffset++) {
        [x_, y_] = isVertical
          ? [x + lOffset, y + wOffset]
          : [x + wOffset, y + lOffset];
        if (this.board[x_][y_] !== null) return false;
      }
    }

    return true;
  }

  randomPlace(ship) {
    while (true) {
      const rndX = randInt(this.maxIndex);
      const rndY = randInt(this.maxIndex);
      const rndDir = randBool();
      if (this.placeShip(ship, rndX, rndY, rndDir)) {
        return;
      }
    }
  }

  receiveAttack(x, y) {
    // return if cell has been attacked already
    const key = `${x},${y}`;
    if (this.firedCoords.has(key)) return false;
    this.firedCoords.add(key);

    const value = this.board[x][y];
    if (value !== null) value.hit();

    return true;
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
