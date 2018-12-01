"use strict"

class Sudoku {


  constructor(board_string) {
    this.boardGame = board_string;
    this.coordinates = [];
    this.sudokuBoard = this.board()
  }

  solve() {

    for(let i = 0; i < this.coordinates.length; i++) {

      let row = this.coordinates[i].row;
      let column = this.coordinates[i].column;

      while(true) {

        let horizontal = this.checkHorizontal(row, this.coordinates[i].value);
        let vertical = this.checkVertical(column, this.coordinates[i].value);
        let grid = this.checkGrid(row, column, this.coordinates[i].value);
    
        if (horizontal === true && vertical === true && grid === true) {
          this.sudokuBoard[row][column] = this.coordinates[i].value;
        } else {
          this.coordinates[i].value++;
        }
      }
    }
    return this.sudokuBoard;
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

    for(let i = 0; i < this.sudokuBoard.length; i++) {
      for(let j = 0; j < this.sudokuBoard[i].length; j++) {
        if (this.sudokuBoard[i][j] === 0) {
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

    for(let i = 0; i < this.sudokuBoard.length - 1; i++) {
      if(this.sudokuBoard[row][i] === number) { //---> horizontal
        return false
      }
    }
    return true
  }

  checkVertical(column, number) {

    for(let i = 0; i < this.sudokuBoard.length - 1; i++) {
      // console.log(sudokuBoard[i][0]) ---> vertical!
      if(this.sudokuBoard[i][column] === number) {
        return false
      }
    }
    return true
  }

  checkGrid(row, column, number) {

    //baris
    let startRow = Math.floor(row/3) * 3;
    let endRow = startRow + 2;

    //kolom
    let startCol = Math.floor(column/3) * 3;
    let endCol = startCol + 2;

    for(let i = startRow; i < endRow; i++) {
      for(let j = startCol; j < endCol; j++) {
        if (this.sudokuBoard[i][j] === number) {
          return false
        }
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
game.generateCoordinates();
console.log(game.solve())
// console.log(game.checkGrid(0, 1, 2));
// console.log(game.checkHorizontal(0, 2));
// console.log(game.checkVertical(0, 2))
// game.checkVertical();
