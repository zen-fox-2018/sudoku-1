"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardGame = board_string;
    this.coordinates = [];
  }

  solve() {

  }

  // Returns a string representing the current state of the board
  board() {

    let sudokuBoard = this.boardGame;
    let arrBoard = [];
    let count = 0;

    for(let i = 0; i < 9; i++) {
      arrBoard.push([]);
      for(let j = 0; j < 9; j++) {
        arrBoard[i].push(Number(sudokuBoard[count]));
        count++;
      }
    }
    return arrBoard;
  }

  generateCoordinates() {

    let sudokuBoard = this.board();

    for(let i = 0; i < sudokuBoard.length; i++) {
      for(let j = 0; j < sudokuBoard[i].length; j++) {
        if (sudokuBoard[i][j] === 0) {
          let sudokuCoor = {
            row: i,
            column: j,
            value: 0
          }
          this.coordinates.push(sudokuCoor)
        }
      }
    }
  }

  checkHorizontal(row, number) {

    let sudokuBoard = this.board();

    for(let i = 0; i < sudokuBoard.length - 1; i++) {
      if(sudokuBoard[row][i] === number) { //---> horizontal
        return false
      }
    }
    return true
  }

  checkVertical(column, number) {

    let sudokuBoard = this.board();

    for(let i = 0; i < sudokuBoard.length - 1; i++) {
      // console.log(sudokuBoard[i][0]) ---> vertical!
      if(sudokuBoard[i][column] === number) {
        return false
      }
    }
    return true
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve();
game.generateCoordinates();

console.log(game.checkHorizontal(3, 6));
console.log(game.checkVertical(0, 2))
// game.checkVertical();
