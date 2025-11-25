import Ship from "./ship";

test("hits count up", () => {
  const shipLength = 10;
  const ship = new Ship(shipLength);

  const totalHits = 10;
  expect(ship.hits).toBe(0);
  for (let hits = 1; hits <= totalHits; hits++) {
    ship.hit();
    expect(ship.hits).toBe(hits);
  }
});

test("ship gets sunk", () => {
  const shipLength = 10;
  const ship = new Ship(shipLength);
  expect(ship.isSunk).toBe(false);

  for (let hits = 1; hits < shipLength; hits++) {
    ship.hit();
    expect(ship.isSunk).toBe(false);
  }

  for (let hits = 1; hits < 10; hits++) {
    ship.hit();
    expect(ship.isSunk).toBe(true);
  }
});
