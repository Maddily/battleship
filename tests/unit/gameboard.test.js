import Gameboard from '../../src/gameboard.js';
import Ship from '../../src/ship.js';

describe('Gameboard', () => {
  describe('placeShip', () => {
    let gameboard;

    beforeEach(() => {
      gameboard = new Gameboard();
    });

    test('A ship is placed at the given coordinates on x axis', () => {
      const battleship = new Ship(4, 'battleship');
      gameboard.placeShip(battleship, [8, 6], 'x');

      expect(gameboard.board[8][6].ship).toBe(battleship);
      expect(gameboard.board[8][7].ship).toBe(battleship);
      expect(gameboard.board[8][8].ship).toBe(battleship);
      expect(gameboard.board[8][9].ship).toBe(battleship);
    });

    test('A ship is placed at the given coordinates on y axis', () => {
      const carrier = new Ship(5, 'carrier');
      gameboard.placeShip(carrier, [5, 4], 'y');

      expect(gameboard.board[5][4].ship).toBe(carrier);
      expect(gameboard.board[6][4].ship).toBe(carrier);
      expect(gameboard.board[7][4].ship).toBe(carrier);
      expect(gameboard.board[8][4].ship).toBe(carrier);
      expect(gameboard.board[9][4].ship).toBe(carrier);
    });

    test('A ship is not placed in a way that makes it go overboard on x axis', () => {
      const cruiser = new Ship(3, 'cruiser');
      gameboard.placeShip(cruiser, [4, 8], 'x');

      expect(gameboard.board[4][8]).toBeNull();
    });

    test('A ship is not placed in a way that makes it go overboard on y axis', () => {
      const cruiser = new Ship(3, 'cruiser');
      gameboard.placeShip(cruiser, [8, 4], 'y');

      expect(gameboard.board[8][4]).toBeNull();
    });

    test('A ship does not overlap another', () => {
      const submarine = new Ship(3, 'submarine');
      gameboard.placeShip(submarine, [5, 6], 'x');

      const destroyer = new Ship(2, 'destroyer');
      gameboard.placeShip(destroyer, [5, 6], 'y');

      expect(gameboard.board[6][6]).toBeNull();
    });
  });

  describe('receiveAttack', () => {
    let gameboard;

    beforeEach(() => {
      gameboard = new Gameboard();

      gameboard.placeShip(gameboard.carrier, [2, 3], 'x');
      gameboard.placeShip(gameboard.battleship, [5, 3], 'y');
      gameboard.placeShip(gameboard.submarine, [5, 6], 'x');
      gameboard.placeShip(gameboard.cruiser, [7, 6], 'y');
      gameboard.placeShip(gameboard.destroyer, [1, 1], 'y');
    });

    test('It calls the hit method on the correct ship when it receives a hit', () => {
      gameboard.receiveAttack([5, 3]);

      expect(gameboard.battleship.hits).toBeGreaterThan(0);
      expect(gameboard.board[5][3].hit).toBeTruthy();
    });

    test('The gameboard keeps track of missed attacks', () => {
      gameboard.receiveAttack([0, 4]);
      gameboard.receiveAttack([3, 1]);
      gameboard.receiveAttack([7, 7]);

      expect(gameboard.missedAttacks).toEqual([
        [0, 4],
        [3, 1],
        [7, 7],
      ]);
    });

    test('The gameboard reports if all ships are sunk', () => {
      let sunk;

      for (let i = 2, j = 3, k = 0; k < 5; j++, k++) {
        gameboard.receiveAttack([i, j]);
      }

      for (let i = 5, j = 3, k = 0; k < 4; i++, k++) {
        gameboard.receiveAttack([i, j]);
      }

      for (let i = 5, j = 6, k = 0; k < 3; j++, k++) {
        gameboard.receiveAttack([i, j]);
      }

      for (let i = 7, j = 6, k = 0; k < 3; i++, k++) {
        gameboard.receiveAttack([i, j]);
      }

      for (let i = 1, j = 1, k = 0; k < 2; i++, k++) {
        gameboard.receiveAttack([i, j]);
      }

      expect(gameboard.allSunk).toBeTruthy();
    });
  });
});
