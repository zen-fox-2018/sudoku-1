"use strict"

// SUDOKU NAIVE

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.baseBoard = this.board();
    this.checkBoard = this.generateCheck();
  }

  solve() {
    for (let i = 0; i < this.baseBoard.length; i++) {
      for (let j = 0; j < this.baseBoard[i].length; j++) {
        for (let k = 1; k <= 9; k++) {
          if(this.checkV(j, k) && this.checkH(i, k) && this.checkB(i, j, k) && this.checkBoard[i][j] != -1) {
            this.baseBoard[i][j] = k;
            break;
          }
        }
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let myBoard = [];
    let newColumn = [];
    for (var i = 0; i < this.boardString.length; i++) {
      newColumn.push(+this.boardString[i]);
      if(newColumn.length === 9){
        myBoard.push(newColumn);
        newColumn = [];
      }
    }
    return myBoard;
  }

  generateCheck () {
    let myCheck = this.baseBoard.slice(0);
    myCheck =  myCheck.map( first => first.map( second => second === 0 ? 0 : -1 ));
    return myCheck;
  }


    checkH(row, number) {
      for (let j = 0; j < this.baseBoard.length; j++) {
        if(this.baseBoard[row][j] === number){
          return false;
        }
      }
      return true;
    }

    checkV(col, number) {
      for (let i = 0; i < this.baseBoard.length; i++) {
        if(this.baseBoard[i][col] === number){
          return false;
        }
      }
      return true;
    }

    checkB(row, col, number) {
      let startRow = Math.floor(row / 3);
      let startCol = Math.floor(col / 3);
      for (let i = startRow * 3; i < (startRow + 1) * 3; i++) {
        for (let j = startCol * 3; j < (startCol + 1) * 3; j++) {
          if(number === this.baseBoard[i][j]) {
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

console.log(game.board())
console.log();
console.log(game.baseBoard)
