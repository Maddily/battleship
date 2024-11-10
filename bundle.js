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
  height: fit-content;
  padding: 25px 40px;
  border-radius: 4px;
  margin: 20px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
}

.status {
  font-size: 1.1rem;
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

  .board-title {
    font-size: 1.4rem;
  }

  .status {
    font-size: 1.3rem;
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
`, "",{"version":3,"sources":["webpack://./src/styles/styles.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: 'EFCO Brookshire';\n  src: url('../assets/fonts/efco-brookshire-regular.ttf');\n}\n\n* {\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  height: 100vh;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-family: 'EFCO Brookshire', Arial, Helvetica, sans-serif;\n  background: linear-gradient(\n    90deg,\n    rgb(31, 38, 61) 0%,\n    rgb(47, 61, 99) 29%,\n    rgb(43, 55, 92) 76%,\n    rgb(31, 38, 61) 100%\n  );\n}\n\nheader {\n  height: fit-content;\n}\n\n.logo {\n  background: url('../assets/images/brown-logo.png');\n  height: 170px;\n  width: 170px;\n  background-size: contain;\n  background-repeat: no-repeat;\n  display: block;\n  margin: 0 auto;\n  justify-self: center;\n}\n\nmain {\n  padding: 20px 0;\n  text-align: center;\n}\n\n.new-game {\n  margin-top: 60px;\n  width: 200px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n}\n\n.name {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n}\n\n.enter-name {\n  font-size: 1.2rem;\n}\n\n.name-input {\n  padding-left: 10px;\n  width: 100%;\n  height: 30px;\n  color: #374772;\n  border-radius: 2px;\n  border: none;\n  background: linear-gradient(\n    90deg,\n    rgb(152, 152, 147) 0%,\n    rgb(244, 238, 205) 10%,\n    rgb(244, 238, 205) 90%,\n    rgb(152, 152, 147) 100%\n  );\n}\n\n.name-input:focus {\n  outline: none;\n}\n\n.name-input::placeholder {\n  font-size: 0.9rem;\n}\n\n.start,\n.restart, .ship-direction {\n  width: 100px;\n  padding: 10px 0;\n  font-size: 1.2rem;\n  background: linear-gradient(\n    90deg,\n    rgb(219, 206, 150) 0%,\n    rgb(255, 243, 187) 29%,\n    rgb(255, 243, 187) 76%,\n    rgb(219, 206, 150) 100%\n  );\n  color: #4e5f8e;\n  border: none;\n  border-radius: 2px;\n  cursor: pointer;\n}\n\n.start:active,\n.restart:active, .ship-direction:active {\n  color: #374772;\n  background: linear-gradient(\n    90deg,\n    rgb(255, 243, 187) 0%,\n    rgb(219, 206, 150) 29%,\n    rgb(219, 206, 150) 76%,\n    rgb(255, 243, 187) 100%\n  );\n}\n\n.boards-container {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.board-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n\n.board-title {\n  color: rgb(237, 196, 115);\n  font-size: 1.2rem;\n}\n\n.board {\n  border: 2px solid rgb(255, 253, 244);\n  display: grid;\n  grid-template-columns: repeat(10, 20px);\n  grid-template-rows: repeat(10, 20px);\n  gap: 1px;\n}\n\n.cell, .place-cell {\n  border: 1px solid rgb(255, 253, 244);\n}\n\n.computer-board .cell {\n  cursor: pointer;\n}\n\n.computer-board .cell:hover {\n  border: 3px solid rgb(132, 205, 72);\n  cursor: crosshair;\n}\n\n.can-place {\n  cursor: crosshair;\n  background: rgba(143, 231, 71, 0.5);\n}\n\n.player-board .occupied, .board .occupied {\n  background: rgb(237, 196, 115);\n}\n\n.missed {\n  background: url('../assets/images/missed.svg');\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.board .hit {\n  background: url('../assets/images/hit.svg');\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.computer-board .hit:hover,\n.computer-board .missed:hover {\n  cursor: not-allowed;\n  border: 3px solid red;\n}\n\n.can-not-place:hover {\n  cursor: not-allowed;\n  background: rgba(255, 0, 0, 0.4);\n}\n\n.status-container {\n  background: rgba(94, 114, 170, 0.4);\n  height: fit-content;\n  padding: 25px 40px;\n  border-radius: 4px;\n  margin: 20px auto 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 300px;\n}\n\n.status {\n  font-size: 1.1rem;\n}\n\n.status,\n.enter-name {\n  color: rgb(237, 196, 115);\n  text-align: center;\n}\n\np {\n  margin: 0;\n}\n\n.game-end-message {\n  color: rgb(237, 196, 115);\n  font-size: 2rem;\n  text-align: center;\n  margin-top: 100px;\n}\n\n.restart {\n  margin-top: 100px;\n  width: 180px;\n  font-size: 1.6rem;\n  padding: 10px 5px;\n}\n\n.place-ship-board-title {\n  color: rgb(237, 196, 115);\n  font-weight: normal;\n}\n\n.ship-direction {\n  margin-top: 20px;\n}\n\nfooter {\n  width: 100%;\n  min-height: 40px;\n  font-size: 0.9rem;\n  margin-top: auto;\n  background: linear-gradient(\n    90deg,\n    rgb(152, 152, 147) 0%,\n    rgb(244, 238, 205) 29%,\n    rgb(244, 238, 205) 76%,\n    rgb(152, 152, 147) 100%\n  );\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #374772;\n}\n\nfooter a {\n  text-decoration: none;\n  color: #566daf;\n}\n\nfooter a:hover {\n  color: #3351a3;\n}\n\nfooter a:active {\n  color: #4f66a6;\n}\n\n.clickable {\n  pointer-events: none;\n}\n\n@media screen and (min-width: 500px) {\n  .logo {\n    height: 200px;\n    width: 200px;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .boards-container {\n    flex-direction: row;\n    gap: 50px;\n  }\n\n  .status-container {\n    width: 500px;\n    margin-top: 40px;\n  }\n}\n\n@media screen and (min-width: 700px) {\n  .board {\n    grid-template-columns: repeat(10, 30px);\n    grid-template-rows: repeat(10, 30px);\n    gap: 1px;\n  }\n\n  .board-title {\n    font-size: 1.4rem;\n  }\n\n  .status {\n    font-size: 1.3rem;\n  }\n}\n\n@media screen and (min-width: 1200px) {\n  .new-game {\n    width: 300px;\n    gap: 30px;\n  }\n\n  .name {\n    gap: 30px;\n  }\n\n  .enter-name {\n    font-size: 1.4rem;\n  }\n\n  .board-title {\n    font-size: 1.6rem;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG1DQUFtQztBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sd0ZBQXdGLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLEtBQUssTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sTUFBTSxVQUFV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V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9ub3JtYWxpemUuY3NzPzQzZjQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGVzLmNzcz9lNDViIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbGlzdGVuT25FbmVteUJvYXJkQXR0YWNrLCBsaXN0ZW5PbkNlbGxDbGljaywgYXR0YWNrUGxheWVyQm9hcmQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclBsYWNpbmdTaGlwc0ludGVyZmFjZShwbGF5ZXJCb2FyZCwgYXhpcykge1xuICBjbGVhck1haW4oKTtcblxuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGNyZWF0ZUJvYXJkQ29udGFpbmVyKHBsYXllckJvYXJkKTtcbiAgY29uc3Qgc2hpcERpcmVjdGlvbiA9IGNyZWF0ZVNoaXBEaXJlY3Rpb25CdXR0b24oYXhpcyk7XG5cbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgbWFpbi5hcHBlbmQoYm9hcmRDb250YWluZXIsIHNoaXBEaXJlY3Rpb24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZENvbnRhaW5lcihwbGF5ZXJCb2FyZCkge1xuICBjb25zdCBib2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgYm9hcmRUaXRsZS5jbGFzc05hbWUgPSAncGxhY2Utc2hpcC1ib2FyZC10aXRsZSc7XG4gIGJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBzaGlwcyc7XG5cbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYm9hcmQuY2xhc3NOYW1lID0gJ2JvYXJkJztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3BsYWNlLWNlbGwnO1xuICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZXMnLCBgJHtpfSwke2p9YCk7XG5cbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5ib2FyZFtpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ29jY3VwaWVkJyk7XG4gICAgICB9XG5cbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSAncGxhY2Utc2hpcHMtYm9hcmQtY29udGFpbmVyJztcblxuICBib2FyZENvbnRhaW5lci5hcHBlbmQoYm9hcmRUaXRsZSwgYm9hcmQpO1xuXG4gIHJldHVybiBib2FyZENvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hpcERpcmVjdGlvbkJ1dHRvbihheGlzKSB7XG4gIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgc2hpcERpcmVjdGlvbi5jbGFzc05hbWUgPSAnc2hpcC1kaXJlY3Rpb24nO1xuICBzaGlwRGlyZWN0aW9uLnRleHRDb250ZW50ID0gYXhpcyA9PT0gJ3gnID8gJ0hvcml6b250YWwnIDogJ1ZlcnRpY2FsJztcblxuICByZXR1cm4gc2hpcERpcmVjdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUhpZ2hsaWdodGluZyhcbiAgcGxheWVyLFxuICBjZWxsLFxuICBheGlzLFxuICBjb29yZGluYXRlcyxcbiAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLFxuICBsZW5ndGgsXG4gIHNoaXBcbikge1xuICBjb25zdCBjYW5QbGFjZSA9IHBsYXllci5nYW1lYm9hcmQuY2FuUGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzLCBheGlzKTtcblxuICBpZiAoY2FuUGxhY2UpIHtcbiAgICBoaWdobGlnaHRWYWxpZENlbGxzKFxuICAgICAgY2VsbCxcbiAgICAgIGF4aXMsXG4gICAgICBjb29yZGluYXRlcyxcbiAgICAgIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcixcbiAgICAgIGxlbmd0aFxuICAgICk7XG4gICAgbGlzdGVuT25DZWxsQ2xpY2soY2VsbCwgY29vcmRpbmF0ZXMsIHNoaXApO1xuICB9IGVsc2Uge1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2FuLW5vdC1wbGFjZScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWdobGlnaHRWYWxpZENlbGxzKFxuICBjZWxsLFxuICBheGlzLFxuICBjb29yZGluYXRlcyxcbiAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLFxuICBsZW5ndGhcbikge1xuICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhbi1ub3QtcGxhY2UnKTtcbiAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyssIGNlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjYW4tcGxhY2UnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChcbiAgICAgIGxldCBpID0gY29vcmRpbmF0ZXNbMF0sIGogPSBjb29yZGluYXRlc1sxXSwgayA9IDA7XG4gICAgICBrIDwgbGVuZ3RoO1xuICAgICAgaSsrLFxuICAgICAgICBrKyssXG4gICAgICAgIGNlbGwgPSBwbGFjZVNoaXBzQm9hcmRDb250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgW2RhdGEtY29vcmRpbmF0ZXM9JyR7aX0sJHtqfSddYFxuICAgICAgICApXG4gICAgKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Nhbi1wbGFjZScpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2VsbEhpZ2hsaWdodGluZygpIHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxhY2UtY2VsbCcpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjYW4tcGxhY2UnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVIb3ZlcmluZyhlLCBudW1iZXJPZlNoaXBzTGVmdFRvUGxhY2UsIHBsYXllciwgYXhpcywgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyKSB7XG4gIC8vIFJlbW92ZSBwcmV2aW91cyBjZWxsIGhpZ2hsaWdodGluZ1xuICByZW1vdmVDZWxsSGlnaGxpZ2h0aW5nKCk7XG5cbiAgbGV0IGNlbGwgPSBlLnRhcmdldC5jbG9zZXN0KCcucGxhY2UtY2VsbCcpO1xuICBpZiAoY2VsbCkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gY2VsbC5kYXRhc2V0LmNvb3JkaW5hdGVzXG4gICAgICAuc3BsaXQoJywnKVxuICAgICAgLm1hcCgobnVtYmVyKSA9PiBudW1iZXIgKiAxKTtcblxuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IHNoaXA7XG5cbiAgICAvLyBUcnkgdG8gcGxhY2UgdGhlIHNoaXAgaW4gdHVyblxuICAgIHN3aXRjaCAobnVtYmVyT2ZTaGlwc0xlZnRUb1BsYWNlKSB7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHNoaXAgPSBwbGF5ZXIuZ2FtZWJvYXJkLmNhcnJpZXI7XG4gICAgICAgIGxlbmd0aCA9IDU7XG5cbiAgICAgICAgaGFuZGxlSGlnaGxpZ2h0aW5nKFxuICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICBjZWxsLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgY29vcmRpbmF0ZXMsXG4gICAgICAgICAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBzaGlwXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNoaXAgPSBwbGF5ZXIuZ2FtZWJvYXJkLmJhdHRsZXNoaXA7XG4gICAgICAgIGxlbmd0aCA9IDQ7XG5cbiAgICAgICAgaGFuZGxlSGlnaGxpZ2h0aW5nKFxuICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICBjZWxsLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgY29vcmRpbmF0ZXMsXG4gICAgICAgICAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBzaGlwXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNoaXAgPSBwbGF5ZXIuZ2FtZWJvYXJkLmNydWlzZXI7XG4gICAgICAgIGxlbmd0aCA9IDM7XG5cbiAgICAgICAgaGFuZGxlSGlnaGxpZ2h0aW5nKFxuICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICBjZWxsLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgY29vcmRpbmF0ZXMsXG4gICAgICAgICAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBzaGlwXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHNoaXAgPSBwbGF5ZXIuZ2FtZWJvYXJkLnN1Ym1hcmluZTtcbiAgICAgICAgbGVuZ3RoID0gMztcblxuICAgICAgICBoYW5kbGVIaWdobGlnaHRpbmcoXG4gICAgICAgICAgcGxheWVyLFxuICAgICAgICAgIGNlbGwsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBjb29yZGluYXRlcyxcbiAgICAgICAgICBwbGFjZVNoaXBzQm9hcmRDb250YWluZXIsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIHNoaXBcbiAgICAgICAgKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc2hpcCA9IHBsYXllci5nYW1lYm9hcmQuZGVzdHJveWVyO1xuICAgICAgICBsZW5ndGggPSAyO1xuXG4gICAgICAgIGhhbmRsZUhpZ2hsaWdodGluZyhcbiAgICAgICAgICBwbGF5ZXIsXG4gICAgICAgICAgY2VsbCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGNvb3JkaW5hdGVzLFxuICAgICAgICAgIHBsYWNlU2hpcHNCb2FyZENvbnRhaW5lcixcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgc2hpcFxuICAgICAgICApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJNYWluKCkge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBtYWluLmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RhdHVzKG5hbWUpIHtcbiAgY29uc3Qgc3RhdHVzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBzdGF0dXNDb250YWluZXIuY2xhc3NOYW1lID0gJ3N0YXR1cy1jb250YWluZXInO1xuXG4gIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgc3RhdHVzLmNsYXNzTmFtZSA9ICdzdGF0dXMnO1xuICBzdGF0dXMudGV4dENvbnRlbnQgPSBgU3RhbmRpbmcgYnkgZm9yIHlvdXIgY29tbWFuZCwgQ2FwdGFpbiAke25hbWV9Li4uYDtcblxuICBzdGF0dXNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdHVzKTtcblxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBtYWluLmFwcGVuZENoaWxkKHN0YXR1c0NvbnRhaW5lcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTdGF0dXMoKSB7XG4gIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgc3RhdHVzLnRleHRDb250ZW50ID0gJ0luY29taW5n4oCmIGhvbGQgc3RlYWR5ISc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJCb2FyZHMocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpIHtcbiAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSByZW5kZXJQbGF5ZXJCb2FyZChwbGF5ZXJCb2FyZCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSByZW5kZXJDb21wdXRlckJvYXJkKGNvbXB1dGVyQm9hcmQpO1xuXG4gIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgYm9hcmRzQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdib2FyZHMtY29udGFpbmVyJztcbiAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZENvbnRhaW5lciwgY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG5cbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChib2FyZHNDb250YWluZXIpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQbGF5ZXJCb2FyZChwbGF5ZXJCb2FyZCkge1xuICBjb25zdCBwbGF5ZXJCb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBwbGF5ZXJCb2FyZFRpdGxlLmNsYXNzTmFtZSA9ICdwbGF5ZXItYm9hcmQtdGl0bGUgYm9hcmQtdGl0bGUnO1xuICBwbGF5ZXJCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gJ1lvdXIgRmxlZXQnO1xuXG4gIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwbGF5ZXJHYW1lQm9hcmQuY2xhc3NOYW1lID0gJ3BsYXllci1ib2FyZCBib2FyZCc7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGVzJywgYCR7aX0sJHtqfWApO1xuXG4gICAgICAvLyBJZiB0aGVzZSBjb29yZGluYXRlcyBhcmUgaW4gdGhlIG1pc3NlZCBhdHRhY2tzIGFycmF5LCBtYXJrIHRoZSBzcXVhcmVcbiAgICAgIGNvbnN0IG1pc3NlZEF0dGFjayA9IHBsYXllckJvYXJkLm1pc3NlZEF0dGFja3Muc29tZShcbiAgICAgICAgKGNvb3JkaW5hdGVzKSA9PiBjb29yZGluYXRlc1swXSA9PT0gaSAmJiBjb29yZGluYXRlc1sxXSA9PT0galxuICAgICAgKTtcblxuICAgICAgaWYgKG1pc3NlZEF0dGFjaykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3NlZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGxheWVyQm9hcmQuYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdvY2N1cGllZCcpO1xuXG4gICAgICAgIC8vIE1hcmsgdGhlIHNxdWFyZSBpZiBpdCdzIGJlZW4gaGl0XG4gICAgICAgIGlmIChwbGF5ZXJCb2FyZC5ib2FyZFtpXVtqXS5oaXQpIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBsYXllckdhbWVCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2FydGljbGUnKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NOYW1lID0gJ3BsYXllci1ib2FyZC1jb250YWluZXIgYm9hcmQtY29udGFpbmVyJztcbiAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkVGl0bGUsIHBsYXllckdhbWVCb2FyZCk7XG5cbiAgcmV0dXJuIHBsYXllckJvYXJkQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb21wdXRlckJvYXJkKGNvbXB1dGVyQm9hcmQpIHtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBjb21wdXRlckJvYXJkVGl0bGUuY2xhc3NOYW1lID0gJ2NvbXB1dGVyLWJvYXJkLXRpdGxlIGJvYXJkLXRpdGxlJztcbiAgY29tcHV0ZXJCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gJ0VuZW15IFdhdGVycyc7XG5cbiAgY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQuY2xhc3NOYW1lID0gJ2NvbXB1dGVyLWJvYXJkIGJvYXJkJztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ2VuZW15LWNlbGwgY2VsbCc7XG4gICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlcycsIGAke2l9LCR7an1gKTtcblxuICAgICAgLy8gTWFyayB0aGUgc3F1YXJlIGlmIGl0IGhhcyBhIG1pc3NlZCBhdHRhY2tcbiAgICAgIGNvbnN0IG1pc3NlZEF0dGFjayA9IGNvbXB1dGVyQm9hcmQubWlzc2VkQXR0YWNrcy5zb21lKFxuICAgICAgICAoY29vcmRpbmF0ZXMpID0+IGNvb3JkaW5hdGVzWzBdID09PSBpICYmIGNvb3JkaW5hdGVzWzFdID09PSBqXG4gICAgICApO1xuXG4gICAgICBpZiAobWlzc2VkQXR0YWNrKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzc2VkJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hcmsgdGhlIHNxdWFyZSBpZiBpdCdzIGJlZW4gaGl0XG4gICAgICBpZiAoY29tcHV0ZXJCb2FyZC5ib2FyZFtpXVtqXSAhPT0gbnVsbCAmJiBjb21wdXRlckJvYXJkLmJvYXJkW2ldW2pdLmhpdCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgfVxuXG4gICAgICBjb21wdXRlckdhbWVCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXJ0aWNsZScpO1xuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdjb21wdXRlci1ib2FyZC1jb250YWluZXIgYm9hcmQtY29udGFpbmVyJztcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQoY29tcHV0ZXJCb2FyZFRpdGxlLCBjb21wdXRlckdhbWVCb2FyZCk7XG5cbiAgcmV0dXJuIGNvbXB1dGVyQm9hcmRDb250YWluZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHYW1lVmlldyhwbGF5ZXIsIGNvbXB1dGVyLCBwbGF5ZXJUdXJuLCBnYW1lT3Zlcikge1xuICBpZiAoZ2FtZU92ZXIpIHJldHVybjtcblxuICBjbGVhck1haW4oKTtcbiAgcmVuZGVyQm9hcmRzKHBsYXllci5nYW1lYm9hcmQsIGNvbXB1dGVyLmdhbWVib2FyZCk7XG4gIHJlbmRlclN0YXR1cyhwbGF5ZXIubmFtZSk7XG5cbiAgaWYgKHBsYXllclR1cm4pIHtcbiAgICBsaXN0ZW5PbkVuZW15Qm9hcmRBdHRhY2soKTtcbiAgfSBlbHNlIHtcbiAgICBhdHRhY2tQbGF5ZXJCb2FyZCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlc3RhcnRCdXR0b24oKSB7XG4gIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgcmVzdGFydEJ1dHRvbi5jbGFzc05hbWUgPSAncmVzdGFydCc7XG4gIHJlc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSAnQmF0dGxlIEFnYWluJztcblxuICByZXR1cm4gcmVzdGFydEJ1dHRvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFubm91bmNlV2lubmVyKG5hbWUgPSB1bmRlZmluZWQpIHtcbiAgY2xlYXJNYWluKCk7XG5cbiAgbGV0IG1lc3NhZ2VUZXh0O1xuXG4gIGlmIChuYW1lKSB7XG4gICAgbWVzc2FnZVRleHQgPSBgVmljdG9yeSEgQ2FwdGFpbiAke25hbWV9IGhhcyBjb25xdWVyZWQgdGhlIHNlYXMhYDtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlVGV4dCA9IGBEZWZlYXQuLi4gb3VyIGZsZWV0IGhhcyBiZWVuIHZhbnF1aXNoZWQuYDtcbiAgfVxuXG4gIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIG1lc3NhZ2UuY2xhc3NOYW1lID0gJ2dhbWUtZW5kLW1lc3NhZ2UnO1xuICBtZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZVRleHQ7XG5cbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgbWFpbi5hcHBlbmQobWVzc2FnZSwgY3JlYXRlUmVzdGFydEJ1dHRvbigpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUVuZW15Qm9hcmRJbnRlcmFjdGlvbigpIHtcbiAgY29uc3QgZW5lbXlCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1ib2FyZCcpO1xuICBlbmVteUJvYXJkLmNsYXNzTGlzdC50b2dnbGUoJ2NsaWNrYWJsZScpO1xufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgbWlzc2VkQXR0YWNrcyA9IFtdO1xuICBhbGxTdW5rID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oQXJyYXkoMTApLCAoKSA9PiBuZXcgQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIHRoaXMuY2FycmllciA9IG5ldyBTaGlwKDUsICdjYXJyaWVyJyk7XG4gICAgdGhpcy5iYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ2JhdHRsZXNoaXAnKTtcbiAgICB0aGlzLmNydWlzZXIgPSBuZXcgU2hpcCgzLCAnY3J1aXNlcicpO1xuICAgIHRoaXMuc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ3N1Ym1hcmluZScpO1xuICAgIHRoaXMuZGVzdHJveWVyID0gbmV3IFNoaXAoMiwgJ2Rlc3Ryb3llcicpO1xuICAgIHRoaXMuc2hpcHMgPSBbXG4gICAgICB0aGlzLmNhcnJpZXIsXG4gICAgICB0aGlzLmJhdHRsZXNoaXAsXG4gICAgICB0aGlzLmNydWlzZXIsXG4gICAgICB0aGlzLnN1Ym1hcmluZSxcbiAgICAgIHRoaXMuZGVzdHJveWVyLFxuICAgIF07XG4gIH1cblxuICBjYW5QbGFjZVNoaXAoc2hpcCwgY29vcmRpbmF0ZXMsIGF4aXMpIHtcbiAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IGNvb3JkaW5hdGVzWzBdLCBqID0gY29vcmRpbmF0ZXNbMV0sIGsgPSAwO1xuICAgICAgICBrIDwgc2hpcC5zaGlwTGVuZ3RoICYmIGkgPCAxMCAmJiBqIDwgMTA7XG4gICAgICAgIGorKywgaysrXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaiA9PT0gOSAmJiBrIDwgc2hpcC5zaGlwTGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gY29vcmRpbmF0ZXNbMF0sIGogPSBjb29yZGluYXRlc1sxXSwgayA9IDA7XG4gICAgICAgIGsgPCBzaGlwLnNoaXBMZW5ndGggJiYgaSA8IDEwICYmIGogPCAxMDtcbiAgICAgICAgaSsrLCBrKytcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpID09PSA5ICYmIGsgPCBzaGlwLnNoaXBMZW5ndGggLSAxKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCwgY29vcmRpbmF0ZXMsIGF4aXMpIHtcbiAgICBpZiAoIXRoaXMuY2FuUGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzLCBheGlzKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBjb29yZGluYXRlc1swXSwgaiA9IGNvb3JkaW5hdGVzWzFdLCBrID0gMDtcbiAgICAgICAgayA8IHNoaXAuc2hpcExlbmd0aDtcbiAgICAgICAgaisrLCBrKytcbiAgICAgICkge1xuICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0geyBoaXQ6IGZhbHNlLCBzaGlwIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gY29vcmRpbmF0ZXNbMF0sIGogPSBjb29yZGluYXRlc1sxXSwgayA9IDA7XG4gICAgICAgIGsgPCBzaGlwLnNoaXBMZW5ndGg7XG4gICAgICAgIGkrKywgaysrXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHsgaGl0OiBmYWxzZSwgc2hpcCB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgI2lzT2NjdXBpZWQoY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZGluYXRlc1swXV1bY29vcmRpbmF0ZXNbMV1dICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgI2FyZUFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG4gIH1cblxuICAjYXJlVmFsaWRDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGlmIChcbiAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgY29vcmRpbmF0ZXNbMF0gPiA5IHx8XG4gICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgIGNvb3JkaW5hdGVzWzFdID4gOVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGlmICghdGhpcy4jaXNPY2N1cGllZChjb29yZGluYXRlcykpIHtcbiAgICAgIHRoaXMubWlzc2VkQXR0YWNrcy5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuI2FyZVZhbGlkQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmVjb3JkIGFuIGF0dGFjayBvbiB0aGUgc2hpcFxuICAgIHRoaXMuYm9hcmRbY29vcmRpbmF0ZXNbMF1dW2Nvb3JkaW5hdGVzWzFdXS5zaGlwLmhpdCgpO1xuICAgIHRoaXMuYm9hcmRbY29vcmRpbmF0ZXNbMF1dW2Nvb3JkaW5hdGVzWzFdXS5oaXQgPSB0cnVlO1xuXG4gICAgdGhpcy5hbGxTdW5rID0gdGhpcy4jYXJlQWxsU2hpcHNTdW5rKCk7XG4gIH1cbn1cbiIsImltcG9ydCAnLi9zdHlsZXMvc3R5bGVzLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0IHtcbiAgY3JlYXRlUGxheWVycyxcbiAgcGxhY2VTaGlwcyxcbiAgZmluZFJhbmRvbVVuYXR0YWNrZWRDZWxsLFxuICBpc0FscmVhZHlBdHRhY2tlZCxcbiAgZGVsYXlSZW5kZXJpbmcsXG59IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IHtcbiAgYW5ub3VuY2VXaW5uZXIsXG4gIHVwZGF0ZVN0YXR1cyxcbiAgcmVuZGVyUGxhY2luZ1NoaXBzSW50ZXJmYWNlLFxuICBoYW5kbGVIb3ZlcmluZyxcbiAgdXBkYXRlR2FtZVZpZXcsXG4gIHRvZ2dsZUVuZW15Qm9hcmRJbnRlcmFjdGlvbixcbn0gZnJvbSAnLi9kb20uanMnO1xuXG5sZXQgcGxheWVyLCBjb21wdXRlcjtcbmxldCBwbGF5ZXJUdXJuID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IHRydWUgOiBmYWxzZTtcbmxldCBudW1iZXJPZlNoaXBzTGVmdFRvUGxhY2UgPSA1O1xubGV0IGF4aXMgPSAneCc7XG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTtcblxuZnVuY3Rpb24gaGFuZGxlTmFtZUlucHV0KCkge1xuICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcbiAgaWYgKG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbXB1dGVyJyB8fCBuYW1lID09PSAnJykgcmV0dXJuO1xuXG4gICh7IHBsYXllciwgY29tcHV0ZXIgfSA9IGNyZWF0ZVBsYXllcnMobmFtZSkpO1xuXG4gIC8vIFJlbmRlciBvbmUgYm9hcmQgZm9yIHRoZSBwbGF5ZXIgdG8gcGxhY2UgdGhlaXIgc2hpcHNcbiAgcmVuZGVyUGxhY2luZ1NoaXBzSW50ZXJmYWNlKHBsYXllci5nYW1lYm9hcmQsIGF4aXMpO1xuICBsaXN0ZW5PbkJvYXJkSG92ZXJpbmcoKTtcbiAgbGlzdGVuT25TaGlwRGlyZWN0aW9uQ2hhbmdlKCk7XG5cbiAgLy8gRm9yIG5vdywgcGxhY2UgdGhlIGNvbXB1dGVyJ3Mgc2hpcHMgaW4gdGhlIHNhbWUgcGxhY2UuIFJhbmRvbWl6ZSBpdCBsYXRlclxuICBwbGFjZVNoaXBzKGNvbXB1dGVyLmdhbWVib2FyZCk7XG59XG5cbi8vIExpc3RlbiBmb3IgcGxheWVyIG5hbWUgaW5wdXQgd2hlbiBFbnRlciBrZXkgaXMgcHJlc3NlZFxuY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKTtcbm5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgaGFuZGxlTmFtZUlucHV0KCk7XG4gIH1cbn0pO1xuXG4vLyBMaXN0ZW4gZm9yIHBsYXllciBuYW1lIGlucHV0IHdoZW4gc3RhcnQgYnV0dG9uIGlzIGNsaWNrZWRcbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGFuZGxlTmFtZUlucHV0KCk7XG59KTtcblxuZnVuY3Rpb24gaGFuZGxlRW5lbXlCb2FyZENsaWNrKGUpIHtcbiAgY29uc3QgZW5lbXlDZWxsID0gZS50YXJnZXQuY2xvc2VzdCgnLmVuZW15LWNlbGwnKTtcblxuICBpZiAoZW5lbXlDZWxsKSB7XG4gICAgaWYgKGlzQWxyZWFkeUF0dGFja2VkKGVuZW15Q2VsbCkpIHJldHVybjtcblxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZW5lbXlDZWxsLmRhdGFzZXQuY29vcmRpbmF0ZXNcbiAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAubWFwKChudW1iZXIpID0+IG51bWJlciAqIDEpO1xuXG4gICAgaGFuZGxlQXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgY29vcmRpbmF0ZXMpO1xuXG4gICAgcGxheWVyVHVybiA9IGZhbHNlO1xuICAgIGF0dGFja1BsYXllckJvYXJkKCk7XG4gICAgbGlzdGVuT25FbmVteUJvYXJkQXR0YWNrKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rlbk9uRW5lbXlCb2FyZEF0dGFjaygpIHtcbiAgaWYgKCFwbGF5ZXJUdXJuKSByZXR1cm47XG5cbiAgY29uc3QgZW5lbXlCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1ib2FyZCcpO1xuICBpZiAoZW5lbXlCb2FyZCkge1xuICAgIGVuZW15Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFbmVteUJvYXJkQ2xpY2spO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2tQbGF5ZXJCb2FyZCgpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWJvYXJkJyk7XG4gIGlmIChwbGF5ZXJCb2FyZCkge1xuICAgIHRvZ2dsZUVuZW15Qm9hcmRJbnRlcmFjdGlvbigpO1xuXG4gICAgLy8gR2VuZXJhdGUgcmFuZG9tIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgY29vcmRpbmF0ZXNUb0F0dGFjayA9IGZpbmRSYW5kb21VbmF0dGFja2VkQ2VsbChwbGF5ZXJCb2FyZCk7XG5cbiAgICB1cGRhdGVTdGF0dXMoKTtcblxuICAgIGhhbmRsZUF0dGFjayhwbGF5ZXIuZ2FtZWJvYXJkLCBjb29yZGluYXRlc1RvQXR0YWNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVBdHRhY2soYm9hcmQsIGNvb3JkaW5hdGVzKSB7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuXG4gIGlmICghcGxheWVyVHVybikge1xuICAgIHBsYXllclR1cm4gPSB0cnVlO1xuICAgIGRlbGF5UmVuZGVyaW5nKCgpID0+XG4gICAgICB1cGRhdGVHYW1lVmlldyhwbGF5ZXIsIGNvbXB1dGVyLCBwbGF5ZXJUdXJuLCBnYW1lT3ZlcilcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUdhbWVWaWV3KHBsYXllciwgY29tcHV0ZXIsIHBsYXllclR1cm4sIGdhbWVPdmVyKTtcbiAgfVxuXG4gIGlmIChib2FyZC5hbGxTdW5rKSB7XG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgIGFubm91bmNlV2lubmVyKHBsYXllci5nYW1lYm9hcmQuYWxsU3VuayA/IHVuZGVmaW5lZCA6IHBsYXllci5uYW1lKTtcbiAgICBsaXN0ZW5PblJlc3RhcnRHYW1lQnV0dG9uKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGlzdGVuT25SZXN0YXJ0R2FtZUJ1dHRvbigpIHtcbiAgY29uc3QgcmVzdGFydEdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdGFydCcpO1xuICByZXN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0pO1xufVxuXG4vLyBMaXN0ZW4gb24gaG92ZXJpbmcgYWN0aW9uIG9uIHRoZSBib2FyZCB0byBwbGFjZSBzaGlwc1xuZnVuY3Rpb24gbGlzdGVuT25Cb2FyZEhvdmVyaW5nKCkge1xuICBjb25zdCBwbGFjZVNoaXBzQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcucGxhY2Utc2hpcHMtYm9hcmQtY29udGFpbmVyJ1xuICApO1xuICBwbGFjZVNoaXBzQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICBoYW5kbGVIb3ZlcmluZyhcbiAgICAgIGUsXG4gICAgICBudW1iZXJPZlNoaXBzTGVmdFRvUGxhY2UsXG4gICAgICBwbGF5ZXIsXG4gICAgICBheGlzLFxuICAgICAgcGxhY2VTaGlwc0JvYXJkQ29udGFpbmVyXG4gICAgKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUNlbGxDbGljayhjb29yZGluYXRlcywgc2hpcCkge1xuICBjb25zdCBwbGFjZWQgPSBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlcywgYXhpcyk7XG4gIGlmIChwbGFjZWQpIHtcbiAgICBudW1iZXJPZlNoaXBzTGVmdFRvUGxhY2UgLT0gMTtcbiAgfVxuXG4gIGlmIChudW1iZXJPZlNoaXBzTGVmdFRvUGxhY2UgPT09IDApIHtcbiAgICB1cGRhdGVHYW1lVmlldyhwbGF5ZXIsIGNvbXB1dGVyLCBwbGF5ZXJUdXJuLCBnYW1lT3Zlcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVuZGVyUGxhY2luZ1NoaXBzSW50ZXJmYWNlKHBsYXllci5nYW1lYm9hcmQsIGF4aXMpO1xuICBsaXN0ZW5PbkJvYXJkSG92ZXJpbmcoKTtcbiAgbGlzdGVuT25TaGlwRGlyZWN0aW9uQ2hhbmdlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5PbkNlbGxDbGljayhjZWxsLCBjb29yZGluYXRlcywgc2hpcCkge1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGhhbmRsZUNlbGxDbGljayhjb29yZGluYXRlcywgc2hpcCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBsaXN0ZW5PblNoaXBEaXJlY3Rpb25DaGFuZ2UoKSB7XG4gIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcC1kaXJlY3Rpb24nKTtcbiAgc2hpcERpcmVjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBheGlzID0gYXhpcyA9PT0gJ3gnID8gJ3knIDogJ3gnO1xuXG4gICAgc2hpcERpcmVjdGlvbi50ZXh0Q29udGVudCA9IGF4aXMgPT09ICd4JyA/ICdIb3Jpem9udGFsJyA6ICdWZXJ0aWNhbCc7XG4gIH0pO1xufVxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lID0gJ0NvbXB1dGVyJykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAjaGl0cyA9IDA7XG5cbiAgY29uc3RydWN0b3IobGVuZ3RoLCBuYW1lKSB7XG4gICAgdGhpcy5zaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXQgaGl0cygpIHtcbiAgICByZXR1cm4gdGhpcy4jaGl0cztcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICBpZiAodGhpcy4jaGl0cyA8IHRoaXMuc2hpcExlbmd0aCkge1xuICAgICAgdGhpcy4jaGl0cyArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy4jaGl0cyA9PT0gdGhpcy5zaGlwTGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcnMobmFtZSkge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKG5hbWUpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoKTtcblxuICByZXR1cm4geyBwbGF5ZXIsIGNvbXB1dGVyIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGFjZVNoaXBzKGdhbWVib2FyZCkge1xuICBwbGFjZVNoaXAoZ2FtZWJvYXJkLCBnYW1lYm9hcmQuY2Fycmllcik7XG4gIHBsYWNlU2hpcChnYW1lYm9hcmQsIGdhbWVib2FyZC5iYXR0bGVzaGlwKTtcbiAgcGxhY2VTaGlwKGdhbWVib2FyZCwgZ2FtZWJvYXJkLmNydWlzZXIpO1xuICBwbGFjZVNoaXAoZ2FtZWJvYXJkLCBnYW1lYm9hcmQuc3VibWFyaW5lKTtcbiAgcGxhY2VTaGlwKGdhbWVib2FyZCwgZ2FtZWJvYXJkLmRlc3Ryb3llcik7XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcChnYW1lYm9hcmQsIHNoaXApIHtcbiAgbGV0IHsgaSwgaiB9ID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpO1xuICBsZXQgYXhpcyA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAneCcgOiAneSc7XG5cbiAgd2hpbGUgKCFnYW1lYm9hcmQuY2FuUGxhY2VTaGlwKHNoaXAsIFtpLCBqXSwgYXhpcykpIHtcbiAgICAoeyBpLCBqIH0gPSBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGVzKCkpO1xuICAgIGF4aXMgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gJ3gnIDogJ3knO1xuICB9XG5cbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBbaSwgal0sIGF4aXMpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICByZXR1cm4ge1xuICAgIGk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5IC0gMCArIDEpICsgMCksXG4gICAgajogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDkgLSAwICsgMSkgKyAwKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWxyZWFkeUF0dGFja2VkKGNlbGwpIHtcbiAgcmV0dXJuIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzZWQnKSB8fCBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnaGl0Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUmFuZG9tVW5hdHRhY2tlZENlbGwocGxheWVyQm9hcmQpIHtcbiAgbGV0IHsgaSwgaiB9ID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpO1xuXG4gIGNvbnN0IGNlbGwgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlcz0nJHtpfSwke2p9J11gKTtcbiAgbGV0IGFscmVhZHlBdHRhY2tlZCA9IGlzQWxyZWFkeUF0dGFja2VkKGNlbGwpO1xuXG4gIHdoaWxlIChhbHJlYWR5QXR0YWNrZWQpIHtcbiAgICAoeyBpLCBqIH0gPSBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGVzKCkpO1xuXG4gICAgY29uc3QgY2VsbCA9IHBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3JkaW5hdGVzPScke2l9LCR7an0nXWApO1xuICAgIGFscmVhZHlBdHRhY2tlZCA9IGlzQWxyZWFkeUF0dGFja2VkKGNlbGwpO1xuICB9XG5cbiAgcmV0dXJuIFtpLCBqXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5UmVuZGVyaW5nKGNhbGxiYWNrKSB7XG4gIHNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDApO1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cblxuLyogRG9jdW1lbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIFxcYG1haW5cXGAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXG4gKi9cblxubWFpbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIFxcYGgxXFxgIGVsZW1lbnRzIHdpdGhpbiBcXGBzZWN0aW9uXFxgIGFuZFxuICogXFxgYXJ0aWNsZVxcYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIFxcYGVtXFxgIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLyoqXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIFxcYGVtXFxgIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBcXGBzdWJcXGAgYW5kIFxcYHN1cFxcYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cbiAqIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdWIsXG5zdXAge1xuICBmb250LXNpemU6IDc1JTtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG5zdWIge1xuICBib3R0b206IC0wLjI1ZW07XG59XG5cbnN1cCB7XG4gIHRvcDogLTAuNWVtO1xufVxuXG4vKiBFbWJlZGRlZCBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuaW1nIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCxcbm9wdGdyb3VwLFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgbWFyZ2luOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxuICovXG5cbmJ1dHRvbixcbmlucHV0IHtcbiAgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b24sXG5zZWxlY3Qge1xuICAvKiAxICovXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuW3R5cGU9J2J1dHRvbiddLFxuW3R5cGU9J3Jlc2V0J10sXG5bdHlwZT0nc3VibWl0J10ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdidXR0b24nXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdyZXNldCddOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J3N1Ym1pdCddOjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cbiAqL1xuXG5idXR0b246LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nYnV0dG9uJ106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0ncmVzZXQnXTotbW96LWZvY3VzcmluZyxcblt0eXBlPSdzdWJtaXQnXTotbW96LWZvY3VzcmluZyB7XG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuZmllbGRzZXQge1xuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gXFxgZmllbGRzZXRcXGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBcXGBmaWVsZHNldFxcYCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxubGVnZW5kIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cbiAgcGFkZGluZzogMDsgLyogMyAqL1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cbiAqL1xuXG5wcm9ncmVzcyB7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxuICovXG5cblt0eXBlPSdjaGVja2JveCddLFxuW3R5cGU9J3JhZGlvJ10ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuW3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXG4gKi9cblxuW3R5cGU9J3NlYXJjaCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXG4gKi9cblxuW3R5cGU9J3NlYXJjaCddOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIFxcYGluaGVyaXRcXGAgaW4gU2FmYXJpLlxuICovXG5cbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xuICBmb250OiBpbmhlcml0OyAvKiAyICovXG59XG5cbi8qIEludGVyYWN0aXZlXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cbiAqL1xuXG5kZXRhaWxzIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3VtbWFyeSB7XG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcbn1cblxuLyogTWlzY1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXG4gKi9cblxudGVtcGxhdGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxuICovXG5cbltoaWRkZW5dIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9ub3JtYWxpemUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDJFQUEyRTs7QUFFM0U7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSxpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLDhCQUE4QixFQUFFLE1BQU07QUFDeEM7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLFNBQVM7QUFDWDs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLHVCQUF1QixFQUFFLE1BQU07RUFDL0IsU0FBUyxFQUFFLE1BQU07RUFDakIsaUJBQWlCLEVBQUUsTUFBTTtBQUMzQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxpQ0FBaUMsRUFBRSxNQUFNO0VBQ3pDLGNBQWMsRUFBRSxNQUFNO0FBQ3hCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsbUJBQW1CLEVBQUUsTUFBTTtFQUMzQiwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGlDQUFpQyxFQUFFLE1BQU07QUFDM0M7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsbUJBQW1CO0FBQ3JCOztBQUVBOzs7RUFHRTs7QUFFRjs7O0VBR0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjs7Ozs7RUFLRSxvQkFBb0IsRUFBRSxNQUFNO0VBQzVCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLGlCQUFpQixFQUFFLE1BQU07RUFDekIsU0FBUyxFQUFFLE1BQU07QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLE1BQU07RUFDTixpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLE1BQU07RUFDTixvQkFBb0I7QUFDdEI7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSwwQkFBMEI7QUFDNUI7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSxrQkFBa0I7RUFDbEIsVUFBVTtBQUNaOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsOEJBQThCO0FBQ2hDOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBOzs7OztFQUtFOztBQUVGO0VBQ0Usc0JBQXNCLEVBQUUsTUFBTTtFQUM5QixjQUFjLEVBQUUsTUFBTTtFQUN0QixjQUFjLEVBQUUsTUFBTTtFQUN0QixlQUFlLEVBQUUsTUFBTTtFQUN2QixVQUFVLEVBQUUsTUFBTTtFQUNsQixtQkFBbUIsRUFBRSxNQUFNO0FBQzdCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7O0VBR0U7O0FBRUY7O0VBRUUsc0JBQXNCLEVBQUUsTUFBTTtFQUM5QixVQUFVLEVBQUUsTUFBTTtBQUNwQjs7QUFFQTs7RUFFRTs7QUFFRjs7RUFFRSxZQUFZO0FBQ2Q7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsNkJBQTZCLEVBQUUsTUFBTTtFQUNyQyxvQkFBb0IsRUFBRSxNQUFNO0FBQzlCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDBCQUEwQixFQUFFLE1BQU07RUFDbEMsYUFBYSxFQUFFLE1BQU07QUFDdkI7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGFBQWE7QUFDZjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGFBQWE7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLyoqXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxuICovXFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcblxcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnByZSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPSdidXR0b24nXSxcXG5bdHlwZT0ncmVzZXQnXSxcXG5bdHlwZT0nc3VibWl0J10ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPSdidXR0b24nXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT0ncmVzZXQnXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT0nc3VibWl0J106Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT0nYnV0dG9uJ106LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9J3Jlc2V0J106LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9J3N1Ym1pdCddOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT0nY2hlY2tib3gnXSxcXG5bdHlwZT0ncmFkaW8nXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9J3NlYXJjaCddIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9J3NlYXJjaCddOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvZm9udHMvZWZjby1icm9va3NoaXJlLXJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltYWdlcy9icm93bi1sb2dvLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvbWlzc2VkLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvaGl0LnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiAnRUZDTyBCcm9va3NoaXJlJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG59XG5cbioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sLFxuYm9keSB7XG4gIGhlaWdodDogMTAwdmg7XG59XG5cbmJvZHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LWZhbWlseTogJ0VGQ08gQnJvb2tzaGlyZScsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbiAgICA5MGRlZyxcbiAgICByZ2IoMzEsIDM4LCA2MSkgMCUsXG4gICAgcmdiKDQ3LCA2MSwgOTkpIDI5JSxcbiAgICByZ2IoNDMsIDU1LCA5MikgNzYlLFxuICAgIHJnYigzMSwgMzgsIDYxKSAxMDAlXG4gICk7XG59XG5cbmhlYWRlciB7XG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XG59XG5cbi5sb2dvIHtcbiAgYmFja2dyb3VuZDogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xuICBoZWlnaHQ6IDE3MHB4O1xuICB3aWR0aDogMTcwcHg7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbn1cblxubWFpbiB7XG4gIHBhZGRpbmc6IDIwcHggMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubmV3LWdhbWUge1xuICBtYXJnaW4tdG9wOiA2MHB4O1xuICB3aWR0aDogMjAwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjBweDtcbn1cblxuLm5hbWUge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4uZW50ZXItbmFtZSB7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xufVxuXG4ubmFtZS1pbnB1dCB7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMzBweDtcbiAgY29sb3I6ICMzNzQ3NzI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgOTBkZWcsXG4gICAgcmdiKDE1MiwgMTUyLCAxNDcpIDAlLFxuICAgIHJnYigyNDQsIDIzOCwgMjA1KSAxMCUsXG4gICAgcmdiKDI0NCwgMjM4LCAyMDUpIDkwJSxcbiAgICByZ2IoMTUyLCAxNTIsIDE0NykgMTAwJVxuICApO1xufVxuXG4ubmFtZS1pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5uYW1lLWlucHV0OjpwbGFjZWhvbGRlciB7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4uc3RhcnQsXG4ucmVzdGFydCwgLnNoaXAtZGlyZWN0aW9uIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgOTBkZWcsXG4gICAgcmdiKDIxOSwgMjA2LCAxNTApIDAlLFxuICAgIHJnYigyNTUsIDI0MywgMTg3KSAyOSUsXG4gICAgcmdiKDI1NSwgMjQzLCAxODcpIDc2JSxcbiAgICByZ2IoMjE5LCAyMDYsIDE1MCkgMTAwJVxuICApO1xuICBjb2xvcjogIzRlNWY4ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnN0YXJ0OmFjdGl2ZSxcbi5yZXN0YXJ0OmFjdGl2ZSwgLnNoaXAtZGlyZWN0aW9uOmFjdGl2ZSB7XG4gIGNvbG9yOiAjMzc0NzcyO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgOTBkZWcsXG4gICAgcmdiKDI1NSwgMjQzLCAxODcpIDAlLFxuICAgIHJnYigyMTksIDIwNiwgMTUwKSAyOSUsXG4gICAgcmdiKDIxOSwgMjA2LCAxNTApIDc2JSxcbiAgICByZ2IoMjU1LCAyNDMsIDE4NykgMTAwJVxuICApO1xufVxuXG4uYm9hcmRzLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTVweDtcbn1cblxuLmJvYXJkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbn1cblxuLmJvYXJkLXRpdGxlIHtcbiAgY29sb3I6IHJnYigyMzcsIDE5NiwgMTE1KTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG59XG5cbi5ib2FyZCB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYigyNTUsIDI1MywgMjQ0KTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDIwcHgpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjBweCk7XG4gIGdhcDogMXB4O1xufVxuXG4uY2VsbCwgLnBsYWNlLWNlbGwge1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjU1LCAyNTMsIDI0NCk7XG59XG5cbi5jb21wdXRlci1ib2FyZCAuY2VsbCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNvbXB1dGVyLWJvYXJkIC5jZWxsOmhvdmVyIHtcbiAgYm9yZGVyOiAzcHggc29saWQgcmdiKDEzMiwgMjA1LCA3Mik7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG4uY2FuLXBsYWNlIHtcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTQzLCAyMzEsIDcxLCAwLjUpO1xufVxuXG4ucGxheWVyLWJvYXJkIC5vY2N1cGllZCwgLmJvYXJkIC5vY2N1cGllZCB7XG4gIGJhY2tncm91bmQ6IHJnYigyMzcsIDE5NiwgMTE1KTtcbn1cblxuLm1pc3NlZCB7XG4gIGJhY2tncm91bmQ6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xufVxuXG4uYm9hcmQgLmhpdCB7XG4gIGJhY2tncm91bmQ6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xufVxuXG4uY29tcHV0ZXItYm9hcmQgLmhpdDpob3Zlcixcbi5jb21wdXRlci1ib2FyZCAubWlzc2VkOmhvdmVyIHtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgYm9yZGVyOiAzcHggc29saWQgcmVkO1xufVxuXG4uY2FuLW5vdC1wbGFjZTpob3ZlciB7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAwLCAwLCAwLjQpO1xufVxuXG4uc3RhdHVzLWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IHJnYmEoOTQsIDExNCwgMTcwLCAwLjQpO1xuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xuICBwYWRkaW5nOiAyNXB4IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgbWFyZ2luOiAyMHB4IGF1dG8gMCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDMwMHB4O1xufVxuXG4uc3RhdHVzIHtcbiAgZm9udC1zaXplOiAxLjFyZW07XG59XG5cbi5zdGF0dXMsXG4uZW50ZXItbmFtZSB7XG4gIGNvbG9yOiByZ2IoMjM3LCAxOTYsIDExNSk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmdhbWUtZW5kLW1lc3NhZ2Uge1xuICBjb2xvcjogcmdiKDIzNywgMTk2LCAxMTUpO1xuICBmb250LXNpemU6IDJyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG59XG5cbi5yZXN0YXJ0IHtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG4gIHdpZHRoOiAxODBweDtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIHBhZGRpbmc6IDEwcHggNXB4O1xufVxuXG4ucGxhY2Utc2hpcC1ib2FyZC10aXRsZSB7XG4gIGNvbG9yOiByZ2IoMjM3LCAxOTYsIDExNSk7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbi5zaGlwLWRpcmVjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbmZvb3RlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiA0MHB4O1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgbWFyZ2luLXRvcDogYXV0bztcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgIDkwZGVnLFxuICAgIHJnYigxNTIsIDE1MiwgMTQ3KSAwJSxcbiAgICByZ2IoMjQ0LCAyMzgsIDIwNSkgMjklLFxuICAgIHJnYigyNDQsIDIzOCwgMjA1KSA3NiUsXG4gICAgcmdiKDE1MiwgMTUyLCAxNDcpIDEwMCVcbiAgKTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiAjMzc0NzcyO1xufVxuXG5mb290ZXIgYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6ICM1NjZkYWY7XG59XG5cbmZvb3RlciBhOmhvdmVyIHtcbiAgY29sb3I6ICMzMzUxYTM7XG59XG5cbmZvb3RlciBhOmFjdGl2ZSB7XG4gIGNvbG9yOiAjNGY2NmE2O1xufVxuXG4uY2xpY2thYmxlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDUwMHB4KSB7XG4gIC5sb2dvIHtcbiAgICBoZWlnaHQ6IDIwMHB4O1xuICAgIHdpZHRoOiAyMDBweDtcbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkge1xuICAuYm9hcmRzLWNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBnYXA6IDUwcHg7XG4gIH1cblxuICAuc3RhdHVzLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDUwMHB4O1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzAwcHgpIHtcbiAgLmJvYXJkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xuICAgIGdhcDogMXB4O1xuICB9XG5cbiAgLmJvYXJkLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgfVxuXG4gIC5zdGF0dXMge1xuICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEyMDBweCkge1xuICAubmV3LWdhbWUge1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICBnYXA6IDMwcHg7XG4gIH1cblxuICAubmFtZSB7XG4gICAgZ2FwOiAzMHB4O1xuICB9XG5cbiAgLmVudGVyLW5hbWUge1xuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICB9XG5cbiAgLmJvYXJkLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSw4QkFBOEI7RUFDOUIsNENBQXVEO0FBQ3pEOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBOztFQUVFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLDREQUE0RDtFQUM1RDs7Ozs7O0dBTUM7QUFDSDs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLG1EQUFrRDtFQUNsRCxhQUFhO0VBQ2IsWUFBWTtFQUNaLHdCQUF3QjtFQUN4Qiw0QkFBNEI7RUFDNUIsY0FBYztFQUNkLGNBQWM7RUFDZCxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osY0FBYztFQUNkLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1o7Ozs7OztHQU1DO0FBQ0g7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7O0VBRUUsWUFBWTtFQUNaLGVBQWU7RUFDZixpQkFBaUI7RUFDakI7Ozs7OztHQU1DO0VBQ0QsY0FBYztFQUNkLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSxjQUFjO0VBQ2Q7Ozs7OztHQU1DO0FBQ0g7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxvQ0FBb0M7RUFDcEMsUUFBUTtBQUNWOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsbURBQThDO0VBQzlDLDRCQUE0QjtFQUM1Qix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxtREFBMkM7RUFDM0MsNEJBQTRCO0VBQzVCLHdCQUF3QjtBQUMxQjs7QUFFQTs7RUFFRSxtQkFBbUI7RUFDbkIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBOztFQUVFLHlCQUF5QjtFQUN6QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCOzs7Ozs7R0FNQztFQUNELGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0lBQ2IsWUFBWTtFQUNkO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLG1CQUFtQjtJQUNuQixTQUFTO0VBQ1g7O0VBRUE7SUFDRSxZQUFZO0lBQ1osZ0JBQWdCO0VBQ2xCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLHVDQUF1QztJQUN2QyxvQ0FBb0M7SUFDcEMsUUFBUTtFQUNWOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25CO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFlBQVk7SUFDWixTQUFTO0VBQ1g7O0VBRUE7SUFDRSxTQUFTO0VBQ1g7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnRUZDTyBCcm9va3NoaXJlJztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvZWZjby1icm9va3NoaXJlLXJlZ3VsYXIudHRmJyk7XFxufVxcblxcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1mYW1pbHk6ICdFRkNPIEJyb29rc2hpcmUnLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICA5MGRlZyxcXG4gICAgcmdiKDMxLCAzOCwgNjEpIDAlLFxcbiAgICByZ2IoNDcsIDYxLCA5OSkgMjklLFxcbiAgICByZ2IoNDMsIDU1LCA5MikgNzYlLFxcbiAgICByZ2IoMzEsIDM4LCA2MSkgMTAwJVxcbiAgKTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxufVxcblxcbi5sb2dvIHtcXG4gIGJhY2tncm91bmQ6IHVybCgnLi4vYXNzZXRzL2ltYWdlcy9icm93bi1sb2dvLnBuZycpO1xcbiAgaGVpZ2h0OiAxNzBweDtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblxcbm1haW4ge1xcbiAgcGFkZGluZzogMjBweCAwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ubmV3LWdhbWUge1xcbiAgbWFyZ2luLXRvcDogNjBweDtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLm5hbWUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi5lbnRlci1uYW1lIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG5cXG4ubmFtZS1pbnB1dCB7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMzBweDtcXG4gIGNvbG9yOiAjMzc0NzcyO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICA5MGRlZyxcXG4gICAgcmdiKDE1MiwgMTUyLCAxNDcpIDAlLFxcbiAgICByZ2IoMjQ0LCAyMzgsIDIwNSkgMTAlLFxcbiAgICByZ2IoMjQ0LCAyMzgsIDIwNSkgOTAlLFxcbiAgICByZ2IoMTUyLCAxNTIsIDE0NykgMTAwJVxcbiAgKTtcXG59XFxuXFxuLm5hbWUtaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLm5hbWUtaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbn1cXG5cXG4uc3RhcnQsXFxuLnJlc3RhcnQsIC5zaGlwLWRpcmVjdGlvbiB7XFxuICB3aWR0aDogMTAwcHg7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgOTBkZWcsXFxuICAgIHJnYigyMTksIDIwNiwgMTUwKSAwJSxcXG4gICAgcmdiKDI1NSwgMjQzLCAxODcpIDI5JSxcXG4gICAgcmdiKDI1NSwgMjQzLCAxODcpIDc2JSxcXG4gICAgcmdiKDIxOSwgMjA2LCAxNTApIDEwMCVcXG4gICk7XFxuICBjb2xvcjogIzRlNWY4ZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnN0YXJ0OmFjdGl2ZSxcXG4ucmVzdGFydDphY3RpdmUsIC5zaGlwLWRpcmVjdGlvbjphY3RpdmUge1xcbiAgY29sb3I6ICMzNzQ3NzI7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIDkwZGVnLFxcbiAgICByZ2IoMjU1LCAyNDMsIDE4NykgMCUsXFxuICAgIHJnYigyMTksIDIwNiwgMTUwKSAyOSUsXFxuICAgIHJnYigyMTksIDIwNiwgMTUwKSA3NiUsXFxuICAgIHJnYigyNTUsIDI0MywgMTg3KSAxMDAlXFxuICApO1xcbn1cXG5cXG4uYm9hcmRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMTVweDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuICBjb2xvcjogcmdiKDIzNywgMTk2LCAxMTUpO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMjU1LCAyNTMsIDI0NCk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDIwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDIwcHgpO1xcbiAgZ2FwOiAxcHg7XFxufVxcblxcbi5jZWxsLCAucGxhY2UtY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjU1LCAyNTMsIDI0NCk7XFxufVxcblxcbi5jb21wdXRlci1ib2FyZCAuY2VsbCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jb21wdXRlci1ib2FyZCAuY2VsbDpob3ZlciB7XFxuICBib3JkZXI6IDNweCBzb2xpZCByZ2IoMTMyLCAyMDUsIDcyKTtcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcbn1cXG5cXG4uY2FuLXBsYWNlIHtcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcbiAgYmFja2dyb3VuZDogcmdiYSgxNDMsIDIzMSwgNzEsIDAuNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQgLm9jY3VwaWVkLCAuYm9hcmQgLm9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigyMzcsIDE5NiwgMTE1KTtcXG59XFxuXFxuLm1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoJy4uL2Fzc2V0cy9pbWFnZXMvbWlzc2VkLnN2ZycpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuLmJvYXJkIC5oaXQge1xcbiAgYmFja2dyb3VuZDogdXJsKCcuLi9hc3NldHMvaW1hZ2VzL2hpdC5zdmcnKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxufVxcblxcbi5jb21wdXRlci1ib2FyZCAuaGl0OmhvdmVyLFxcbi5jb21wdXRlci1ib2FyZCAubWlzc2VkOmhvdmVyIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxuICBib3JkZXI6IDNweCBzb2xpZCByZWQ7XFxufVxcblxcbi5jYW4tbm90LXBsYWNlOmhvdmVyIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMCwgMCwgMC40KTtcXG59XFxuXFxuLnN0YXR1cy1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZDogcmdiYSg5NCwgMTE0LCAxNzAsIDAuNCk7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMjVweCA0MHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgbWFyZ2luOiAyMHB4IGF1dG8gMCBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAzMDBweDtcXG59XFxuXFxuLnN0YXR1cyB7XFxuICBmb250LXNpemU6IDEuMXJlbTtcXG59XFxuXFxuLnN0YXR1cyxcXG4uZW50ZXItbmFtZSB7XFxuICBjb2xvcjogcmdiKDIzNywgMTk2LCAxMTUpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5wIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmdhbWUtZW5kLW1lc3NhZ2Uge1xcbiAgY29sb3I6IHJnYigyMzcsIDE5NiwgMTE1KTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDEwMHB4O1xcbn1cXG5cXG4ucmVzdGFydCB7XFxuICBtYXJnaW4tdG9wOiAxMDBweDtcXG4gIHdpZHRoOiAxODBweDtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgcGFkZGluZzogMTBweCA1cHg7XFxufVxcblxcbi5wbGFjZS1zaGlwLWJvYXJkLXRpdGxlIHtcXG4gIGNvbG9yOiByZ2IoMjM3LCAxOTYsIDExNSk7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbn1cXG5cXG4uc2hpcC1kaXJlY3Rpb24ge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWluLWhlaWdodDogNDBweDtcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgOTBkZWcsXFxuICAgIHJnYigxNTIsIDE1MiwgMTQ3KSAwJSxcXG4gICAgcmdiKDI0NCwgMjM4LCAyMDUpIDI5JSxcXG4gICAgcmdiKDI0NCwgMjM4LCAyMDUpIDc2JSxcXG4gICAgcmdiKDE1MiwgMTUyLCAxNDcpIDEwMCVcXG4gICk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6ICMzNzQ3NzI7XFxufVxcblxcbmZvb3RlciBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjNTY2ZGFmO1xcbn1cXG5cXG5mb290ZXIgYTpob3ZlciB7XFxuICBjb2xvcjogIzMzNTFhMztcXG59XFxuXFxuZm9vdGVyIGE6YWN0aXZlIHtcXG4gIGNvbG9yOiAjNGY2NmE2O1xcbn1cXG5cXG4uY2xpY2thYmxlIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA1MDBweCkge1xcbiAgLmxvZ28ge1xcbiAgICBoZWlnaHQ6IDIwMHB4O1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAuYm9hcmRzLWNvbnRhaW5lciB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGdhcDogNTBweDtcXG4gIH1cXG5cXG4gIC5zdGF0dXMtY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCkge1xcbiAgLmJvYXJkIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgIGdhcDogMXB4O1xcbiAgfVxcblxcbiAgLmJvYXJkLXRpdGxlIHtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICB9XFxuXFxuICAuc3RhdHVzIHtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLm5ldy1nYW1lIHtcXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgICBnYXA6IDMwcHg7XFxuICB9XFxuXFxuICAubmFtZSB7XFxuICAgIGdhcDogMzBweDtcXG4gIH1cXG5cXG4gIC5lbnRlci1uYW1lIHtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICB9XFxuXFxuICAuYm9hcmQtdGl0bGUge1xcbiAgICBmb250LXNpemU6IDEuNnJlbTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImxpc3Rlbk9uRW5lbXlCb2FyZEF0dGFjayIsImxpc3Rlbk9uQ2VsbENsaWNrIiwiYXR0YWNrUGxheWVyQm9hcmQiLCJyZW5kZXJQbGFjaW5nU2hpcHNJbnRlcmZhY2UiLCJwbGF5ZXJCb2FyZCIsImF4aXMiLCJjbGVhck1haW4iLCJib2FyZENvbnRhaW5lciIsImNyZWF0ZUJvYXJkQ29udGFpbmVyIiwic2hpcERpcmVjdGlvbiIsImNyZWF0ZVNoaXBEaXJlY3Rpb25CdXR0b24iLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kIiwiYm9hcmRUaXRsZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ0ZXh0Q29udGVudCIsImJvYXJkIiwiaSIsImoiLCJjZWxsIiwic2V0QXR0cmlidXRlIiwiY29uY2F0IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJoYW5kbGVIaWdobGlnaHRpbmciLCJwbGF5ZXIiLCJjb29yZGluYXRlcyIsInBsYWNlU2hpcHNCb2FyZENvbnRhaW5lciIsImxlbmd0aCIsInNoaXAiLCJjYW5QbGFjZSIsImdhbWVib2FyZCIsImNhblBsYWNlU2hpcCIsImhpZ2hsaWdodFZhbGlkQ2VsbHMiLCJyZW1vdmUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJrIiwicmVtb3ZlQ2VsbEhpZ2hsaWdodGluZyIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJoYW5kbGVIb3ZlcmluZyIsImUiLCJudW1iZXJPZlNoaXBzTGVmdFRvUGxhY2UiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiZGF0YXNldCIsInNwbGl0IiwibWFwIiwibnVtYmVyIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiaW5uZXJIVE1MIiwicmVuZGVyU3RhdHVzIiwibmFtZSIsInN0YXR1c0NvbnRhaW5lciIsInN0YXR1cyIsInVwZGF0ZVN0YXR1cyIsInJlbmRlckJvYXJkcyIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInJlbmRlclBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZENvbnRhaW5lciIsInJlbmRlckNvbXB1dGVyQm9hcmQiLCJib2FyZHNDb250YWluZXIiLCJwbGF5ZXJCb2FyZFRpdGxlIiwicGxheWVyR2FtZUJvYXJkIiwiX2xvb3AiLCJfbG9vcDIiLCJtaXNzZWRBdHRhY2siLCJtaXNzZWRBdHRhY2tzIiwic29tZSIsImhpdCIsImNvbXB1dGVyQm9hcmRUaXRsZSIsImNvbXB1dGVyR2FtZUJvYXJkIiwiX2xvb3AzIiwiX2xvb3A0IiwidXBkYXRlR2FtZVZpZXciLCJjb21wdXRlciIsInBsYXllclR1cm4iLCJnYW1lT3ZlciIsImNyZWF0ZVJlc3RhcnRCdXR0b24iLCJyZXN0YXJ0QnV0dG9uIiwiYW5ub3VuY2VXaW5uZXIiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJtZXNzYWdlVGV4dCIsIm1lc3NhZ2UiLCJ0b2dnbGVFbmVteUJvYXJkSW50ZXJhY3Rpb24iLCJlbmVteUJvYXJkIiwidG9nZ2xlIiwiU2hpcCIsIl9HYW1lYm9hcmRfYnJhbmQiLCJXZWFrU2V0IiwiR2FtZWJvYXJkIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NsYXNzUHJpdmF0ZU1ldGhvZEluaXRTcGVjIiwiX2RlZmluZVByb3BlcnR5IiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsInNoaXBzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaGlwTGVuZ3RoIiwicGxhY2VTaGlwIiwicmVjZWl2ZUF0dGFjayIsIl9hc3NlcnRDbGFzc0JyYW5kIiwiX2lzT2NjdXBpZWQiLCJjYWxsIiwicHVzaCIsIl9hcmVWYWxpZENvb3JkaW5hdGVzIiwiYWxsU3VuayIsIl9hcmVBbGxTaGlwc1N1bmsiLCJldmVyeSIsImlzU3VuayIsImRlZmF1bHQiLCJjcmVhdGVQbGF5ZXJzIiwicGxhY2VTaGlwcyIsImZpbmRSYW5kb21VbmF0dGFja2VkQ2VsbCIsImlzQWxyZWFkeUF0dGFja2VkIiwiZGVsYXlSZW5kZXJpbmciLCJNYXRoIiwicmFuZG9tIiwiaGFuZGxlTmFtZUlucHV0IiwibmFtZUlucHV0IiwidHJpbSIsInRvTG93ZXJDYXNlIiwiX2NyZWF0ZVBsYXllcnMiLCJsaXN0ZW5PbkJvYXJkSG92ZXJpbmciLCJsaXN0ZW5PblNoaXBEaXJlY3Rpb25DaGFuZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRCdXR0b24iLCJoYW5kbGVFbmVteUJvYXJkQ2xpY2siLCJlbmVteUNlbGwiLCJoYW5kbGVBdHRhY2siLCJjb29yZGluYXRlc1RvQXR0YWNrIiwibGlzdGVuT25SZXN0YXJ0R2FtZUJ1dHRvbiIsInJlc3RhcnRHYW1lIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJoYW5kbGVDZWxsQ2xpY2siLCJwbGFjZWQiLCJQbGF5ZXIiLCJfY2xhc3NQcml2YXRlRmllbGRJbml0U3BlYyIsIl9oaXRzIiwiZ2V0IiwiX2NsYXNzUHJpdmF0ZUZpZWxkR2V0IiwiX2NsYXNzUHJpdmF0ZUZpZWxkU2V0IiwiX2dlbmVyYXRlUmFuZG9tQ29vcmRpIiwiZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcyIsIl9nZW5lcmF0ZVJhbmRvbUNvb3JkaTIiLCJmbG9vciIsImNvbnRhaW5zIiwiX2dlbmVyYXRlUmFuZG9tQ29vcmRpMyIsImFscmVhZHlBdHRhY2tlZCIsIl9nZW5lcmF0ZVJhbmRvbUNvb3JkaTQiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiXSwic291cmNlUm9vdCI6IiJ9