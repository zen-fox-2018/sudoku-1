"use strict"

class Sudoku {
  constructor(board_string) {
    this.strBoard = board_string
  }

  sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  solve() {
    // let existedNumber = []

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board()[i][j] === 0) {

        }
      }
    }
  }

  // Returns a string representing the current state of the board
  defaultBoard() {
    let arrBoard = []

    for (let i = 0; i < 9; i++) {
      let arrRow = []
      for (let j = 0; j < 9; j++) {
        arrRow.push(Number(this.strBoard[j + i * 9]))
      }
      arrBoard.push(arrRow)
    }



    return arrBoard
  }

  checkGrid(playBoard, i, j, k) {
    let startX = i - (i % 3)
    let startY = j - (j % 3)
    let endX = startX + 2
    let endY = startY + 2

    for (let l = startX; l <= endX; l++) {
      for (let m = startY; m <= endY; m++) {
        if (playBoard[startX][startY] === k) {
          return true
        }
      }
    }

    return false
  }

  printNumber(playBoard, i, j, k) {
    let isExisted = true

    while (isExisted) {
      isExisted = false
      k++

      for (let l = 0; l < 9; l++) {
        if (playBoard[i][l] === k || playBoard[l][j] === k || this.checkGrid(playBoard, i, j, k)) {
          isExisted = true
        }
      }

    }
    if (k > 9) {
      return 0
    } else {
      return k
    }
  }

  play(playBoard) {
    if (playBoard === undefined) {
      playBoard = this.defaultBoard()
    }

    let arrIndexZero = []

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (playBoard[i][j] === 0) {
          playBoard[i][j] = this.printNumber(playBoard, i, j, 0)
          arrIndexZero.push([i, j])
        }
      }
    }

    return playBoard
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

console.log(game.play())
