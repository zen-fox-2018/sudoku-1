"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuBoard = this.board(board_string);
  }

  positionTracker() {
    let tracker = [];
    for (let i = 0; i <= this.sudokuBoard.length-1; i++) {
      for (let j = 0; j <= this.sudokuBoard[i].length-1; j++) {
        if (this.sudokuBoard[i][j] === '0') {
          tracker.push([i, j]);
        }
      }
    }
    return tracker;
  }

  solve() {
    let trackCoordinate = this.positionTracker()
    let i = 0;
    // console.log(trackCoordinate)
    while (i <= trackCoordinate.length-1) {
      debugger;
      // console.log(trackCoordinate[i])
      // console.log(trackCoordinate[i][1])
      let isSucceed = false;
      let numberStart = Number(this.sudokuBoard[trackCoordinate[i][0]][trackCoordinate[i][1]]);
      // console.log("====>", numberStart);
      for (let k = numberStart; k <= 10; k++) {
        if (k <= 9 && this.checkHorizontal(k.toString(), trackCoordinate[i][0]) === true && this.checkVertical(k.toString(), trackCoordinate[i][1]) === true && this.chekBlock(k.toString(), trackCoordinate[i][0], trackCoordinate[i][1]) === true) {
          // console.log('+++')
          this.sudokuBoard[trackCoordinate[i][0]][trackCoordinate[i][1]] = k.toString();
          isSucceed = true;
          break;
        } 
      }
      if (isSucceed === false) {
        this.sudokuBoard[trackCoordinate[i][0]][trackCoordinate[i][1]] = '0';
        i--;
      } else {
        i++;
      }
      // console.log(this.sudokuBoard)
    }
    console.log(this.sudokuBoard);
  }


  // Returns a string representing the current state of the board
  board() {
    let theBoard = [];
    let index = 0;
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

var game = new Sudoku(board_string);
// Remember: this will just fill out what it can and not "guess"
game.solve();
// console.log(game.board())
// game.numberTracker()
