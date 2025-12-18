import "modern-normalize";
import "./css/reset.css";
import "./css/base.css";

import Player from "./modules/app/player";
import Gameboard from "./modules/app/gameboard";
import Ship from "./modules/app/ship";

import { clearUI, initializeUI, updateUI } from "./modules/ui";

const gb1 = new Gameboard();
const gb2 = new Gameboard();

for (const gb of [gb1, gb2]) {
  generateFloat().forEach((ship) => {
    gb.randomPlace(ship);
  });
}

const stage = "prepare";
const isSoloGame = true;
const players = [new Player("Player", gb1), new Player("StockBird", gb2)];
let currentPlayer = players[0];

initializeUI(players, onAttack);
updateUI(players, currentPlayer);

const computer = {
  playMove() {
    if (!this.possibleMoves) {
      this.possibleMoves = this.generateAllMoves(10);
    }
    const i = getRandomIndex(this.possibleMoves);
    const move = popAt(i, this.possibleMoves);
    return move;
  },

  generateAllMoves(n) {
    const coordinates = [];
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        coordinates.push([x, y]);
      }
    }
    return coordinates;
  },
};

function onAttack(attacked, row, col) {
  if (attacked === currentPlayer) {
    console.log("Don't hit yourself!");
    return;
  }

  const hit = attacked.gameboard.receiveAttack(row, col);
  if (!hit) {
    console.log("can't hit twice!");
    return;
  }
  if (attacked.gameboard.hasAllShipsSunk) {
    clearUI();
    return;
  }

  if (isSoloGame) {
    const computerMove = computer.playMove();
    currentPlayer.gameboard.receiveAttack(...computerMove);
    if (currentPlayer.gameboard.hasAllShipsSunk) {
      clearUI();
      return;
    }
  } else {
    switchTurn();
  }

  updateUI(players, currentPlayer);
}

function generateFloat() {
  const ships = [];
  for (let length = 4; length >= 1; length--) {
    const amount = 5 - length;
    for (let j = 0; j < amount; j++) {
      ships.push(new Ship(length));
    }
  }

  return ships;
}

function switchTurn() {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
}

function getRandomIndex(array) {
  return randInt(array.length);
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function popAt(i, array) {
  return array.splice(i, 1)[0];
}
