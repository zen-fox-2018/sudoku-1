"use strict"

class Sudoku {
  constructor(board_string) {
    this.defaultBoard = board_string
    this.result = []
    this.empty = []
  }

  solve() {
    this.board()
    let val = this.randomNumber()

    for (let i = 0; i < this.result.length; i++) {
      for (let j = 0; j < this.result[i].length; j++) {

        //BACKTRACK
        if (this.result[i][j] == 0) {
          this.empty.push({
            row: i,
            col: j,
            val: 0
          })

        }
      }
    }

    for (let i = 0; i < this.empty.length; i++) {
      let row = this.empty[i].row
      let col = this.empty[i].col
      let val = this.empty[i].val
      
      while (true) {
        if (val > 9) {
          this.result[row][col] = 0
          this.empty[i].val = 0
          i -= 2
          break;
        }
        if (this.checkGrid(row, col, val) && this.checkHorizontal(this.result[row], val) && this.checkVertical(col, val)) {
          this.result[row][col] = val
          this.empty[i].val = val
          break;
        } else {
          val++
        }
      } 
    }
    console.clear()
    console.log(this.result);
    return this.result
  }

  // Returns a string representing the current state of the board
  board() {
    let arrBoard = []
    for (let i = 0; i < Math.pow(9, 2); i++) {
      arrBoard.push(Number(this.defaultBoard[i]))
      if (arrBoard.length == 9) {
        this.result.push(arrBoard)
        arrBoard = []
      }
    }
  }

  checkVertical(collumn, number) {
    for (let i = 0; i < this.result.length; i++) {
      for (let j = 0; j < this.result[i].length; j++) {
        if (j == collumn && this.result[i][j] == number) {
          return false
        }
      }
    }
    return true
  }

  checkHorizontal(horizontalLine, number) {
    for (let i = 0; i < horizontalLine.length; i++) {
      if (horizontalLine[i] == number) {
        return false
      }
    }
    return true
  }

  checkGrid(startX, startY, gridNumber) {
    let x = Math.floor(startX / 3) * 3
    let y = Math.floor(startY / 3) * 3

    for (let i = x; i <= (x + 2); i++) {
      for (let j = y; j <= (y + 2); j++) {
        if (this.result[i][j] == gridNumber) {
          return false
        }
      }
    }
    return true
  }

  randomNumber() {
    return Math.floor(Math.random() * 9 + 1)
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
