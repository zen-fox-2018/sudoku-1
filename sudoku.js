"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuBoard = this.board(board_string);
  }

  solve() {
    console.log(this.inputNumber())
  }

  // Returns a string representing the current state of the board
  board() {
    let theBoard = [];
    let index = 0
    for (let i = 0; i < 9; i++){
      let temp = [];
      for (let j = 0; j < 9; j++) {
        temp.push(board_string[index]);
        index++;
      }
      theBoard.push(temp);
    }
    return theBoard;
  }
  
  inputNumber() {
    // console.log(this.sudokuBoard)
    let trackCoordinate = {}
    for (let i = 0; i <= this.sudokuBoard.length-1; i++) {
      let row = i;
      for (let j = 0; j <= this.sudokuBoard.length-1; j++) {
        let column = j;
        while (this.sudokuBoard[i][j] === '0'){
          let numberStart = 0
          for (let k = numberStart; k <= 9; k++) {
            if (this.checkHorizontal(k.toString(), i) === true && this.checkVertical(k.toString(), j) === true && this.chekBlock(k.toString(), i, j) === true) {
              // console.log('+++')
              this.sudokuBoard[i][j] = k.toString();
              trackCoordinate[[i, j]] = [k]
              console.log(this.sudokuBoard)
            } 
          }
        }
      }
    }
    return this.sudokuBoard;
  }

 

  checkHorizontal(number, row) {
    // console.log(this.sudokuBoard[1])
    for (let i = 0; i <= this.sudokuBoard.length-1; i++) {
      if (number === this.sudokuBoard[row][i]) {
        return false;
      }
    }
    return true;
  }

  checkVertical(number, column) {
    for (let i = 0; i <= this.sudokuBoard.length-1; i++) {
      if (number === this.sudokuBoard[i][column]) {
        return false;
      }
    }
    return true;
  }
  
  chekBlock(number, row, column) {
    let rowStart = Math.floor(row / 3) * 3;
    let rowEnd = rowStart + 2;
    let colStart = Math.floor(column / 3) * 3;
    let colEnd = colStart + 2;
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        if (number === this.sudokuBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
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
game.solve()
// console.log(game.board())
// game.numberTracker()
