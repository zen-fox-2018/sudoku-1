"use strict"

class Sudoku {
  constructor(board_string) {
    this.input = board_string
    this.newBoard = this.board()
    this.zero = this.findZero()
  }

  solve() {
    let zero = this.zero
    let board = this.newBoard
    for (let i = 0; i < zero.length; i++) {
      let x = zero[i][0]
      let y = zero[i][1]
      let number = board[x][y] + 1
      while (!this.checkHorizontal(x, number) || !this.checkVerical(y, number) || !this.checkBlock([x, y], number)) {
        number++
      }
      if (number <= 9) {
        board[x][y] = number
      } else {
        board[x][y] = 0
        i -= 2
      }
      console.log(board);
      sleep(50)
      console.clear();
    }
    console.log(board);
  }

  // Returns a string representing the current state of the board
  board() {
    let str = this.input
    let result = []
    let count = 0
    for (let i = 0; i < 9; i++) {
      let row = []
      for (let j = 0; j < 9; j++) {
        row.push(Number(str[count]))
        count++
      }
      result.push(row)
    }
    return result
  }

  checkVerical(column, num) {
    let board = this.newBoard
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] === num) {
        return false
      }
    }
    return true
  }
// [0, 1]
  checkHorizontal(row, num) {
    let board = this.newBoard
    for (let j = 0; j < board.length; j++) {
      if (board[row][j] === num) {
        return false
      }
    }
    return true
  }

  checkBlock(coord, num) {
    let board = this.newBoard
    let xstart = 3 * (Math.floor(coord[0]/3))
    let ystart = 3 * (Math.floor(coord[1]/3))
    for (let i = xstart; i <= xstart+2; i++) {
      for (let j = ystart; j <= ystart+2; j++) {
        if (board[i][j] === num) {
          return false
        }
      }
    }
    return true
  }

  findZero() {
    let board = this.newBoard
    let result = []
    board.forEach((row, i) => {
      row.forEach((data, j) => {
        if (data === 0) {
          result.push([i, j])
        }
      });
    });
    return result
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[5]

var game = new Sudoku(board_string)
// Remember: this will just fill out what it can and not "guess"
game.solve()

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
