import Ship from '../../src/ship.js';

describe('Ship', () => {
  describe('hit', () => {
    let ship;

    beforeEach(() => {
      ship = new Ship(5, 'carrier');
    });

    test('hits value is incremented', () => {
      ship.hit();
      expect(ship.hits).toBe(1);
    });

    test('hits value is not incremented beyond the length of a ship', () => {
      for (let i = 0; i < 10; i++) {
        ship.hit();
      }
      expect(ship.hits).toBe(5);
      expect(ship.hits).toBeLessThanOrEqual(ship.shipLength);
    });
  });

  describe('isSunk', () => {
    let ship;

    beforeEach(() => {
      ship = new Ship(2, 'destroyer');
    });

    test('Correctly identifies a ship that is sunk', () => {
      for (let i = 0; i < 2; i++) {
        ship.hit();
      }
      expect(ship.isSunk()).toBeTruthy();
    });

    test('Correctly identifies a ship that is not sunk', () => {
      ship.hit();
      expect(ship.isSunk()).toBeFalsy();
    });
  });
});
