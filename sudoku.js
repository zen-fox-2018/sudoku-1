"use strict"

class Sudoku {
  constructor(board_string) {
    this.getNumber = board_string
    this.mainBoard = this.board()
  }

  solve() {
    var unsolvedBoard = this.findZeroIndex()

    for (let i = 0; i < unsolvedBoard.length; i++) {
      var isValid = false;
      for (let j = 1; j <= 9; j++) {
        var row = unsolvedBoard[i].coordinate[0];
        var col = unsolvedBoard[i].coordinate[1];
        // debugger;
        if (this.checkValue(col, row, j)) {
          this.mainBoard[row][col] = j
          unsolvedBoard[i].value = j
          isValid = true
          break;
        }
        if (!isValid && j == 9) {
          this.mainBoard[row][col] = 0
          i--
          j = unsolvedBoard[i].value - 1;
        }
      }
      console.log(game.mainBoard);
      console.clear();
      console.log(game.mainBoard);
      this.sleep(200);
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let generateNumber = this.getNumber.match(/.{1,9}/g);
    let generateBoard = [];

    for (let i = 0; i < generateNumber.length; i++) {
      let miniBoard = [];
      for (let j = 0; j < generateNumber[i].length; j++) {
        miniBoard.push(+generateNumber[i][j])
      }
      generateBoard.push(miniBoard)
    }
    return generateBoard
  }

  findZeroIndex() {
    let getCoordinate = []

    for (let i = 0; i < this.mainBoard.length; i++) {
      for (let j = 0; j < this.mainBoard[i].length; j++) {
        let getData = {}
        if (this.mainBoard[i][j] === 0) {
          getData.coordinate = [i, j]
          getData.value = this.mainBoard[i][j]
          getCoordinate.push(getData)
        }
      }
    }
    return getCoordinate
  }

  checkRow(row, value) {
    for (let i = 0; i < this.mainBoard.length; i++) {
      // console.log(this.mainBoard[row][i]);
      if (this.mainBoard[row][i] === value) {
        return false
      }
    }
    return true
  }

  checkCol(col, value) {
    for (let i = 0; i < this.mainBoard.length; i++) {
      // console.log(this.mainBoard[i][col]);
      if (this.mainBoard[i][col] === value) {
        return false
      }
    }
    return true
  }

  checkBox(row, col, value) {
    let X = Math.floor(row / 3) * 3;
    let Y = Math.floor(col / 3) * 3;

    for (let i = X; i < X + 3; i++) {
      for (let j = Y; j < Y + 3; j++) {
        if (this.mainBoard[i][j] === value) {
          return false
        }
      }
    }
    return true
  }

  checkValue(col, row, value) {
    if (this.checkRow(row, value) && this.checkCol(col, value) && this.checkBox(row, col, value)) {
      return true
    } else {
      return false
    }
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
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
// console.log(game.findZeroIndex());
