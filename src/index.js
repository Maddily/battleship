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

function listenOnShipDirectionChange() {
  const shipDirection = document.querySelector('.ship-direction');
  shipDirection.addEventListener('click', () => {
    axis = axis === 'x' ? 'y' : 'x';

    shipDirection.textContent = axis === 'x' ? 'Horizontal' : 'Vertical';
  });
}
