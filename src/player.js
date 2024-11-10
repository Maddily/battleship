import Gameboard from "./gameboard.js"

export default class Player {
  constructor(name = 'Computer') {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
