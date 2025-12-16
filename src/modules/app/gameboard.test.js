import Gameboard from "./gameboard";

it("initializes with empty cells", () => {
  const size = 10;
  const gb = new Gameboard(size);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      expect(gb.itemAt(row, col)).toBeNull();
    }
  }
});

describe("ship placing", () => {
  const gb = new Gameboard(10);
  const ship = { model: "genericObject" };
  const ship2 = { model: "genericObject2" };

  it("places first ship correctly", () => {
    gb.placeShip(ship, 0, 1);
    expect(gb.itemAt(0, 1)).toBe(ship);
  });

  it("places second ship correctly", () => {
    gb.placeShip(ship2, 4, 3);
    expect(gb.itemAt(4, 3)).toBe(ship2);
  });

  test("second ship to not affect first ship", () => {
    gb.placeShip(ship, 0, 1);
    expect(gb.itemAt(0, 1)).toBe(ship);
  });
});

describe("ship attacking", () => {
  const gb = new Gameboard(10);
  it("tracks missed attacks", () => {
    const coords = [0, 0];
    gb.receiveAttack(...coords);
    expect(gb.itemAt(...coords)).toBe("missed");
  });

  const ship = { model: "genericObject", hit: jest.fn() };
  it("calls receiveAttack calls ship.hit", () => {
    const coords = [0, 1];
    gb.placeShip(ship, ...coords);
    gb.receiveAttack(...coords);
    expect(ship.hit).toHaveBeenCalled();
  });
});

test("reports all ships have been sunk", () => {
  const gb = new Gameboard(10);

  expect(gb.areAllShipsSunk).toBe(true);

  const ship = { model: "genericObject", isSunk: true };
  gb.placeShip(ship, 0, 0);
  expect(gb.areAllShipsSunk).toBe(true);

  ship.isSunk = false;
  expect(gb.areAllShipsSunk).toBe(false);
});

it("calls", () => {});
