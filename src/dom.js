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
