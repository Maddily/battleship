import './styles/styles.css';
import './styles/normalize.css';
import {
  createPlayers,
  placeShips,
  findRandomUnattackedCell,
  isAlreadyAttacked,
  delayRendering,
} from './utils.js';
import {
  renderPlacingShipsInterface,
  handleHovering,
} from './dom.js';

let player, computer;
let playerTurn = Math.random() < 0.5 ? true : false;
let numberOfShipsLeftToPlace = 5;
let axis = 'x';
let gameOver = false;

function handleNameInput() {
  const name = nameInput.value.trim();
  if (name.toLowerCase() === 'computer' || name === '') return;

  ({ player, computer } = createPlayers(name));

  // Render one board for the player to place their ships
  renderPlacingShipsInterface(player.gameboard, axis);
  listenOnBoardHovering();
  listenOnShipDirectionChange();

  // For now, place the computer's ships in the same place. Randomize it later
  placeShips(computer.gameboard);
}

// Listen for player name input when Enter key is pressed
const nameInput = document.querySelector('.name-input');
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleNameInput();
  }
});

// Listen for player name input when start button is clicked
const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
  handleNameInput();
});

function handleEnemyBoardClick(e) {
  const enemyCell = e.target.closest('.enemy-cell');

  if (enemyCell) {
    if (isAlreadyAttacked(enemyCell)) return;

    const coordinates = enemyCell.dataset.coordinates
      .split(',')
      .map((number) => number * 1);

    handleAttack(computer.gameboard, coordinates);

    playerTurn = false;
    attackPlayerBoard();
    listenOnEnemyBoardAttack();
  }
}

export function listenOnEnemyBoardAttack() {
  if (!playerTurn) return;

  const enemyBoard = document.querySelector('.computer-board');
  if (enemyBoard) {
    enemyBoard.addEventListener('click', handleEnemyBoardClick);
  }
}

export function attackPlayerBoard() {
  const playerBoard = document.querySelector('.player-board');
  if (playerBoard) {
    toggleEnemyBoardInteraction();

    // Generate random coordinates
    const coordinatesToAttack = findRandomUnattackedCell(playerBoard);

    updateStatus();

    handleAttack(player.gameboard, coordinatesToAttack);
  }
}

function handleAttack(board, coordinates) {
  board.receiveAttack(coordinates);

  if (!playerTurn) {
    playerTurn = true;
    delayRendering(() =>
      updateGameView(player, computer, playerTurn, gameOver)
    );
  } else {
    updateGameView(player, computer, playerTurn, gameOver);
  }

  if (board.allSunk) {
    gameOver = true;
    announceWinner(player.gameboard.allSunk ? undefined : player.name);
    listenOnRestartGameButton();
  }
}

function listenOnRestartGameButton() {
  const restartGame = document.querySelector('.restart');
  restartGame.addEventListener('click', () => {
    window.location.reload();
  });
}

// Listen on hovering action on the board to place ships
function listenOnBoardHovering() {
  const placeShipsBoardContainer = document.querySelector(
    '.place-ships-board-container'
  );
  placeShipsBoardContainer.addEventListener('mouseover', (e) => {
    handleHovering(
      e,
      numberOfShipsLeftToPlace,
      player,
      axis,
      placeShipsBoardContainer
    );
  });
}

function handleCellClick(coordinates, ship) {
  const placed = player.gameboard.placeShip(ship, coordinates, axis);
  if (placed) {
    numberOfShipsLeftToPlace -= 1;
  }

  if (numberOfShipsLeftToPlace === 0) {
    updateGameView(player, computer, playerTurn, gameOver);
    return;
  }

  renderPlacingShipsInterface(player.gameboard, axis);
  listenOnBoardHovering();
  listenOnShipDirectionChange();
}

export function listenOnCellClick(cell, coordinates, ship) {
  cell.addEventListener('click', () => {
    handleCellClick(coordinates, ship);
  });
}

function listenOnShipDirectionChange() {
  const shipDirection = document.querySelector('.ship-direction');
  shipDirection.addEventListener('click', () => {
    axis = axis === 'x' ? 'y' : 'x';

    shipDirection.textContent = axis === 'x' ? 'Horizontal' : 'Vertical';
  });
}
