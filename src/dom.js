import { listenOnEnemyBoardAttack, listenOnCellClick, attackPlayerBoard } from './index.js';

export function renderPlacingShipsInterface(playerBoard, axis) {
  clearMain();

  const boardContainer = createBoardContainer(playerBoard);
  const shipDirection = createShipDirectionButton(axis);

  const main = document.querySelector('main');
  main.append(boardContainer, shipDirection);
}

function createBoardContainer(playerBoard) {
  const boardTitle = document.createElement('h1');
  boardTitle.className = 'place-ship-board-title';
  boardTitle.textContent = 'Place your ships';

  const board = document.createElement('div');
  board.className = 'board';

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.className = 'place-cell';
      cell.setAttribute('data-coordinates', `${i},${j}`);

      if (playerBoard.board[i][j] !== null) {
        cell.classList.add('occupied');
      }

      board.appendChild(cell);
    }
  }

  const boardContainer = document.createElement('section');
  boardContainer.className = 'place-ships-board-container';

  boardContainer.append(boardTitle, board);

  return boardContainer;
}

function createShipDirectionButton(axis) {
  const shipDirection = document.createElement('button');
  shipDirection.className = 'ship-direction';
  shipDirection.textContent = axis === 'x' ? 'Horizontal' : 'Vertical';

  return shipDirection;
}

export function handleHighlighting(
  player,
  cell,
  axis,
  coordinates,
  placeShipsBoardContainer,
  length,
  ship
) {
  const canPlace = player.gameboard.canPlaceShip(ship, coordinates, axis);

  if (canPlace) {
    highlightValidCells(
      cell,
      axis,
      coordinates,
      placeShipsBoardContainer,
      length
    );
    listenOnCellClick(cell, coordinates, ship);
  } else {
    cell.classList.add('can-not-place');
  }
}

export function highlightValidCells(
  cell,
  axis,
  coordinates,
  placeShipsBoardContainer,
  length
) {
  cell.classList.remove('can-not-place');
  if (axis === 'x') {
    for (let i = 0; i < length; i++, cell = cell.nextElementSibling) {
      cell.classList.add('can-place');
    }
  } else {
    for (
      let i = coordinates[0], j = coordinates[1], k = 0;
      k < length;
      i++,
        k++,
        cell = placeShipsBoardContainer.querySelector(
          `[data-coordinates='${i},${j}']`
        )
    ) {
      cell.classList.add('can-place');
    }
  }
}

export function removeCellHighlighting() {
  const cells = document.querySelectorAll('.place-cell');
  cells.forEach((cell) => {
    cell.classList.remove('can-place');
  });
}

export function handleHovering(e, numberOfShipsLeftToPlace, player, axis, placeShipsBoardContainer) {
  // Remove previous cell highlighting
  removeCellHighlighting();

  let cell = e.target.closest('.place-cell');
  if (cell) {
    const coordinates = cell.dataset.coordinates
      .split(',')
      .map((number) => number * 1);

    let length;
    let ship;

    // Try to place the ship in turn
    switch (numberOfShipsLeftToPlace) {
      case 5:
        ship = player.gameboard.carrier;
        length = 5;

        handleHighlighting(
          player,
          cell,
          axis,
          coordinates,
          placeShipsBoardContainer,
          length,
          ship
        );

        break;
      case 4:
        ship = player.gameboard.battleship;
        length = 4;

        handleHighlighting(
          player,
          cell,
          axis,
          coordinates,
          placeShipsBoardContainer,
          length,
          ship
        );

        break;
      case 3:
        ship = player.gameboard.cruiser;
        length = 3;

        handleHighlighting(
          player,
          cell,
          axis,
          coordinates,
          placeShipsBoardContainer,
          length,
          ship
        );

        break;
      case 2:
        ship = player.gameboard.submarine;
        length = 3;

        handleHighlighting(
          player,
          cell,
          axis,
          coordinates,
          placeShipsBoardContainer,
          length,
          ship
        );

        break;
      case 1:
        ship = player.gameboard.destroyer;
        length = 2;

        handleHighlighting(
          player,
          cell,
          axis,
          coordinates,
          placeShipsBoardContainer,
          length,
          ship
        );

        break;
    }
  }
}

export function clearMain() {
  const main = document.querySelector('main');
  main.innerHTML = '';
}
