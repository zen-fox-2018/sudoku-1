"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.coordinate = []
    this.sudokuBoard = this.board()
  }

  solve() {
    this.search()
    for (let i = 0; i < this.coordinate.length; i++) {
      let row = this.coordinate[i].row
      let col = this.coordinate[i].col
      while (true) {
        if (this.coordinate[i].value > 9) {
          this.sudokuBoard[row][col] = 0
          this.coordinate[i].value = 0
          i = i-2
          break
        }
        if (this.checkHorizontal(row, col, this.coordinate[i].value) && this.checkVertical(row, col, this.coordinate[i].value) && this.checkGrid(row, col, this.coordinate[i].value)) {
          this.sudokuBoard[row][col] = this.coordinate[i].value
          break
        }
        else {
          this.coordinate[i].value = this.coordinate[i].value + 1
        }
      }
    }
    return console.log(this.sudokuBoard);
  }

  // Returns a string representing the current state of the board
  board() {
    let array = []
    let count = 0
    for (let i = 0; i < 9; i++) {
      let arrayTemp = []
      for (let j = 0; j < 9; j++) {
        arrayTemp.push(Number(this.string[count]))
        count++
      }
      array.push(arrayTemp)
    }
    return array
  }

  search() {
    for (let i = 0; i < this.sudokuBoard.length; i++) {
      for (let j = 0; j < this.sudokuBoard[i].length; j++) {
        if (this.sudokuBoard[i][j] === 0) {
          let obj = {
            row: i,
            col: j,
            value: 0
          }
          this.coordinate.push(obj)
        }
      }
    }
  }

  checkHorizontal(row, col, value) {
    for (let i = 0; i < this.sudokuBoard[row].length; i++) {
      if (this.sudokuBoard[row][i] === value) {
        return false
      }
    }
    return true
  }

  checkVertical(row, col, value) {
    for (let i = 0; i < this.sudokuBoard.length; i++) {
      if (this.sudokuBoard[i][col] === value) {
        return false
      }
    }
    return true
  }

  checkGrid(row, col, value) {
    let rowStart = Math.floor(row/3)*3
    let rowEnd = rowStart + 2

    let colStart = Math.floor(col/3)*3
    let colEnd = colStart + 2

    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        if (this.sudokuBoard[i][j] === value) {
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
console.log("Sudoku unsolved");
console.log(game.board())
console.log("\n");
console.log("Sudoku solved");
game.solve()


// game.search()
