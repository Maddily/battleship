/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   announceWinner: () => (/* binding */ announceWinner),
/* harmony export */   clearMain: () => (/* binding */ clearMain),
/* harmony export */   handleHighlighting: () => (/* binding */ handleHighlighting),
/* harmony export */   handleHovering: () => (/* binding */ handleHovering),
/* harmony export */   highlightValidCells: () => (/* binding */ highlightValidCells),
/* harmony export */   removeCellHighlighting: () => (/* binding */ removeCellHighlighting),
/* harmony export */   renderBoards: () => (/* binding */ renderBoards),
/* harmony export */   renderPlacingShipsInterface: () => (/* binding */ renderPlacingShipsInterface),
/* harmony export */   renderStatus: () => (/* binding */ renderStatus),
/* harmony export */   toggleEnemyBoardInteraction: () => (/* binding */ toggleEnemyBoardInteraction),
/* harmony export */   updateGameView: () => (/* binding */ updateGameView),
/* harmony export */   updateStatus: () => (/* binding */ updateStatus)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");

function renderPlacingShipsInterface(playerBoard, axis) {
  clearMain();
  var boardContainer = createBoardContainer(playerBoard);
  var shipDirection = createShipDirectionButton(axis);
  var main = document.querySelector('main');
  main.append(boardContainer, shipDirection);
}
function createBoardContainer(playerBoard) {
  var boardTitle = document.createElement('h1');
  boardTitle.className = 'place-ship-board-title';
  boardTitle.textContent = 'Place your ships';
  var board = document.createElement('div');
  board.className = 'board';
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = document.createElement('div');
      cell.className = 'place-cell';
      cell.setAttribute('data-coordinates', "".concat(i, ",").concat(j));
      if (playerBoard.board[i][j] !== null) {
        cell.classList.add('occupied');
      }
      board.appendChild(cell);
    }
  }
  var boardContainer = document.createElement('section');
  boardContainer.className = 'place-ships-board-container';
  boardContainer.append(boardTitle, board);
  return boardContainer;
}
function createShipDirectionButton(axis) {
  var shipDirection = document.createElement('button');
  shipDirection.className = 'ship-direction';
  shipDirection.textContent = axis === 'x' ? 'Horizontal' : 'Vertical';
  return shipDirection;
}
function handleHighlighting(player, cell, axis, coordinates, placeShipsBoardContainer, length, ship) {
  var canPlace = player.gameboard.canPlaceShip(ship, coordinates, axis);
  if (canPlace) {
    highlightValidCells(cell, axis, coordinates, placeShipsBoardContainer, length);
    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.listenOnCellClick)(cell, coordinates, ship);
  } else {
    cell.classList.add('can-not-place');
  }
}
function highlightValidCells(cell, axis, coordinates, placeShipsBoardContainer, length) {
  cell.classList.remove('can-not-place');
  if (axis === 'x') {
    for (var i = 0; i < length; i++, cell = cell.nextElementSibling) {
      cell.classList.add('can-place');
    }
  } else {
    for (var _i = coordinates[0], j = coordinates[1], k = 0; k < length; _i++, k++, cell = placeShipsBoardContainer.querySelector("[data-coordinates='".concat(_i, ",").concat(j, "']"))) {
      cell.classList.add('can-place');
    }
  }
}
function removeCellHighlighting() {
  var cells = document.querySelectorAll('.place-cell');
  cells.forEach(function (cell) {
    cell.classList.remove('can-place');
  });
}
function handleHovering(e, numberOfShipsLeftToPlace, player, axis, placeShipsBoardContainer) {
  // Remove previous cell highlighting
  removeCellHighlighting();
  var cell = e.target.closest('.place-cell');
  if (cell) {
    var coordinates = cell.dataset.coordinates.split(',').map(function (number) {
      return number * 1;
    });
    var length;
    var ship;

    // Try to place the ship in turn
    switch (numberOfShipsLeftToPlace) {
      case 5:
        ship = player.gameboard.carrier;
        length = 5;
        handleHighlighting(player, cell, axis, coordinates, placeShipsBoardContainer, length, ship);
        break;
      case 4:
        ship = player.gameboard.battleship;
        length = 4;
        handleHighlighting(player, cell, axis, coordinates, placeShipsBoardContainer, length, ship);
        break;
      case 3:
        ship = player.gameboard.cruiser;
        length = 3;
        handleHighlighting(player, cell, axis, coordinates, placeShipsBoardContainer, length, ship);
        break;
      case 2:
        ship = player.gameboard.submarine;
        length = 3;
        handleHighlighting(player, cell, axis, coordinates, placeShipsBoardContainer, length, ship);
        break;
      case 1:
        ship = player.gameboard.destroyer;
        length = 2;
        handleHighlighting(player, cell, axis, coordinates, placeShipsBoardContainer, length, ship);
        break;
    }
  }
}
function clearMain() {
  var main = document.querySelector('main');
  main.innerHTML = '';
}
function renderStatus(name) {
  var statusContainer = document.createElement('section');
  statusContainer.className = 'status-container';
  var status = document.createElement('p');
  status.className = 'status';
  status.textContent = "Standing by for your command, Captain ".concat(name, "...");
  statusContainer.appendChild(status);
  var main = document.querySelector('main');
  main.appendChild(statusContainer);
}
function updateStatus() {
  var status = document.querySelector('.status');
  status.textContent = 'Incoming… hold steady!';
}
function renderBoards(playerBoard, computerBoard) {
  var playerBoardContainer = renderPlayerBoard(playerBoard);
  var computerBoardContainer = renderComputerBoard(computerBoard);
  var boardsContainer = document.createElement('section');
  boardsContainer.className = 'boards-container';
  boardsContainer.append(playerBoardContainer, computerBoardContainer);
  var main = document.querySelector('main');
  main.appendChild(boardsContainer);
}
function renderPlayerBoard(playerBoard) {
  var playerBoardTitle = document.createElement('p');
  playerBoardTitle.className = 'player-board-title board-title';
  playerBoardTitle.textContent = 'Your Fleet';
  var playerGameBoard = document.createElement('div');
  playerGameBoard.className = 'player-board board';
  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('data-coordinates', "".concat(i, ",").concat(j));

      // If these coordinates are in the missed attacks array, mark the square
      var missedAttack = playerBoard.missedAttacks.some(function (coordinates) {
        return coordinates[0] === i && coordinates[1] === j;
      });
      if (missedAttack) {
        cell.classList.add('missed');
      }
      if (playerBoard.board[i][j] !== null) {
        cell.classList.add('occupied');

        // Mark the square if it's been hit
        if (playerBoard.board[i][j].hit) {
          cell.classList.add('hit');
        }
      }
      playerGameBoard.appendChild(cell);
    };
    for (var j = 0; j < 10; j++) {
      _loop2(j);
    }
  };
  for (var i = 0; i < 10; i++) {
    _loop(i);
  }
  var playerBoardContainer = document.createElement('article');
  playerBoardContainer.className = 'player-board-container board-container';
  playerBoardContainer.append(playerBoardTitle, playerGameBoard);
  return playerBoardContainer;
}
function renderComputerBoard(computerBoard) {
  var computerBoardTitle = document.createElement('p');
  computerBoardTitle.className = 'computer-board-title board-title';
  computerBoardTitle.textContent = 'Enemy Waters';
  var computerGameBoard = document.createElement('div');
  computerGameBoard.className = 'computer-board board';
  var _loop3 = function _loop3(i) {
    var _loop4 = function _loop4(j) {
      var cell = document.createElement('div');
      cell.className = 'enemy-cell cell';
      cell.setAttribute('data-coordinates', "".concat(i, ",").concat(j));

      // Mark the square if it has a missed attack
      var missedAttack = computerBoard.missedAttacks.some(function (coordinates) {
        return coordinates[0] === i && coordinates[1] === j;
      });
      if (missedAttack) {
        cell.classList.add('missed');
      }

      // Mark the square if it's been hit
      if (computerBoard.board[i][j] !== null && computerBoard.board[i][j].hit) {
        cell.classList.add('hit');
      }
      computerGameBoard.appendChild(cell);
    };
    for (var j = 0; j < 10; j++) {
      _loop4(j);
    }
  };
  for (var i = 0; i < 10; i++) {
    _loop3(i);
  }
  var computerBoardContainer = document.createElement('article');
  computerBoardContainer.className = 'computer-board-container board-container';
  computerBoardContainer.append(computerBoardTitle, computerGameBoard);
  return computerBoardContainer;
}
function updateGameView(player, computer, playerTurn, gameOver) {
  if (gameOver) return;
  clearMain();
  renderBoards(player.gameboard, computer.gameboard);
  renderStatus(player.name);
  if (playerTurn) {
    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.listenOnEnemyBoardAttack)();
  } else {
    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.attackPlayerBoard)();
  }
}
function createRestartButton() {
  var restartButton = document.createElement('button');
  restartButton.className = 'restart';
  restartButton.textContent = 'Battle Again';
  return restartButton;
}
function announceWinner() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  clearMain();
  var messageText;
  if (name) {
    messageText = "Victory! Captain ".concat(name, " has conquered the seas!");
  } else {
    messageText = "Defeat... our fleet has been vanquished.";
  }
  var message = document.createElement('p');
  message.className = 'game-end-message';
  message.textContent = messageText;
  var main = document.querySelector('main');
  main.append(message, createRestartButton());
}
function toggleEnemyBoardInteraction() {
  var enemyBoard = document.querySelector('.computer-board');
  enemyBoard.classList.toggle('clickable');
}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var _Gameboard_brand = /*#__PURE__*/new WeakSet();
var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    _classCallCheck(this, Gameboard);
    _classPrivateMethodInitSpec(this, _Gameboard_brand);
    _defineProperty(this, "missedAttacks", []);
    _defineProperty(this, "allSunk", false);
    this.board = Array.from(Array(10), function () {
      return new Array(10).fill(null);
    });
    this.carrier = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](5, 'carrier');
    this.battleship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](4, 'battleship');
    this.cruiser = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](3, 'cruiser');
    this.submarine = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](3, 'submarine');
    this.destroyer = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](2, 'destroyer');
    this.ships = [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer];
  }
  return _createClass(Gameboard, [{
    key: "canPlaceShip",
    value: function canPlaceShip(ship, coordinates, axis) {
      if (axis === 'x') {
        for (var i = coordinates[0], j = coordinates[1], k = 0; k < ship.shipLength && i < 10 && j < 10; j++, k++) {
          if (this.board[i][j] !== null) {
            return false;
          }
          if (j === 9 && k < ship.shipLength - 1) {
            return false;
          }
          continue;
        }
        return true;
      } else {
        for (var _i = coordinates[0], _j = coordinates[1], _k = 0; _k < ship.shipLength && _i < 10 && _j < 10; _i++, _k++) {
          if (this.board[_i][_j] !== null) {
            return false;
          }
          if (_i === 9 && _k < ship.shipLength - 1) {
            return false;
          }
          continue;
        }
        return true;
      }
    }
  }, {
    key: "placeShip",
    value: function placeShip(ship, coordinates, axis) {
      if (!this.canPlaceShip(ship, coordinates, axis)) return false;
      if (axis === 'x') {
        for (var i = coordinates[0], j = coordinates[1], k = 0; k < ship.shipLength; j++, k++) {
          this.board[i][j] = {
            hit: false,
            ship: ship
          };
        }
      } else {
        for (var _i2 = coordinates[0], _j2 = coordinates[1], _k2 = 0; _k2 < ship.shipLength; _i2++, _k2++) {
          this.board[_i2][_j2] = {
            hit: false,
            ship: ship
          };
        }
      }
      return true;
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(coordinates) {
      if (!_assertClassBrand(_Gameboard_brand, this, _isOccupied).call(this, coordinates)) {
        this.missedAttacks.push(coordinates);
        return;
      }
      if (!_assertClassBrand(_Gameboard_brand, this, _areValidCoordinates).call(this, coordinates)) {
        return;
      }

      // Record an attack on the ship
      this.board[coordinates[0]][coordinates[1]].ship.hit();
      this.board[coordinates[0]][coordinates[1]].hit = true;
      this.allSunk = _assertClassBrand(_Gameboard_brand, this, _areAllShipsSunk).call(this);
    }
  }]);
}();
function _isOccupied(coordinates) {
  if (this.board[coordinates[0]][coordinates[1]] !== null) {
    return true;
  }
  return false;
}
function _areAllShipsSunk() {
  return this.ships.every(function (ship) {
    return ship.isSunk();
  });
}
function _areValidCoordinates(coordinates) {
  if (coordinates[0] < 0 || coordinates[0] > 9 || coordinates[1] < 0 || coordinates[1] > 9) {
    return false;
  }
  return true;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attackPlayerBoard: () => (/* binding */ attackPlayerBoard),
/* harmony export */   listenOnCellClick: () => (/* binding */ listenOnCellClick),
/* harmony export */   listenOnEnemyBoardAttack: () => (/* binding */ listenOnEnemyBoardAttack)
/* harmony export */ });
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");
/* harmony import */ var _styles_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/normalize.css */ "./src/styles/normalize.css");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");




var player, computer;
var playerTurn = Math.random() < 0.5 ? true : false;
var numberOfShipsLeftToPlace = 5;
var axis = 'x';
var gameOver = false;
function handleNameInput() {
  var name = nameInput.value.trim();
  if (name.toLowerCase() === 'computer' || name === '') return;
  // Render one board for the player to place their ships
  var _createPlayers = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.createPlayers)(name);
  player = _createPlayers.player;
  computer = _createPlayers.computer;
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.renderPlacingShipsInterface)(player.gameboard, axis);
  listenOnBoardHovering();
  listenOnShipDirectionChange();

  // For now, place the computer's ships in the same place. Randomize it later
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.placeShips)(computer.gameboard);
}

// Listen for player name input when Enter key is pressed
var nameInput = document.querySelector('.name-input');
nameInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    handleNameInput();
  }
});

// Listen for player name input when start button is clicked
var startButton = document.querySelector('.start');
startButton.addEventListener('click', function () {
  handleNameInput();
});
function handleEnemyBoardClick(e) {
  var enemyCell = e.target.closest('.enemy-cell');
  if (enemyCell) {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isAlreadyAttacked)(enemyCell)) return;
    var coordinates = enemyCell.dataset.coordinates.split(',').map(function (number) {
      return number * 1;
    });
    handleAttack(computer.gameboard, coordinates);
    playerTurn = false;
    attackPlayerBoard();
    listenOnEnemyBoardAttack();
  }
}
function listenOnEnemyBoardAttack() {
  if (!playerTurn) return;
  var enemyBoard = document.querySelector('.computer-board');
  if (enemyBoard) {
    enemyBoard.addEventListener('click', handleEnemyBoardClick);
  }
}
function attackPlayerBoard() {
  var playerBoard = document.querySelector('.player-board');
  if (playerBoard) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.toggleEnemyBoardInteraction)();

    // Generate random coordinates
    var coordinatesToAttack = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.findRandomUnattackedCell)(playerBoard);
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.updateStatus)();
    handleAttack(player.gameboard, coordinatesToAttack);
  }
}
function handleAttack(board, coordinates) {
  board.receiveAttack(coordinates);
  if (!playerTurn) {
    playerTurn = true;
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.delayRendering)(function () {
      return (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.updateGameView)(player, computer, playerTurn, gameOver);
    });
  } else {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.updateGameView)(player, computer, playerTurn, gameOver);
  }
  if (board.allSunk) {
    gameOver = true;
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.announceWinner)(player.gameboard.allSunk ? undefined : player.name);
    listenOnRestartGameButton();
  }
}
function listenOnRestartGameButton() {
  var restartGame = document.querySelector('.restart');
  restartGame.addEventListener('click', function () {
    window.location.reload();
  });
}

// Listen on hovering action on the board to place ships
function listenOnBoardHovering() {
  var placeShipsBoardContainer = document.querySelector('.place-ships-board-container');
  placeShipsBoardContainer.addEventListener('mouseover', function (e) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.handleHovering)(e, numberOfShipsLeftToPlace, player, axis, placeShipsBoardContainer);
  });
}
function handleCellClick(coordinates, ship) {
  var placed = player.gameboard.placeShip(ship, coordinates, axis);
  if (placed) {
    numberOfShipsLeftToPlace -= 1;
  }
  if (numberOfShipsLeftToPlace === 0) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.updateGameView)(player, computer, playerTurn, gameOver);
    return;
  }
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.renderPlacingShipsInterface)(player.gameboard, axis);
  listenOnBoardHovering();
  listenOnShipDirectionChange();
}
function listenOnCellClick(cell, coordinates, ship) {
  cell.addEventListener('click', function () {
    handleCellClick(coordinates, ship);
  });
}
function listenOnShipDirectionChange() {
  var shipDirection = document.querySelector('.ship-direction');
  shipDirection.addEventListener('click', function () {
    axis = axis === 'x' ? 'y' : 'x';
    shipDirection.textContent = axis === 'x' ? 'Horizontal' : 'Vertical';
  });
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

var Player = /*#__PURE__*/_createClass(function Player() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Computer';
  _classCallCheck(this, Player);
  this.name = name;
  this.gameboard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
});


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _hits = /*#__PURE__*/new WeakMap();
var Ship = /*#__PURE__*/function () {
  function Ship(length, name) {
    _classCallCheck(this, Ship);
    _classPrivateFieldInitSpec(this, _hits, 0);
    this.shipLength = length;
    this.name = name;
  }
  return _createClass(Ship, [{
    key: "hits",
    get: function get() {
      return _classPrivateFieldGet(_hits, this);
    }
  }, {
    key: "hit",
    value: function hit() {
      if (_classPrivateFieldGet(_hits, this) < this.shipLength) {
        _classPrivateFieldSet(_hits, this, _classPrivateFieldGet(_hits, this) + 1);
      }
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      if (_classPrivateFieldGet(_hits, this) === this.shipLength) {
        return true;
      }
      return false;
    }
  }]);
}();


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPlayers: () => (/* binding */ createPlayers),
/* harmony export */   delayRendering: () => (/* binding */ delayRendering),
/* harmony export */   findRandomUnattackedCell: () => (/* binding */ findRandomUnattackedCell),
/* harmony export */   isAlreadyAttacked: () => (/* binding */ isAlreadyAttacked),
/* harmony export */   placeShips: () => (/* binding */ placeShips)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");

function createPlayers(name) {
  var player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](name);
  var computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]();
  return {
    player: player,
    computer: computer
  };
}
function placeShips(gameboard) {
  placeShip(gameboard, gameboard.carrier);
  placeShip(gameboard, gameboard.battleship);
  placeShip(gameboard, gameboard.cruiser);
  placeShip(gameboard, gameboard.submarine);
  placeShip(gameboard, gameboard.destroyer);
}
function placeShip(gameboard, ship) {
  var _generateRandomCoordi = generateRandomCoordinates(),
    i = _generateRandomCoordi.i,
    j = _generateRandomCoordi.j;
  var axis = Math.random() < 0.5 ? 'x' : 'y';
  while (!gameboard.canPlaceShip(ship, [i, j], axis)) {
    var _generateRandomCoordi2 = generateRandomCoordinates();
    i = _generateRandomCoordi2.i;
    j = _generateRandomCoordi2.j;
    axis = Math.random() < 0.5 ? 'x' : 'y';
  }
  gameboard.placeShip(ship, [i, j], axis);
}
function generateRandomCoordinates() {
  return {
    i: Math.floor(Math.random() * (9 - 0 + 1) + 0),
    j: Math.floor(Math.random() * (9 - 0 + 1) + 0)
  };
}
function isAlreadyAttacked(cell) {
  return cell.classList.contains('missed') || cell.classList.contains('hit');
}
function findRandomUnattackedCell(playerBoard) {
  var _generateRandomCoordi3 = generateRandomCoordinates(),
    i = _generateRandomCoordi3.i,
    j = _generateRandomCoordi3.j;
  var cell = playerBoard.querySelector("[data-coordinates='".concat(i, ",").concat(j, "']"));
  var alreadyAttacked = isAlreadyAttacked(cell);
  while (alreadyAttacked) {
    var _generateRandomCoordi4 = generateRandomCoordinates();
    i = _generateRandomCoordi4.i;
    j = _generateRandomCoordi4.j;
    var _cell = playerBoard.querySelector("[data-coordinates='".concat(i, ",").concat(j, "']"));
    alreadyAttacked = isAlreadyAttacked(_cell);
  }
  return [i, j];
}
function delayRendering(callback) {
  setTimeout(callback, 1000);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/normalize.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/normalize.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on \`h1\` elements within \`section\` and
 * \`article\` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input {
  /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select {
  /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from \`fieldset\` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    \`fieldset\` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type='checkbox'],
[type='radio'] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}
`, "",{"version":3,"sources":["webpack://./src/styles/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;;EAEE,MAAM;EACN,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;;EAEE,MAAM;EACN,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type='button']::-moz-focus-inner,\n[type='reset']::-moz-focus-inner,\n[type='submit']::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type='button']:-moz-focusring,\n[type='reset']:-moz-focusring,\n[type='submit']:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type='checkbox'],\n[type='radio'] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type='number']::-webkit-inner-spin-button,\n[type='number']::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type='search']::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/efco-brookshire-regular.ttf */ "./src/assets/fonts/efco-brookshire-regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/brown-logo.png */ "./src/assets/images/brown-logo.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/missed.svg */ "./src/assets/images/missed.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/hit.svg */ "./src/assets/images/hit.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: 'EFCO Brookshire';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

* {
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'EFCO Brookshire', Arial, Helvetica, sans-serif;
  background: linear-gradient(
    90deg,
    rgb(31, 38, 61) 0%,
    rgb(47, 61, 99) 29%,
    rgb(43, 55, 92) 76%,
    rgb(31, 38, 61) 100%
  );
}

header {
  height: fit-content;
}

.logo {
  background: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  height: 170px;
  width: 170px;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
  margin: 0 auto;
  justify-self: center;
}

main {
  padding: 20px 0;
  text-align: center;
}

.new-game {
  margin-top: 60px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.name {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.enter-name {
  font-size: 1.2rem;
}

.name-input {
  padding-left: 10px;
  width: 100%;
  height: 30px;
  color: #374772;
  border-radius: 2px;
  border: none;
  background: linear-gradient(
    90deg,
    rgb(152, 152, 147) 0%,
    rgb(244, 238, 205) 10%,
    rgb(244, 238, 205) 90%,
    rgb(152, 152, 147) 100%
  );
}

.name-input:focus {
  outline: none;
}

.name-input::placeholder {
  font-size: 0.9rem;
}

.start,
.restart, .ship-direction {
  width: 100px;
  padding: 10px 0;
  font-size: 1.2rem;
  background: linear-gradient(
    90deg,
    rgb(219, 206, 150) 0%,
    rgb(255, 243, 187) 29%,
    rgb(255, 243, 187) 76%,
    rgb(219, 206, 150) 100%
  );
  color: #4e5f8e;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

.start:active,
.restart:active, .ship-direction:active {
  color: #374772;
  background: linear-gradient(
    90deg,
    rgb(255, 243, 187) 0%,
    rgb(219, 206, 150) 29%,
    rgb(219, 206, 150) 76%,
    rgb(255, 243, 187) 100%
  );
}

.boards-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.board-title {
  color: rgb(237, 196, 115);
  font-size: 1.2rem;
}

.board {
  border: 2px solid rgb(255, 253, 244);
  display: grid;
  grid-template-columns: repeat(10, 20px);
  grid-template-rows: repeat(10, 20px);
  gap: 1px;
}

.cell, .place-cell {
  border: 1px solid rgb(255, 253, 244);
}

.computer-board .cell {
  cursor: pointer;
}

.computer-board .cell:hover {
  border: 3px solid rgb(132, 205, 72);
  cursor: crosshair;
}

.can-place {
  cursor: crosshair;
  background: rgba(143, 231, 71, 0.5);
}

.player-board .occupied, .board .occupied {
  background: rgb(237, 196, 115);
}

.missed {
  background: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
  background-repeat: no-repeat;
  background-size: contain;
}

.board .hit {
  background: url(${___CSS_LOADER_URL_REPLACEMENT_3___});
  background-repeat: no-repeat;
  background-size: contain;
}

.computer-board .hit:hover,
.computer-board .missed:hover {
  cursor: not-allowed;
  border: 3px solid red;
}

.can-not-place:hover {
  cursor: not-allowed;
  background: rgba(255, 0, 0, 0.4);
}

.status-container {
  background: rgba(94, 114, 170, 0.4);
  height: 40px;
  padding: 25px 40px;
  border-radius: 4px;
  margin: 20px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
}

.status,
.enter-name {
  color: rgb(237, 196, 115);
  text-align: center;
}

p {
  margin: 0;
}

.game-end-message {
  color: rgb(237, 196, 115);
  font-size: 2rem;
  text-align: center;
  margin-top: 100px;
}

.restart {
  margin-top: 100px;
  width: 180px;
  font-size: 1.6rem;
  padding: 10px 5px;
}

.place-ship-board-title {
  color: rgb(237, 196, 115);
  font-weight: normal;
}

.ship-direction {
  margin-top: 20px;
}

footer {
  width: 100%;
  min-height: 40px;
  font-size: 0.9rem;
  margin-top: auto;
  background: linear-gradient(
    90deg,
    rgb(152, 152, 147) 0%,
    rgb(244, 238, 205) 29%,
    rgb(244, 238, 205) 76%,
    rgb(152, 152, 147) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  color: #374772;
}

footer a {
  text-decoration: none;
  color: #566daf;
}

footer a:hover {
  color: #3351a3;
}

footer a:active {
  color: #4f66a6;
}

.clickable {
  pointer-events: none;
}

@media screen and (min-width: 500px) {
  .logo {
    height: 200px;
    width: 200px;
  }
}

@media screen and (min-width: 600px) {
  .boards-container {
    flex-direction: row;
    gap: 50px;
  }

  .status-container {
    width: 500px;
    margin-top: 40px;
  }
}

@media screen and (min-width: 700px) {
  .board {
    grid-template-columns: repeat(10, 30px);
    grid-template-rows: repeat(10, 30px);
    gap: 1px;
  }

  .board-title,
  .status-container {
    font-size: 1.4rem;
  }

  .status-container {
    height: 50px;
  }
}

@media screen and (min-width: 1200px) {
  .new-game {
    width: 300px;
    gap: 30px;
  }

  .name {
    gap: 30px;
  }

  .enter-name {
    font-size: 1.4rem;
  }

  .board-title {
    font-size: 1.6rem;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/styles.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: 'EFCO Brookshire';\n  src: url('../assets/fonts/efco-brookshire-regular.ttf');\n}\n\n* {\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  height: 100vh;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-family: 'EFCO Brookshire', Arial, Helvetica, sans-serif;\n  background: linear-gradient(\n    90deg,\n    rgb(31, 38, 61) 0%,\n    rgb(47, 61, 99) 29%,\n    rgb(43, 55, 92) 76%,\n    rgb(31, 38, 61) 100%\n  );\n}\n\nheader {\n  height: fit-content;\n}\n\n.logo {\n  background: url('../assets/images/brown-logo.png');\n  height: 170px;\n  width: 170px;\n  background-size: contain;\n  background-repeat: no-repeat;\n  display: block;\n  margin: 0 auto;\n  justify-self: center;\n}\n\nmain {\n  padding: 20px 0;\n  text-align: center;\n}\n\n.new-game {\n  margin-top: 60px;\n  width: 200px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n}\n\n.name {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n}\n\n.enter-name {\n  font-size: 1.2rem;\n}\n\n.name-input {\n  padding-left: 10px;\n  width: 100%;\n  height: 30px;\n  color: #374772;\n  border-radius: 2px;\n  border: none;\n  background: linear-gradient(\n    90deg,\n    rgb(152, 152, 147) 0%,\n    rgb(244, 238, 205) 10%,\n    rgb(244, 238, 205) 90%,\n    rgb(152, 152, 147) 100%\n  );\n}\n\n.name-input:focus {\n  outline: none;\n}\n\n.name-input::placeholder {\n  font-size: 0.9rem;\n}\n\n.start,\n.restart, .ship-direction {\n  width: 100px;\n  padding: 10px 0;\n  font-size: 1.2rem;\n  background: linear-gradient(\n    90deg,\n    rgb(219, 206, 150) 0%,\n    rgb(255, 243, 187) 29%,\n    rgb(255, 243, 187) 76%,\n    rgb(219, 206, 150) 100%\n  );\n  color: #4e5f8e;\n  border: none;\n  border-radius: 2px;\n  cursor: pointer;\n}\n\n.start:active,\n.restart:active, .ship-direction:active {\n  color: #374772;\n  background: linear-gradient(\n    90deg,\n    rgb(255, 243, 187) 0%,\n    rgb(219, 206, 150) 29%,\n    rgb(219, 206, 150) 76%,\n    rgb(255, 243, 187) 100%\n  );\n}\n\n.boards-container {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.board-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n\n.board-title {\n  color: rgb(237, 196, 115);\n  font-size: 1.2rem;\n}\n\n.board {\n  border: 2px solid rgb(255, 253, 244);\n  display: grid;\n  grid-template-columns: repeat(10, 20px);\n  grid-template-rows: repeat(10, 20px);\n  gap: 1px;\n}\n\n.cell, .place-cell {\n  border: 1px solid rgb(255, 253, 244);\n}\n\n.computer-board .cell {\n  cursor: pointer;\n}\n\n.computer-board .cell:hover {\n  border: 3px solid rgb(132, 205, 72);\n  cursor: crosshair;\n}\n\n.can-place {\n  cursor: crosshair;\n  background: rgba(143, 231, 71, 0.5);\n}\n\n.player-board .occupied, .board .occupied {\n  background: rgb(237, 196, 115);\n}\n\n.missed {\n  background: url('../assets/images/missed.svg');\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.board .hit {\n  background: url('../assets/images/hit.svg');\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.computer-board .hit:hover,\n.computer-board .missed:hover {\n  cursor: not-allowed;\n  border: 3px solid red;\n}\n\n.can-not-place:hover {\n  cursor: not-allowed;\n  background: rgba(255, 0, 0, 0.4);\n}\n\n.status-container {\n  background: rgba(94, 114, 170, 0.4);\n  height: 40px;\n  padding: 25px 40px;\n  border-radius: 4px;\n  margin: 20px auto 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 300px;\n}\n\n.status,\n.enter-name {\n  color: rgb(237, 196, 115);\n  text-align: center;\n}\n\np {\n  margin: 0;\n}\n\n.game-end-message {\n  color: rgb(237, 196, 115);\n  font-size: 2rem;\n  text-align: center;\n  margin-top: 100px;\n}\n\n.restart {\n  margin-top: 100px;\n  width: 180px;\n  font-size: 1.6rem;\n  padding: 10px 5px;\n}\n\n.place-ship-board-title {\n  color: rgb(237, 196, 115);\n  font-weight: normal;\n}\n\n.ship-direction {\n  margin-top: 20px;\n}\n\nfooter {\n  width: 100%;\n  min-height: 40px;\n  font-size: 0.9rem;\n  margin-top: auto;\n  background: linear-gradient(\n    90deg,\n    rgb(152, 152, 147) 0%,\n    rgb(244, 238, 205) 29%,\n    rgb(244, 238, 205) 76%,\n    rgb(152, 152, 147) 100%\n  );\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #374772;\n}\n\nfooter a {\n  text-decoration: none;\n  color: #566daf;\n}\n\nfooter a:hover {\n  color: #3351a3;\n}\n\nfooter a:active {\n  color: #4f66a6;\n}\n\n.clickable {\n  pointer-events: none;\n}\n\n@media screen and (min-width: 500px) {\n  .logo {\n    height: 200px;\n    width: 200px;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .boards-container {\n    flex-direction: row;\n    gap: 50px;\n  }\n\n  .status-container {\n    width: 500px;\n    margin-top: 40px;\n  }\n}\n\n@media screen and (min-width: 700px) {\n  .board {\n    grid-template-columns: repeat(10, 30px);\n    grid-template-rows: repeat(10, 30px);\n    gap: 1px;\n  }\n\n  .board-title,\n  .status-container {\n    font-size: 1.4rem;\n  }\n\n  .status-container {\n    height: 50px;\n  }\n}\n\n@media screen and (min-width: 1200px) {\n  .new-game {\n    width: 300px;\n    gap: 30px;\n  }\n\n  .name {\n    gap: 30px;\n  }\n\n  .enter-name {\n    font-size: 1.4rem;\n  }\n\n  .board-title {\n    font-size: 1.6rem;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/normalize.css":
/*!**********************************!*\
  !*** ./src/styles/normalize.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/efco-brookshire-regular.ttf":
/*!******************************************************!*\
  !*** ./src/assets/fonts/efco-brookshire-regular.ttf ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fonts/00cbb5534c3cbebe3d8c.ttf";

/***/ }),

/***/ "./src/assets/images/brown-logo.png":
/*!******************************************!*\
  !*** ./src/assets/images/brown-logo.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/37c461b3813841dd43bc.png";

/***/ }),

/***/ "./src/assets/images/hit.svg":
/*!***********************************!*\
  !*** ./src/assets/images/hit.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/34764aa3173624210117.svg";

/***/ }),

/***/ "./src/assets/images/missed.svg":
/*!**************************************!*\
  !*** ./src/assets/images/missed.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/d3b9b46e018a28d452f4.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG1DQUFtQztBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHdGQUF3RixZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxNQUFNLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxLQUFLLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLEtBQUss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QUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvbm9ybWFsaXplLmNzcz80M2Y0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlcy5jc3M/ZTQ1YiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxpc3Rlbk9uRW5lbXlCb2FyZEF0dGFjaywgbGlzdGVuT25DZWxsQ2xpY2ssIGF0dGFja1BsYXllckJvYXJkIH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJQbGFjaW5nU2hpcHNJbnRlcmZhY2UocGxheWVyQm9hcmQsIGF4aXMpIHtcbiAgY2xlYXJNYWluKCk7XG5cbiAgY29uc3QgYm9hcmRDb250YWluZXIgPSBjcmVhdGVCb2FyZENvbnRhaW5lcihwbGF5ZXJCb2FyZCk7XG4gIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBjcmVhdGVTaGlwRGlyZWN0aW9uQnV0dG9uKGF4aXMpO1xuXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIG1haW4uYXBwZW5kKGJvYXJkQ29udGFpbmVyLCBzaGlwRGlyZWN0aW9uKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRDb250YWluZXIocGxheWVyQm9hcmQpIHtcbiAgY29uc3QgYm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIGJvYXJkVGl0bGUuY2xhc3NOYW1lID0gJ3BsYWNlLXNoaXAtYm9hcmQtdGl0bGUnO1xuICBib2FyZFRpdGxlLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xuXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGJvYXJkLmNsYXNzTmFtZSA9ICdib2FyZCc7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjZWxsLmNsYXNzTmFtZSA9ICdwbGFjZS1jZWxsJztcbiAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGVzJywgYCR7aX0sJHtqfWApO1xuXG4gICAgICBpZiAocGxheWVyQm9hcmQuYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdvY2N1cGllZCcpO1xuICAgICAgfVxuXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NOYW1lID0gJ3BsYWNlLXNoaXBzLWJvYXJkLWNvbnRhaW5lcic7XG5cbiAgYm9hcmRDb250YWluZXIuYXBwZW5kKGJvYXJkVGl0bGUsIGJvYXJkKTtcblxuICByZXR1cm4gYm9hcmRDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBEaXJlY3Rpb25CdXR0b24oYXhpcykge1xuICBjb25zdCBzaGlwRGlyZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHNoaXBEaXJlY3Rpb24uY2xhc3NOYW1lID0gJ3NoaXAtZGlyZWN0aW9uJztcbiAgc2hpcERpcmVjdGlvbi50ZXh0Q29udGVudCA9IGF4aXMgPT09ICd4JyA/ICdIb3Jpem9udGFsJyA6ICdWZXJ0aWNhbCc7XG5cbiAgcmV0dXJuIHNoaXBEaXJlY3Rpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVIaWdobGlnaHRpbmcoXG4gIHBsYXllcixcbiAgY2VsbCxcbiAgYXhpcyxcbiAgY29vcmRpbmF0ZXMsXG4gIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcixcbiAgbGVuZ3RoLFxuICBzaGlwXG4pIHtcbiAgY29uc3QgY2FuUGxhY2UgPSBwbGF5ZXIuZ2FtZWJvYXJkLmNhblBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlcywgYXhpcyk7XG5cbiAgaWYgKGNhblBsYWNlKSB7XG4gICAgaGlnaGxpZ2h0VmFsaWRDZWxscyhcbiAgICAgIGNlbGwsXG4gICAgICBheGlzLFxuICAgICAgY29vcmRpbmF0ZXMsXG4gICAgICBwbGFjZVNoaXBzQm9hcmRDb250YWluZXIsXG4gICAgICBsZW5ndGhcbiAgICApO1xuICAgIGxpc3Rlbk9uQ2VsbENsaWNrKGNlbGwsIGNvb3JkaW5hdGVzLCBzaGlwKTtcbiAgfSBlbHNlIHtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Nhbi1ub3QtcGxhY2UnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0VmFsaWRDZWxscyhcbiAgY2VsbCxcbiAgYXhpcyxcbiAgY29vcmRpbmF0ZXMsXG4gIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcixcbiAgbGVuZ3RoXG4pIHtcbiAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjYW4tbm90LXBsYWNlJyk7XG4gIGlmIChheGlzID09PSAneCcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrLCBjZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2FuLXBsYWNlJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoXG4gICAgICBsZXQgaSA9IGNvb3JkaW5hdGVzWzBdLCBqID0gY29vcmRpbmF0ZXNbMV0sIGsgPSAwO1xuICAgICAgayA8IGxlbmd0aDtcbiAgICAgIGkrKyxcbiAgICAgICAgaysrLFxuICAgICAgICBjZWxsID0gcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGVzPScke2l9LCR7an0nXWBcbiAgICAgICAgKVxuICAgICkge1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjYW4tcGxhY2UnKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNlbGxIaWdobGlnaHRpbmcoKSB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYWNlLWNlbGwnKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY2FuLXBsYWNlJyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlSG92ZXJpbmcoZSwgbnVtYmVyT2ZTaGlwc0xlZnRUb1BsYWNlLCBwbGF5ZXIsIGF4aXMsIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcikge1xuICAvLyBSZW1vdmUgcHJldmlvdXMgY2VsbCBoaWdobGlnaHRpbmdcbiAgcmVtb3ZlQ2VsbEhpZ2hsaWdodGluZygpO1xuXG4gIGxldCBjZWxsID0gZS50YXJnZXQuY2xvc2VzdCgnLnBsYWNlLWNlbGwnKTtcbiAgaWYgKGNlbGwpIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGNlbGwuZGF0YXNldC5jb29yZGluYXRlc1xuICAgICAgLnNwbGl0KCcsJylcbiAgICAgIC5tYXAoKG51bWJlcikgPT4gbnVtYmVyICogMSk7XG5cbiAgICBsZXQgbGVuZ3RoO1xuICAgIGxldCBzaGlwO1xuXG4gICAgLy8gVHJ5IHRvIHBsYWNlIHRoZSBzaGlwIGluIHR1cm5cbiAgICBzd2l0Y2ggKG51bWJlck9mU2hpcHNMZWZ0VG9QbGFjZSkge1xuICAgICAgY2FzZSA1OlxuICAgICAgICBzaGlwID0gcGxheWVyLmdhbWVib2FyZC5jYXJyaWVyO1xuICAgICAgICBsZW5ndGggPSA1O1xuXG4gICAgICAgIGhhbmRsZUhpZ2hsaWdodGluZyhcbiAgICAgICAgICBwbGF5ZXIsXG4gICAgICAgICAgY2VsbCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGNvb3JkaW5hdGVzLFxuICAgICAgICAgIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcixcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgc2hpcFxuICAgICAgICApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBzaGlwID0gcGxheWVyLmdhbWVib2FyZC5iYXR0bGVzaGlwO1xuICAgICAgICBsZW5ndGggPSA0O1xuXG4gICAgICAgIGhhbmRsZUhpZ2hsaWdodGluZyhcbiAgICAgICAgICBwbGF5ZXIsXG4gICAgICAgICAgY2VsbCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGNvb3JkaW5hdGVzLFxuICAgICAgICAgIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcixcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgc2hpcFxuICAgICAgICApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzaGlwID0gcGxheWVyLmdhbWVib2FyZC5jcnVpc2VyO1xuICAgICAgICBsZW5ndGggPSAzO1xuXG4gICAgICAgIGhhbmRsZUhpZ2hsaWdodGluZyhcbiAgICAgICAgICBwbGF5ZXIsXG4gICAgICAgICAgY2VsbCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGNvb3JkaW5hdGVzLFxuICAgICAgICAgIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcixcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgc2hpcFxuICAgICAgICApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzaGlwID0gcGxheWVyLmdhbWVib2FyZC5zdWJtYXJpbmU7XG4gICAgICAgIGxlbmd0aCA9IDM7XG5cbiAgICAgICAgaGFuZGxlSGlnaGxpZ2h0aW5nKFxuICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICBjZWxsLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgY29vcmRpbmF0ZXMsXG4gICAgICAgICAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBzaGlwXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNoaXAgPSBwbGF5ZXIuZ2FtZWJvYXJkLmRlc3Ryb3llcjtcbiAgICAgICAgbGVuZ3RoID0gMjtcblxuICAgICAgICBoYW5kbGVIaWdobGlnaHRpbmcoXG4gICAgICAgICAgcGxheWVyLFxuICAgICAgICAgIGNlbGwsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBjb29yZGluYXRlcyxcbiAgICAgICAgICBwbGFjZVNoaXBzQm9hcmRDb250YWluZXIsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIHNoaXBcbiAgICAgICAgKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyTWFpbigpIHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgbWFpbi5pbm5lckhUTUwgPSAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0YXR1cyhuYW1lKSB7XG4gIGNvbnN0IHN0YXR1c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgc3RhdHVzQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdzdGF0dXMtY29udGFpbmVyJztcblxuICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHN0YXR1cy5jbGFzc05hbWUgPSAnc3RhdHVzJztcbiAgc3RhdHVzLnRleHRDb250ZW50ID0gYFN0YW5kaW5nIGJ5IGZvciB5b3VyIGNvbW1hbmQsIENhcHRhaW4gJHtuYW1lfS4uLmA7XG5cbiAgc3RhdHVzQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXR1cyk7XG5cbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChzdGF0dXNDb250YWluZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RhdHVzKCkge1xuICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIHN0YXR1cy50ZXh0Q29udGVudCA9ICdJbmNvbWluZ+KApiBob2xkIHN0ZWFkeSEnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQm9hcmRzKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gcmVuZGVyUGxheWVyQm9hcmQocGxheWVyQm9hcmQpO1xuICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gcmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcblxuICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIGJvYXJkc0NvbnRhaW5lci5jbGFzc05hbWUgPSAnYm9hcmRzLWNvbnRhaW5lcic7XG4gIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmRDb250YWluZXIsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIG1haW4uYXBwZW5kQ2hpbGQoYm9hcmRzQ29udGFpbmVyKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUGxheWVyQm9hcmQocGxheWVyQm9hcmQpIHtcbiAgY29uc3QgcGxheWVyQm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgcGxheWVyQm9hcmRUaXRsZS5jbGFzc05hbWUgPSAncGxheWVyLWJvYXJkLXRpdGxlIGJvYXJkLXRpdGxlJztcbiAgcGxheWVyQm9hcmRUaXRsZS50ZXh0Q29udGVudCA9ICdZb3VyIEZsZWV0JztcblxuICBjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcGxheWVyR2FtZUJvYXJkLmNsYXNzTmFtZSA9ICdwbGF5ZXItYm9hcmQgYm9hcmQnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlcycsIGAke2l9LCR7an1gKTtcblxuICAgICAgLy8gSWYgdGhlc2UgY29vcmRpbmF0ZXMgYXJlIGluIHRoZSBtaXNzZWQgYXR0YWNrcyBhcnJheSwgbWFyayB0aGUgc3F1YXJlXG4gICAgICBjb25zdCBtaXNzZWRBdHRhY2sgPSBwbGF5ZXJCb2FyZC5taXNzZWRBdHRhY2tzLnNvbWUoXG4gICAgICAgIChjb29yZGluYXRlcykgPT4gY29vcmRpbmF0ZXNbMF0gPT09IGkgJiYgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICk7XG5cbiAgICAgIGlmIChtaXNzZWRBdHRhY2spIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXllckJvYXJkLmJvYXJkW2ldW2pdICE9PSBudWxsKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKTtcblxuICAgICAgICAvLyBNYXJrIHRoZSBzcXVhcmUgaWYgaXQncyBiZWVuIGhpdFxuICAgICAgICBpZiAocGxheWVyQm9hcmQuYm9hcmRbaV1bal0uaGl0KSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwbGF5ZXJHYW1lQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhcnRpY2xlJyk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdwbGF5ZXItYm9hcmQtY29udGFpbmVyIGJvYXJkLWNvbnRhaW5lcic7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZFRpdGxlLCBwbGF5ZXJHYW1lQm9hcmQpO1xuXG4gIHJldHVybiBwbGF5ZXJCb2FyZENvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKSB7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgY29tcHV0ZXJCb2FyZFRpdGxlLmNsYXNzTmFtZSA9ICdjb21wdXRlci1ib2FyZC10aXRsZSBib2FyZC10aXRsZSc7XG4gIGNvbXB1dGVyQm9hcmRUaXRsZS50ZXh0Q29udGVudCA9ICdFbmVteSBXYXRlcnMnO1xuXG4gIGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLmNsYXNzTmFtZSA9ICdjb21wdXRlci1ib2FyZCBib2FyZCc7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjZWxsLmNsYXNzTmFtZSA9ICdlbmVteS1jZWxsIGNlbGwnO1xuICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZXMnLCBgJHtpfSwke2p9YCk7XG5cbiAgICAgIC8vIE1hcmsgdGhlIHNxdWFyZSBpZiBpdCBoYXMgYSBtaXNzZWQgYXR0YWNrXG4gICAgICBjb25zdCBtaXNzZWRBdHRhY2sgPSBjb21wdXRlckJvYXJkLm1pc3NlZEF0dGFja3Muc29tZShcbiAgICAgICAgKGNvb3JkaW5hdGVzKSA9PiBjb29yZGluYXRlc1swXSA9PT0gaSAmJiBjb29yZGluYXRlc1sxXSA9PT0galxuICAgICAgKTtcblxuICAgICAgaWYgKG1pc3NlZEF0dGFjaykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3NlZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXJrIHRoZSBzcXVhcmUgaWYgaXQncyBiZWVuIGhpdFxuICAgICAgaWYgKGNvbXB1dGVyQm9hcmQuYm9hcmRbaV1bal0gIT09IG51bGwgJiYgY29tcHV0ZXJCb2FyZC5ib2FyZFtpXVtqXS5oaXQpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgIH1cblxuICAgICAgY29tcHV0ZXJHYW1lQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2FydGljbGUnKTtcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSAnY29tcHV0ZXItYm9hcmQtY29udGFpbmVyIGJvYXJkLWNvbnRhaW5lcic7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kKGNvbXB1dGVyQm9hcmRUaXRsZSwgY29tcHV0ZXJHYW1lQm9hcmQpO1xuXG4gIHJldHVybiBjb21wdXRlckJvYXJkQ29udGFpbmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR2FtZVZpZXcocGxheWVyLCBjb21wdXRlciwgcGxheWVyVHVybiwgZ2FtZU92ZXIpIHtcbiAgaWYgKGdhbWVPdmVyKSByZXR1cm47XG5cbiAgY2xlYXJNYWluKCk7XG4gIHJlbmRlckJvYXJkcyhwbGF5ZXIuZ2FtZWJvYXJkLCBjb21wdXRlci5nYW1lYm9hcmQpO1xuICByZW5kZXJTdGF0dXMocGxheWVyLm5hbWUpO1xuXG4gIGlmIChwbGF5ZXJUdXJuKSB7XG4gICAgbGlzdGVuT25FbmVteUJvYXJkQXR0YWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgYXR0YWNrUGxheWVyQm9hcmQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXN0YXJ0QnV0dG9uKCkge1xuICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHJlc3RhcnRCdXR0b24uY2xhc3NOYW1lID0gJ3Jlc3RhcnQnO1xuICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gJ0JhdHRsZSBBZ2Fpbic7XG5cbiAgcmV0dXJuIHJlc3RhcnRCdXR0b247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbm5vdW5jZVdpbm5lcihuYW1lID0gdW5kZWZpbmVkKSB7XG4gIGNsZWFyTWFpbigpO1xuXG4gIGxldCBtZXNzYWdlVGV4dDtcblxuICBpZiAobmFtZSkge1xuICAgIG1lc3NhZ2VUZXh0ID0gYFZpY3RvcnkhIENhcHRhaW4gJHtuYW1lfSBoYXMgY29ucXVlcmVkIHRoZSBzZWFzIWA7XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZVRleHQgPSBgRGVmZWF0Li4uIG91ciBmbGVldCBoYXMgYmVlbiB2YW5xdWlzaGVkLmA7XG4gIH1cblxuICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBtZXNzYWdlLmNsYXNzTmFtZSA9ICdnYW1lLWVuZC1tZXNzYWdlJztcbiAgbWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2VUZXh0O1xuXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIG1haW4uYXBwZW5kKG1lc3NhZ2UsIGNyZWF0ZVJlc3RhcnRCdXR0b24oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVFbmVteUJvYXJkSW50ZXJhY3Rpb24oKSB7XG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItYm9hcmQnKTtcbiAgZW5lbXlCb2FyZC5jbGFzc0xpc3QudG9nZ2xlKCdjbGlja2FibGUnKTtcbn1cbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgYWxsU3VuayA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBBcnJheS5mcm9tKEFycmF5KDEwKSwgKCkgPT4gbmV3IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnY2FycmllcicpO1xuICAgIHRoaXMuYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQsICdiYXR0bGVzaGlwJyk7XG4gICAgdGhpcy5jcnVpc2VyID0gbmV3IFNoaXAoMywgJ2NydWlzZXInKTtcbiAgICB0aGlzLnN1Ym1hcmluZSA9IG5ldyBTaGlwKDMsICdzdWJtYXJpbmUnKTtcbiAgICB0aGlzLmRlc3Ryb3llciA9IG5ldyBTaGlwKDIsICdkZXN0cm95ZXInKTtcbiAgICB0aGlzLnNoaXBzID0gW1xuICAgICAgdGhpcy5jYXJyaWVyLFxuICAgICAgdGhpcy5iYXR0bGVzaGlwLFxuICAgICAgdGhpcy5jcnVpc2VyLFxuICAgICAgdGhpcy5zdWJtYXJpbmUsXG4gICAgICB0aGlzLmRlc3Ryb3llcixcbiAgICBdO1xuICB9XG5cbiAgY2FuUGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzLCBheGlzKSB7XG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBjb29yZGluYXRlc1swXSwgaiA9IGNvb3JkaW5hdGVzWzFdLCBrID0gMDtcbiAgICAgICAgayA8IHNoaXAuc2hpcExlbmd0aCAmJiBpIDwgMTAgJiYgaiA8IDEwO1xuICAgICAgICBqKyssIGsrK1xuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW2ldW2pdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGogPT09IDkgJiYgayA8IHNoaXAuc2hpcExlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IGNvb3JkaW5hdGVzWzBdLCBqID0gY29vcmRpbmF0ZXNbMV0sIGsgPSAwO1xuICAgICAgICBrIDwgc2hpcC5zaGlwTGVuZ3RoICYmIGkgPCAxMCAmJiBqIDwgMTA7XG4gICAgICAgIGkrKywgaysrXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSA9PT0gOSAmJiBrIDwgc2hpcC5zaGlwTGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzLCBheGlzKSB7XG4gICAgaWYgKCF0aGlzLmNhblBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlcywgYXhpcykpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gY29vcmRpbmF0ZXNbMF0sIGogPSBjb29yZGluYXRlc1sxXSwgayA9IDA7XG4gICAgICAgIGsgPCBzaGlwLnNoaXBMZW5ndGg7XG4gICAgICAgIGorKywgaysrXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHsgaGl0OiBmYWxzZSwgc2hpcCB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IGNvb3JkaW5hdGVzWzBdLCBqID0gY29vcmRpbmF0ZXNbMV0sIGsgPSAwO1xuICAgICAgICBrIDwgc2hpcC5zaGlwTGVuZ3RoO1xuICAgICAgICBpKyssIGsrK1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB7IGhpdDogZmFsc2UsIHNoaXAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gICNpc09jY3VwaWVkKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRpbmF0ZXNbMF1dW2Nvb3JkaW5hdGVzWzFdXSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gICNhcmVBbGxTaGlwc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuICB9XG5cbiAgI2FyZVZhbGlkQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoXG4gICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgIGNvb3JkaW5hdGVzWzBdID4gOSB8fFxuICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICBjb29yZGluYXRlc1sxXSA+IDlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoIXRoaXMuI2lzT2NjdXBpZWQoY29vcmRpbmF0ZXMpKSB7XG4gICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChjb29yZGluYXRlcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLiNhcmVWYWxpZENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlY29yZCBhbiBhdHRhY2sgb24gdGhlIHNoaXBcbiAgICB0aGlzLmJvYXJkW2Nvb3JkaW5hdGVzWzBdXVtjb29yZGluYXRlc1sxXV0uc2hpcC5oaXQoKTtcbiAgICB0aGlzLmJvYXJkW2Nvb3JkaW5hdGVzWzBdXVtjb29yZGluYXRlc1sxXV0uaGl0ID0gdHJ1ZTtcblxuICAgIHRoaXMuYWxsU3VuayA9IHRoaXMuI2FyZUFsbFNoaXBzU3VuaygpO1xuICB9XG59XG4iLCJpbXBvcnQgJy4vc3R5bGVzL3N0eWxlcy5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlcy9ub3JtYWxpemUuY3NzJztcbmltcG9ydCB7XG4gIGNyZWF0ZVBsYXllcnMsXG4gIHBsYWNlU2hpcHMsXG4gIGZpbmRSYW5kb21VbmF0dGFja2VkQ2VsbCxcbiAgaXNBbHJlYWR5QXR0YWNrZWQsXG4gIGRlbGF5UmVuZGVyaW5nLFxufSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7XG4gIGFubm91bmNlV2lubmVyLFxuICB1cGRhdGVTdGF0dXMsXG4gIHJlbmRlclBsYWNpbmdTaGlwc0ludGVyZmFjZSxcbiAgaGFuZGxlSG92ZXJpbmcsXG4gIHVwZGF0ZUdhbWVWaWV3LFxuICB0b2dnbGVFbmVteUJvYXJkSW50ZXJhY3Rpb24sXG59IGZyb20gJy4vZG9tLmpzJztcblxubGV0IHBsYXllciwgY29tcHV0ZXI7XG5sZXQgcGxheWVyVHVybiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyB0cnVlIDogZmFsc2U7XG5sZXQgbnVtYmVyT2ZTaGlwc0xlZnRUb1BsYWNlID0gNTtcbmxldCBheGlzID0gJ3gnO1xubGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGhhbmRsZU5hbWVJbnB1dCgpIHtcbiAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG4gIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjb21wdXRlcicgfHwgbmFtZSA9PT0gJycpIHJldHVybjtcblxuICAoeyBwbGF5ZXIsIGNvbXB1dGVyIH0gPSBjcmVhdGVQbGF5ZXJzKG5hbWUpKTtcblxuICAvLyBSZW5kZXIgb25lIGJvYXJkIGZvciB0aGUgcGxheWVyIHRvIHBsYWNlIHRoZWlyIHNoaXBzXG4gIHJlbmRlclBsYWNpbmdTaGlwc0ludGVyZmFjZShwbGF5ZXIuZ2FtZWJvYXJkLCBheGlzKTtcbiAgbGlzdGVuT25Cb2FyZEhvdmVyaW5nKCk7XG4gIGxpc3Rlbk9uU2hpcERpcmVjdGlvbkNoYW5nZSgpO1xuXG4gIC8vIEZvciBub3csIHBsYWNlIHRoZSBjb21wdXRlcidzIHNoaXBzIGluIHRoZSBzYW1lIHBsYWNlLiBSYW5kb21pemUgaXQgbGF0ZXJcbiAgcGxhY2VTaGlwcyhjb21wdXRlci5nYW1lYm9hcmQpO1xufVxuXG4vLyBMaXN0ZW4gZm9yIHBsYXllciBuYW1lIGlucHV0IHdoZW4gRW50ZXIga2V5IGlzIHByZXNzZWRcbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0Jyk7XG5uYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgIGhhbmRsZU5hbWVJbnB1dCgpO1xuICB9XG59KTtcblxuLy8gTGlzdGVuIGZvciBwbGF5ZXIgbmFtZSBpbnB1dCB3aGVuIHN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydCcpO1xuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhhbmRsZU5hbWVJbnB1dCgpO1xufSk7XG5cbmZ1bmN0aW9uIGhhbmRsZUVuZW15Qm9hcmRDbGljayhlKSB7XG4gIGNvbnN0IGVuZW15Q2VsbCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5lbmVteS1jZWxsJyk7XG5cbiAgaWYgKGVuZW15Q2VsbCkge1xuICAgIGlmIChpc0FscmVhZHlBdHRhY2tlZChlbmVteUNlbGwpKSByZXR1cm47XG5cbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGVuZW15Q2VsbC5kYXRhc2V0LmNvb3JkaW5hdGVzXG4gICAgICAuc3BsaXQoJywnKVxuICAgICAgLm1hcCgobnVtYmVyKSA9PiBudW1iZXIgKiAxKTtcblxuICAgIGhhbmRsZUF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIGNvb3JkaW5hdGVzKTtcblxuICAgIHBsYXllclR1cm4gPSBmYWxzZTtcbiAgICBhdHRhY2tQbGF5ZXJCb2FyZCgpO1xuICAgIGxpc3Rlbk9uRW5lbXlCb2FyZEF0dGFjaygpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5PbkVuZW15Qm9hcmRBdHRhY2soKSB7XG4gIGlmICghcGxheWVyVHVybikgcmV0dXJuO1xuXG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItYm9hcmQnKTtcbiAgaWYgKGVuZW15Qm9hcmQpIHtcbiAgICBlbmVteUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRW5lbXlCb2FyZENsaWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNrUGxheWVyQm9hcmQoKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1ib2FyZCcpO1xuICBpZiAocGxheWVyQm9hcmQpIHtcbiAgICB0b2dnbGVFbmVteUJvYXJkSW50ZXJhY3Rpb24oKTtcblxuICAgIC8vIEdlbmVyYXRlIHJhbmRvbSBjb29yZGluYXRlc1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzVG9BdHRhY2sgPSBmaW5kUmFuZG9tVW5hdHRhY2tlZENlbGwocGxheWVyQm9hcmQpO1xuXG4gICAgdXBkYXRlU3RhdHVzKCk7XG5cbiAgICBoYW5kbGVBdHRhY2socGxheWVyLmdhbWVib2FyZCwgY29vcmRpbmF0ZXNUb0F0dGFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlQXR0YWNrKGJvYXJkLCBjb29yZGluYXRlcykge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcblxuICBpZiAoIXBsYXllclR1cm4pIHtcbiAgICBwbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgICBkZWxheVJlbmRlcmluZygoKSA9PlxuICAgICAgdXBkYXRlR2FtZVZpZXcocGxheWVyLCBjb21wdXRlciwgcGxheWVyVHVybiwgZ2FtZU92ZXIpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVHYW1lVmlldyhwbGF5ZXIsIGNvbXB1dGVyLCBwbGF5ZXJUdXJuLCBnYW1lT3Zlcik7XG4gIH1cblxuICBpZiAoYm9hcmQuYWxsU3Vuaykge1xuICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICBhbm5vdW5jZVdpbm5lcihwbGF5ZXIuZ2FtZWJvYXJkLmFsbFN1bmsgPyB1bmRlZmluZWQgOiBwbGF5ZXIubmFtZSk7XG4gICAgbGlzdGVuT25SZXN0YXJ0R2FtZUJ1dHRvbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpc3Rlbk9uUmVzdGFydEdhbWVCdXR0b24oKSB7XG4gIGNvbnN0IHJlc3RhcnRHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3RhcnQnKTtcbiAgcmVzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn1cblxuLy8gTGlzdGVuIG9uIGhvdmVyaW5nIGFjdGlvbiBvbiB0aGUgYm9hcmQgdG8gcGxhY2Ugc2hpcHNcbmZ1bmN0aW9uIGxpc3Rlbk9uQm9hcmRIb3ZlcmluZygpIHtcbiAgY29uc3QgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnLnBsYWNlLXNoaXBzLWJvYXJkLWNvbnRhaW5lcidcbiAgKTtcbiAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgaGFuZGxlSG92ZXJpbmcoXG4gICAgICBlLFxuICAgICAgbnVtYmVyT2ZTaGlwc0xlZnRUb1BsYWNlLFxuICAgICAgcGxheWVyLFxuICAgICAgYXhpcyxcbiAgICAgIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lclxuICAgICk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDZWxsQ2xpY2soY29vcmRpbmF0ZXMsIHNoaXApIHtcbiAgY29uc3QgcGxhY2VkID0gcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCwgY29vcmRpbmF0ZXMsIGF4aXMpO1xuICBpZiAocGxhY2VkKSB7XG4gICAgbnVtYmVyT2ZTaGlwc0xlZnRUb1BsYWNlIC09IDE7XG4gIH1cblxuICBpZiAobnVtYmVyT2ZTaGlwc0xlZnRUb1BsYWNlID09PSAwKSB7XG4gICAgdXBkYXRlR2FtZVZpZXcocGxheWVyLCBjb21wdXRlciwgcGxheWVyVHVybiwgZ2FtZU92ZXIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJlbmRlclBsYWNpbmdTaGlwc0ludGVyZmFjZShwbGF5ZXIuZ2FtZWJvYXJkLCBheGlzKTtcbiAgbGlzdGVuT25Cb2FyZEhvdmVyaW5nKCk7XG4gIGxpc3Rlbk9uU2hpcERpcmVjdGlvbkNoYW5nZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuT25DZWxsQ2xpY2soY2VsbCwgY29vcmRpbmF0ZXMsIHNoaXApIHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBoYW5kbGVDZWxsQ2xpY2soY29vcmRpbmF0ZXMsIHNoaXApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuT25TaGlwRGlyZWN0aW9uQ2hhbmdlKCkge1xuICBjb25zdCBzaGlwRGlyZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtZGlyZWN0aW9uJyk7XG4gIHNoaXBEaXJlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYXhpcyA9IGF4aXMgPT09ICd4JyA/ICd5JyA6ICd4JztcblxuICAgIHNoaXBEaXJlY3Rpb24udGV4dENvbnRlbnQgPSBheGlzID09PSAneCcgPyAnSG9yaXpvbnRhbCcgOiAnVmVydGljYWwnO1xuICB9KTtcbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSA9ICdDb21wdXRlcicpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgI2hpdHMgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSkge1xuICAgIHRoaXMuc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0IGhpdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2hpdHM7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuI2hpdHMgPCB0aGlzLnNoaXBMZW5ndGgpIHtcbiAgICAgIHRoaXMuI2hpdHMgKz0gMTtcbiAgICB9XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuI2hpdHMgPT09IHRoaXMuc2hpcExlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXJzKG5hbWUpIHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihuYW1lKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgcmV0dXJuIHsgcGxheWVyLCBjb21wdXRlciB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhY2VTaGlwcyhnYW1lYm9hcmQpIHtcbiAgcGxhY2VTaGlwKGdhbWVib2FyZCwgZ2FtZWJvYXJkLmNhcnJpZXIpO1xuICBwbGFjZVNoaXAoZ2FtZWJvYXJkLCBnYW1lYm9hcmQuYmF0dGxlc2hpcCk7XG4gIHBsYWNlU2hpcChnYW1lYm9hcmQsIGdhbWVib2FyZC5jcnVpc2VyKTtcbiAgcGxhY2VTaGlwKGdhbWVib2FyZCwgZ2FtZWJvYXJkLnN1Ym1hcmluZSk7XG4gIHBsYWNlU2hpcChnYW1lYm9hcmQsIGdhbWVib2FyZC5kZXN0cm95ZXIpO1xufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXAoZ2FtZWJvYXJkLCBzaGlwKSB7XG4gIGxldCB7IGksIGogfSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgbGV0IGF4aXMgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gJ3gnIDogJ3knO1xuXG4gIHdoaWxlICghZ2FtZWJvYXJkLmNhblBsYWNlU2hpcChzaGlwLCBbaSwgal0sIGF4aXMpKSB7XG4gICAgKHsgaSwgaiB9ID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpKTtcbiAgICBheGlzID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/ICd4JyA6ICd5JztcbiAgfVxuXG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCwgW2ksIGpdLCBheGlzKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpIHtcbiAgcmV0dXJuIHtcbiAgICBpOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoOSAtIDAgKyAxKSArIDApLFxuICAgIGo6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5IC0gMCArIDEpICsgMCksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FscmVhZHlBdHRhY2tlZChjZWxsKSB7XG4gIHJldHVybiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnbWlzc2VkJykgfHwgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFJhbmRvbVVuYXR0YWNrZWRDZWxsKHBsYXllckJvYXJkKSB7XG4gIGxldCB7IGksIGogfSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZXMoKTtcblxuICBjb25zdCBjZWxsID0gcGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcmRpbmF0ZXM9JyR7aX0sJHtqfSddYCk7XG4gIGxldCBhbHJlYWR5QXR0YWNrZWQgPSBpc0FscmVhZHlBdHRhY2tlZChjZWxsKTtcblxuICB3aGlsZSAoYWxyZWFkeUF0dGFja2VkKSB7XG4gICAgKHsgaSwgaiB9ID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpKTtcblxuICAgIGNvbnN0IGNlbGwgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlcz0nJHtpfSwke2p9J11gKTtcbiAgICBhbHJlYWR5QXR0YWNrZWQgPSBpc0FscmVhZHlBdHRhY2tlZChjZWxsKTtcbiAgfVxuXG4gIHJldHVybiBbaSwgal07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxheVJlbmRlcmluZyhjYWxsYmFjaykge1xuICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwKTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXG5cbi8qIERvY3VtZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxuICovXG5cbmh0bWwge1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cbn1cblxuLyogU2VjdGlvbnNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBcXGBtYWluXFxgIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxuICovXG5cbm1haW4ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBcXGBoMVxcYCBlbGVtZW50cyB3aXRoaW4gXFxgc2VjdGlvblxcYCBhbmRcbiAqIFxcYGFydGljbGVcXGAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxuICovXG5cbmgxIHtcbiAgZm9udC1zaXplOiAyZW07XG4gIG1hcmdpbjogMC42N2VtIDA7XG59XG5cbi8qIEdyb3VwaW5nIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxuICovXG5cbmhyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cbiAgaGVpZ2h0OiAwOyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBcXGBlbVxcYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxucHJlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cbiAqL1xuXG5hIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXG4gKi9cblxuYWJiclt0aXRsZV0ge1xuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBcXGBlbVxcYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuY29kZSxcbmtiZCxcbnNhbXAge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zbWFsbCB7XG4gIGZvbnQtc2l6ZTogODAlO1xufVxuXG4vKipcbiAqIFByZXZlbnQgXFxgc3ViXFxgIGFuZCBcXGBzdXBcXGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXG4gKiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3ViLFxuc3VwIHtcbiAgZm9udC1zaXplOiA3NSU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuc3ViIHtcbiAgYm90dG9tOiAtMC4yNWVtO1xufVxuXG5zdXAge1xuICB0b3A6IC0wLjVlbTtcbn1cblxuLyogRW1iZWRkZWQgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmltZyB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbn1cblxuLyogRm9ybXNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQsXG5vcHRncm91cCxcbnNlbGVjdCxcbnRleHRhcmVhIHtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIG1hcmdpbjogMDsgLyogMiAqL1xufVxuXG4vKipcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCB7XG4gIC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uLFxuc2VsZWN0IHtcbiAgLyogMSAqL1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcblt0eXBlPSdidXR0b24nXSxcblt0eXBlPSdyZXNldCddLFxuW3R5cGU9J3N1Ym1pdCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0nYnV0dG9uJ106Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0ncmVzZXQnXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdzdWJtaXQnXTo6LW1vei1mb2N1cy1pbm5lciB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXG4gKi9cblxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J2J1dHRvbiddOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J3Jlc2V0J106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nc3VibWl0J106LW1vei1mb2N1c3Jpbmcge1xuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmZpZWxkc2V0IHtcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIFxcYGZpZWxkc2V0XFxgIGVsZW1lbnRzIGluIElFLlxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxuICogICAgXFxgZmllbGRzZXRcXGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmxlZ2VuZCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXG4gKi9cblxudGV4dGFyZWEge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cbiAqL1xuXG5bdHlwZT0nY2hlY2tib3gnXSxcblt0eXBlPSdyYWRpbyddIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxuICovXG5cblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBcXGBpbmhlcml0XFxgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXG4gKi9cblxuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1bW1hcnkge1xuICBkaXNwbGF5OiBsaXN0LWl0ZW07XG59XG5cbi8qIE1pc2NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFFLE1BQU07QUFDM0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxpQ0FBaUMsRUFBRSxNQUFNO0FBQzNDOztBQUVBOztFQUVFOztBQUVGOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0U7O0FBRUY7OztFQUdFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7Ozs7O0VBS0Usb0JBQW9CLEVBQUUsTUFBTTtFQUM1QixlQUFlLEVBQUUsTUFBTTtFQUN2QixpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLFNBQVMsRUFBRSxNQUFNO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxNQUFNO0VBQ04saUJBQWlCO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxNQUFNO0VBQ04sb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsMEJBQTBCO0FBQzVCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDhCQUE4QjtBQUNoQzs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTs7Ozs7RUFLRTs7QUFFRjtFQUNFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsY0FBYyxFQUFFLE1BQU07RUFDdEIsY0FBYyxFQUFFLE1BQU07RUFDdEIsZUFBZSxFQUFFLE1BQU07RUFDdkIsVUFBVSxFQUFFLE1BQU07RUFDbEIsbUJBQW1CLEVBQUUsTUFBTTtBQUM3Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsVUFBVSxFQUFFLE1BQU07QUFDcEI7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsWUFBWTtBQUNkOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDZCQUE2QixFQUFFLE1BQU07RUFDckMsb0JBQW9CLEVBQUUsTUFBTTtBQUM5Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGFBQWEsRUFBRSxNQUFNO0FBQ3ZCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQge1xcbiAgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHtcXG4gIC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5bdHlwZT0nYnV0dG9uJ10sXFxuW3R5cGU9J3Jlc2V0J10sXFxuW3R5cGU9J3N1Ym1pdCddIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT0nYnV0dG9uJ106Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9J3Jlc2V0J106Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9J3N1Ym1pdCddOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9J2J1dHRvbiddOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPSdyZXNldCddOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPSdzdWJtaXQnXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxuICovXFxuXFxuW3R5cGU9J2NoZWNrYm94J10sXFxuW3R5cGU9J3JhZGlvJ10ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPSdzZWFyY2gnXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPSdzZWFyY2gnXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL2VmY28tYnJvb2tzaGlyZS1yZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvYnJvd24tbG9nby5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1hZ2VzL21pc3NlZC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1hZ2VzL2hpdC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0VGQ08gQnJvb2tzaGlyZSc7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuXG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCxcbmJvZHkge1xuICBoZWlnaHQ6IDEwMHZoO1xufVxuXG5ib2R5IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6ICdFRkNPIEJyb29rc2hpcmUnLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgOTBkZWcsXG4gICAgcmdiKDMxLCAzOCwgNjEpIDAlLFxuICAgIHJnYig0NywgNjEsIDk5KSAyOSUsXG4gICAgcmdiKDQzLCA1NSwgOTIpIDc2JSxcbiAgICByZ2IoMzEsIDM4LCA2MSkgMTAwJVxuICApO1xufVxuXG5oZWFkZXIge1xuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xufVxuXG4ubG9nbyB7XG4gIGJhY2tncm91bmQ6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcbiAgaGVpZ2h0OiAxNzBweDtcbiAgd2lkdGg6IDE3MHB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgYXV0bztcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG59XG5cbm1haW4ge1xuICBwYWRkaW5nOiAyMHB4IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLm5ldy1nYW1lIHtcbiAgbWFyZ2luLXRvcDogNjBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDIwcHg7XG59XG5cbi5uYW1lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjBweDtcbn1cblxuLmVudGVyLW5hbWUge1xuICBmb250LXNpemU6IDEuMnJlbTtcbn1cblxuLm5hbWUtaW5wdXQge1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDMwcHg7XG4gIGNvbG9yOiAjMzc0NzcyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgIDkwZGVnLFxuICAgIHJnYigxNTIsIDE1MiwgMTQ3KSAwJSxcbiAgICByZ2IoMjQ0LCAyMzgsIDIwNSkgMTAlLFxuICAgIHJnYigyNDQsIDIzOCwgMjA1KSA5MCUsXG4gICAgcmdiKDE1MiwgMTUyLCAxNDcpIDEwMCVcbiAgKTtcbn1cblxuLm5hbWUtaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4ubmFtZS1pbnB1dDo6cGxhY2Vob2xkZXIge1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLnN0YXJ0LFxuLnJlc3RhcnQsIC5zaGlwLWRpcmVjdGlvbiB7XG4gIHdpZHRoOiAxMDBweDtcbiAgcGFkZGluZzogMTBweCAwO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgIDkwZGVnLFxuICAgIHJnYigyMTksIDIwNiwgMTUwKSAwJSxcbiAgICByZ2IoMjU1LCAyNDMsIDE4NykgMjklLFxuICAgIHJnYigyNTUsIDI0MywgMTg3KSA3NiUsXG4gICAgcmdiKDIxOSwgMjA2LCAxNTApIDEwMCVcbiAgKTtcbiAgY29sb3I6ICM0ZTVmOGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zdGFydDphY3RpdmUsXG4ucmVzdGFydDphY3RpdmUsIC5zaGlwLWRpcmVjdGlvbjphY3RpdmUge1xuICBjb2xvcjogIzM3NDc3MjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgIDkwZGVnLFxuICAgIHJnYigyNTUsIDI0MywgMTg3KSAwJSxcbiAgICByZ2IoMjE5LCAyMDYsIDE1MCkgMjklLFxuICAgIHJnYigyMTksIDIwNiwgMTUwKSA3NiUsXG4gICAgcmdiKDI1NSwgMjQzLCAxODcpIDEwMCVcbiAgKTtcbn1cblxuLmJvYXJkcy1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDE1cHg7XG59XG5cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG59XG5cbi5ib2FyZC10aXRsZSB7XG4gIGNvbG9yOiByZ2IoMjM3LCAxOTYsIDExNSk7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xufVxuXG4uYm9hcmQge1xuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMjU1LCAyNTMsIDI0NCk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyMHB4KTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDIwcHgpO1xuICBnYXA6IDFweDtcbn1cblxuLmNlbGwsIC5wbGFjZS1jZWxsIHtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI1NSwgMjUzLCAyNDQpO1xufVxuXG4uY29tcHV0ZXItYm9hcmQgLmNlbGwge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jb21wdXRlci1ib2FyZCAuY2VsbDpob3ZlciB7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHJnYigxMzIsIDIwNSwgNzIpO1xuICBjdXJzb3I6IGNyb3NzaGFpcjtcbn1cblxuLmNhbi1wbGFjZSB7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE0MywgMjMxLCA3MSwgMC41KTtcbn1cblxuLnBsYXllci1ib2FyZCAub2NjdXBpZWQsIC5ib2FyZCAub2NjdXBpZWQge1xuICBiYWNrZ3JvdW5kOiByZ2IoMjM3LCAxOTYsIDExNSk7XG59XG5cbi5taXNzZWQge1xuICBiYWNrZ3JvdW5kOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cblxuLmJvYXJkIC5oaXQge1xuICBiYWNrZ3JvdW5kOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19ffSk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cblxuLmNvbXB1dGVyLWJvYXJkIC5oaXQ6aG92ZXIsXG4uY29tcHV0ZXItYm9hcmQgLm1pc3NlZDpob3ZlciB7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHJlZDtcbn1cblxuLmNhbi1ub3QtcGxhY2U6aG92ZXIge1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMCwgMCwgMC40KTtcbn1cblxuLnN0YXR1cy1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDk0LCAxMTQsIDE3MCwgMC40KTtcbiAgaGVpZ2h0OiA0MHB4O1xuICBwYWRkaW5nOiAyNXB4IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgbWFyZ2luOiAyMHB4IGF1dG8gMCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDMwMHB4O1xufVxuXG4uc3RhdHVzLFxuLmVudGVyLW5hbWUge1xuICBjb2xvcjogcmdiKDIzNywgMTk2LCAxMTUpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbi5nYW1lLWVuZC1tZXNzYWdlIHtcbiAgY29sb3I6IHJnYigyMzcsIDE5NiwgMTE1KTtcbiAgZm9udC1zaXplOiAycmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xufVxuXG4ucmVzdGFydCB7XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xuICB3aWR0aDogMTgwcHg7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBwYWRkaW5nOiAxMHB4IDVweDtcbn1cblxuLnBsYWNlLXNoaXAtYm9hcmQtdGl0bGUge1xuICBjb2xvcjogcmdiKDIzNywgMTk2LCAxMTUpO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuXG4uc2hpcC1kaXJlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG5mb290ZXIge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogNDBweDtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIG1hcmdpbi10b3A6IGF1dG87XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbiAgICA5MGRlZyxcbiAgICByZ2IoMTUyLCAxNTIsIDE0NykgMCUsXG4gICAgcmdiKDI0NCwgMjM4LCAyMDUpIDI5JSxcbiAgICByZ2IoMjQ0LCAyMzgsIDIwNSkgNzYlLFxuICAgIHJnYigxNTIsIDE1MiwgMTQ3KSAxMDAlXG4gICk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogIzM3NDc3Mjtcbn1cblxuZm9vdGVyIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiAjNTY2ZGFmO1xufVxuXG5mb290ZXIgYTpob3ZlciB7XG4gIGNvbG9yOiAjMzM1MWEzO1xufVxuXG5mb290ZXIgYTphY3RpdmUge1xuICBjb2xvcjogIzRmNjZhNjtcbn1cblxuLmNsaWNrYWJsZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA1MDBweCkge1xuICAubG9nbyB7XG4gICAgaGVpZ2h0OiAyMDBweDtcbiAgICB3aWR0aDogMjAwcHg7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcbiAgLmJvYXJkcy1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZ2FwOiA1MHB4O1xuICB9XG5cbiAgLnN0YXR1cy1jb250YWluZXIge1xuICAgIHdpZHRoOiA1MDBweDtcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDcwMHB4KSB7XG4gIC5ib2FyZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcbiAgICBnYXA6IDFweDtcbiAgfVxuXG4gIC5ib2FyZC10aXRsZSxcbiAgLnN0YXR1cy1jb250YWluZXIge1xuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICB9XG5cbiAgLnN0YXR1cy1jb250YWluZXIge1xuICAgIGhlaWdodDogNTBweDtcbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMjAwcHgpIHtcbiAgLm5ldy1nYW1lIHtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgZ2FwOiAzMHB4O1xuICB9XG5cbiAgLm5hbWUge1xuICAgIGdhcDogMzBweDtcbiAgfVxuXG4gIC5lbnRlci1uYW1lIHtcbiAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgfVxuXG4gIC5ib2FyZC10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxLjZyZW07XG4gIH1cbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpb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Q0UscUJBQXFCO0VBQ3JCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtJQUNiLFlBQVk7RUFDZDtBQUNGOztBQUVBO0VBQ0U7SUFDRSxtQkFBbUI7SUFDbkIsU0FBUztFQUNYOztFQUVBO0lBQ0UsWUFBWTtJQUNaLGdCQUFnQjtFQUNsQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSx1Q0FBdUM7SUFDdkMsb0NBQW9DO0lBQ3BDLFFBQVE7RUFDVjs7RUFFQTs7SUFFRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxZQUFZO0VBQ2Q7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsWUFBWTtJQUNaLFNBQVM7RUFDWDs7RUFFQTtJQUNFLFNBQVM7RUFDWDs7RUFFQTtJQUNFLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdFRkNPIEJyb29rc2hpcmUnO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9lZmNvLWJyb29rc2hpcmUtcmVndWxhci50dGYnKTtcXG59XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogJ0VGQ08gQnJvb2tzaGlyZScsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIDkwZGVnLFxcbiAgICByZ2IoMzEsIDM4LCA2MSkgMCUsXFxuICAgIHJnYig0NywgNjEsIDk5KSAyOSUsXFxuICAgIHJnYig0MywgNTUsIDkyKSA3NiUsXFxuICAgIHJnYigzMSwgMzgsIDYxKSAxMDAlXFxuICApO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG59XFxuXFxuLmxvZ28ge1xcbiAgYmFja2dyb3VuZDogdXJsKCcuLi9hc3NldHMvaW1hZ2VzL2Jyb3duLWxvZ28ucG5nJyk7XFxuICBoZWlnaHQ6IDE3MHB4O1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuXFxubWFpbiB7XFxuICBwYWRkaW5nOiAyMHB4IDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5uZXctZ2FtZSB7XFxuICBtYXJnaW4tdG9wOiA2MHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4ubmFtZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLmVudGVyLW5hbWUge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcblxcbi5uYW1lLWlucHV0IHtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgY29sb3I6ICMzNzQ3NzI7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIDkwZGVnLFxcbiAgICByZ2IoMTUyLCAxNTIsIDE0NykgMCUsXFxuICAgIHJnYigyNDQsIDIzOCwgMjA1KSAxMCUsXFxuICAgIHJnYigyNDQsIDIzOCwgMjA1KSA5MCUsXFxuICAgIHJnYigxNTIsIDE1MiwgMTQ3KSAxMDAlXFxuICApO1xcbn1cXG5cXG4ubmFtZS1pbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4ubmFtZS1pbnB1dDo6cGxhY2Vob2xkZXIge1xcbiAgZm9udC1zaXplOiAwLjlyZW07XFxufVxcblxcbi5zdGFydCxcXG4ucmVzdGFydCwgLnNoaXAtZGlyZWN0aW9uIHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICA5MGRlZyxcXG4gICAgcmdiKDIxOSwgMjA2LCAxNTApIDAlLFxcbiAgICByZ2IoMjU1LCAyNDMsIDE4NykgMjklLFxcbiAgICByZ2IoMjU1LCAyNDMsIDE4NykgNzYlLFxcbiAgICByZ2IoMjE5LCAyMDYsIDE1MCkgMTAwJVxcbiAgKTtcXG4gIGNvbG9yOiAjNGU1ZjhlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc3RhcnQ6YWN0aXZlLFxcbi5yZXN0YXJ0OmFjdGl2ZSwgLnNoaXAtZGlyZWN0aW9uOmFjdGl2ZSB7XFxuICBjb2xvcjogIzM3NDc3MjtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgOTBkZWcsXFxuICAgIHJnYigyNTUsIDI0MywgMTg3KSAwJSxcXG4gICAgcmdiKDIxOSwgMjA2LCAxNTApIDI5JSxcXG4gICAgcmdiKDIxOSwgMjA2LCAxNTApIDc2JSxcXG4gICAgcmdiKDI1NSwgMjQzLCAxODcpIDEwMCVcXG4gICk7XFxufVxcblxcbi5ib2FyZHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLmJvYXJkLXRpdGxlIHtcXG4gIGNvbG9yOiByZ2IoMjM3LCAxOTYsIDExNSk7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYigyNTUsIDI1MywgMjQ0KTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjBweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjBweCk7XFxuICBnYXA6IDFweDtcXG59XFxuXFxuLmNlbGwsIC5wbGFjZS1jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNTUsIDI1MywgMjQ0KTtcXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIC5jZWxsIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIC5jZWxsOmhvdmVyIHtcXG4gIGJvcmRlcjogM3B4IHNvbGlkIHJnYigxMzIsIDIwNSwgNzIpO1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5jYW4tcGxhY2Uge1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDE0MywgMjMxLCA3MSwgMC41KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCAub2NjdXBpZWQsIC5ib2FyZCAub2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDIzNywgMTk2LCAxMTUpO1xcbn1cXG5cXG4ubWlzc2VkIHtcXG4gIGJhY2tncm91bmQ6IHVybCgnLi4vYXNzZXRzL2ltYWdlcy9taXNzZWQuc3ZnJyk7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbn1cXG5cXG4uYm9hcmQgLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoJy4uL2Fzc2V0cy9pbWFnZXMvaGl0LnN2ZycpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIC5oaXQ6aG92ZXIsXFxuLmNvbXB1dGVyLWJvYXJkIC5taXNzZWQ6aG92ZXIge1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG4gIGJvcmRlcjogM3B4IHNvbGlkIHJlZDtcXG59XFxuXFxuLmNhbi1ub3QtcGxhY2U6aG92ZXIge1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4uc3RhdHVzLWNvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDk0LCAxMTQsIDE3MCwgMC40KTtcXG4gIGhlaWdodDogNDBweDtcXG4gIHBhZGRpbmc6IDI1cHggNDBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIG1hcmdpbjogMjBweCBhdXRvIDAgYXV0bztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMzAwcHg7XFxufVxcblxcbi5zdGF0dXMsXFxuLmVudGVyLW5hbWUge1xcbiAgY29sb3I6IHJnYigyMzcsIDE5NiwgMTE1KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxucCB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5nYW1lLWVuZC1tZXNzYWdlIHtcXG4gIGNvbG9yOiByZ2IoMjM3LCAxOTYsIDExNSk7XFxuICBmb250LXNpemU6IDJyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAxMDBweDtcXG59XFxuXFxuLnJlc3RhcnQge1xcbiAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICB3aWR0aDogMTgwcHg7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIHBhZGRpbmc6IDEwcHggNXB4O1xcbn1cXG5cXG4ucGxhY2Utc2hpcC1ib2FyZC10aXRsZSB7XFxuICBjb2xvcjogcmdiKDIzNywgMTk2LCAxMTUpO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuXFxuLnNoaXAtZGlyZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbmZvb3RlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDQwcHg7XFxuICBmb250LXNpemU6IDAuOXJlbTtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIDkwZGVnLFxcbiAgICByZ2IoMTUyLCAxNTIsIDE0NykgMCUsXFxuICAgIHJnYigyNDQsIDIzOCwgMjA1KSAyOSUsXFxuICAgIHJnYigyNDQsIDIzOCwgMjA1KSA3NiUsXFxuICAgIHJnYigxNTIsIDE1MiwgMTQ3KSAxMDAlXFxuICApO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiAjMzc0NzcyO1xcbn1cXG5cXG5mb290ZXIgYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogIzU2NmRhZjtcXG59XFxuXFxuZm9vdGVyIGE6aG92ZXIge1xcbiAgY29sb3I6ICMzMzUxYTM7XFxufVxcblxcbmZvb3RlciBhOmFjdGl2ZSB7XFxuICBjb2xvcjogIzRmNjZhNjtcXG59XFxuXFxuLmNsaWNrYWJsZSB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNTAwcHgpIHtcXG4gIC5sb2dvIHtcXG4gICAgaGVpZ2h0OiAyMDBweDtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgLmJvYXJkcy1jb250YWluZXIge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBnYXA6IDUwcHg7XFxuICB9XFxuXFxuICAuc3RhdHVzLWNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgbWFyZ2luLXRvcDogNDBweDtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzAwcHgpIHtcXG4gIC5ib2FyZCB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICBnYXA6IDFweDtcXG4gIH1cXG5cXG4gIC5ib2FyZC10aXRsZSxcXG4gIC5zdGF0dXMtY29udGFpbmVyIHtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICB9XFxuXFxuICAuc3RhdHVzLWNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICAubmV3LWdhbWUge1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICAgIGdhcDogMzBweDtcXG4gIH1cXG5cXG4gIC5uYW1lIHtcXG4gICAgZ2FwOiAzMHB4O1xcbiAgfVxcblxcbiAgLmVudGVyLW5hbWUge1xcbiAgICBmb250LXNpemU6IDEuNHJlbTtcXG4gIH1cXG5cXG4gIC5ib2FyZC10aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsibGlzdGVuT25FbmVteUJvYXJkQXR0YWNrIiwibGlzdGVuT25DZWxsQ2xpY2siLCJhdHRhY2tQbGF5ZXJCb2FyZCIsInJlbmRlclBsYWNpbmdTaGlwc0ludGVyZmFjZSIsInBsYXllckJvYXJkIiwiYXhpcyIsImNsZWFyTWFpbiIsImJvYXJkQ29udGFpbmVyIiwiY3JlYXRlQm9hcmRDb250YWluZXIiLCJzaGlwRGlyZWN0aW9uIiwiY3JlYXRlU2hpcERpcmVjdGlvbkJ1dHRvbiIsIm1haW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmQiLCJib2FyZFRpdGxlIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInRleHRDb250ZW50IiwiYm9hcmQiLCJpIiwiaiIsImNlbGwiLCJzZXRBdHRyaWJ1dGUiLCJjb25jYXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImhhbmRsZUhpZ2hsaWdodGluZyIsInBsYXllciIsImNvb3JkaW5hdGVzIiwicGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyIiwibGVuZ3RoIiwic2hpcCIsImNhblBsYWNlIiwiZ2FtZWJvYXJkIiwiY2FuUGxhY2VTaGlwIiwiaGlnaGxpZ2h0VmFsaWRDZWxscyIsInJlbW92ZSIsIm5leHRFbGVtZW50U2libGluZyIsImsiLCJyZW1vdmVDZWxsSGlnaGxpZ2h0aW5nIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImhhbmRsZUhvdmVyaW5nIiwiZSIsIm51bWJlck9mU2hpcHNMZWZ0VG9QbGFjZSIsInRhcmdldCIsImNsb3Nlc3QiLCJkYXRhc2V0Iiwic3BsaXQiLCJtYXAiLCJudW1iZXIiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJpbm5lckhUTUwiLCJyZW5kZXJTdGF0dXMiLCJuYW1lIiwic3RhdHVzQ29udGFpbmVyIiwic3RhdHVzIiwidXBkYXRlU3RhdHVzIiwicmVuZGVyQm9hcmRzIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkQ29udGFpbmVyIiwicmVuZGVyUGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkQ29udGFpbmVyIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImJvYXJkc0NvbnRhaW5lciIsInBsYXllckJvYXJkVGl0bGUiLCJwbGF5ZXJHYW1lQm9hcmQiLCJfbG9vcCIsIl9sb29wMiIsIm1pc3NlZEF0dGFjayIsIm1pc3NlZEF0dGFja3MiLCJzb21lIiwiaGl0IiwiY29tcHV0ZXJCb2FyZFRpdGxlIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJfbG9vcDMiLCJfbG9vcDQiLCJ1cGRhdGVHYW1lVmlldyIsImNvbXB1dGVyIiwicGxheWVyVHVybiIsImdhbWVPdmVyIiwiY3JlYXRlUmVzdGFydEJ1dHRvbiIsInJlc3RhcnRCdXR0b24iLCJhbm5vdW5jZVdpbm5lciIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIm1lc3NhZ2VUZXh0IiwibWVzc2FnZSIsInRvZ2dsZUVuZW15Qm9hcmRJbnRlcmFjdGlvbiIsImVuZW15Qm9hcmQiLCJ0b2dnbGUiLCJTaGlwIiwiX0dhbWVib2FyZF9icmFuZCIsIldlYWtTZXQiLCJHYW1lYm9hcmQiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2xhc3NQcml2YXRlTWV0aG9kSW5pdFNwZWMiLCJfZGVmaW5lUHJvcGVydHkiLCJBcnJheSIsImZyb20iLCJmaWxsIiwic2hpcHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInNoaXBMZW5ndGgiLCJwbGFjZVNoaXAiLCJyZWNlaXZlQXR0YWNrIiwiX2Fzc2VydENsYXNzQnJhbmQiLCJfaXNPY2N1cGllZCIsImNhbGwiLCJwdXNoIiwiX2FyZVZhbGlkQ29vcmRpbmF0ZXMiLCJhbGxTdW5rIiwiX2FyZUFsbFNoaXBzU3VuayIsImV2ZXJ5IiwiaXNTdW5rIiwiZGVmYXVsdCIsImNyZWF0ZVBsYXllcnMiLCJwbGFjZVNoaXBzIiwiZmluZFJhbmRvbVVuYXR0YWNrZWRDZWxsIiwiaXNBbHJlYWR5QXR0YWNrZWQiLCJkZWxheVJlbmRlcmluZyIsIk1hdGgiLCJyYW5kb20iLCJoYW5kbGVOYW1lSW5wdXQiLCJuYW1lSW5wdXQiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJfY3JlYXRlUGxheWVycyIsImxpc3Rlbk9uQm9hcmRIb3ZlcmluZyIsImxpc3Rlbk9uU2hpcERpcmVjdGlvbkNoYW5nZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydEJ1dHRvbiIsImhhbmRsZUVuZW15Qm9hcmRDbGljayIsImVuZW15Q2VsbCIsImhhbmRsZUF0dGFjayIsImNvb3JkaW5hdGVzVG9BdHRhY2siLCJsaXN0ZW5PblJlc3RhcnRHYW1lQnV0dG9uIiwicmVzdGFydEdhbWUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImhhbmRsZUNlbGxDbGljayIsInBsYWNlZCIsIlBsYXllciIsIl9jbGFzc1ByaXZhdGVGaWVsZEluaXRTcGVjIiwiX2hpdHMiLCJnZXQiLCJfY2xhc3NQcml2YXRlRmllbGRHZXQiLCJfY2xhc3NQcml2YXRlRmllbGRTZXQiLCJfZ2VuZXJhdGVSYW5kb21Db29yZGkiLCJnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGVzIiwiX2dlbmVyYXRlUmFuZG9tQ29vcmRpMiIsImZsb29yIiwiY29udGFpbnMiLCJfZ2VuZXJhdGVSYW5kb21Db29yZGkzIiwiYWxyZWFkeUF0dGFja2VkIiwiX2dlbmVyYXRlUmFuZG9tQ29vcmRpNCIsImNhbGxiYWNrIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=