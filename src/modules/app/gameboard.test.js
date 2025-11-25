import Gameboard from "./gameboard";

it("initializes with empty cells", () => {
  const size = 10;
  const gb = new Gameboard(size);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      expect(gb.shipAt(row, col)).toBeNull();
    }
  }
});

it("retrieves ships correctly", () => {
  const gb = new Gameboard(10);

  const ship = { model: "dummyShip1" };
  gb.placeShip(ship, 0, 1);
  expect(gb.shipAt(0, 1)).toBe(ship);

  const ship2 = { model: "dummyShip2" };
  gb.placeShip(ship2, 4, 3);
  expect(gb.shipAt(4, 3)).toBe(ship2);
});

it("calls", () => {});
