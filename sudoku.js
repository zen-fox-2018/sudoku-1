"use strict"

class Sudoku {
  constructor(board_string) {
    // this.string = board_string;
    this.sudokuBoard = this.board(board_string);
    this.bakTrak = []
  }

  solve() {
    this.posisiO()
    this.backTrack()
    console.log(this.sudokuBoard);
  }

  // Returns a string representing the current state of the board
  board(string) {
    let output = []
    let counter = 0
    for (let i = 0 ; i < 9 ; i++){
      let insideArr = []
      for (let j = 0 ; j < 9 ; j++) {
        insideArr.push(+string[counter])
        counter++
      }
      output.push(insideArr)
    }
    return output
  }

  checkHnV(x, y, value) {
    for (let i = 0 ; i < this.sudokuBoard[x].length ; i++) {
      if (i !== y){
        if (value === this.sudokuBoard[x][i]) {
          return false
        }
      }

      if (i !== x) {
        if (value === this.sudokuBoard[i][y]) {
          return false
        }
      }
    }
    return true
  }

  checkGrid(x, y, value) {
    let startX = x - x % 3
    let startY = y - y % 3

    for (let i = startX ; i <= startX+2 ; i++) {
      for (let j = startY ; j <= startY+2 ; j++) {
        // console.log(this.sudokuBoard[startX+i][startY+j]);
          if (i !== x && j !== y) {
            if (value == this.sudokuBoard[i][j]) {
              return false
            }
          }
      }
    }
    return true
  }

  posisiO() {

    for (let i = 0 ; i < this.sudokuBoard.length ; i++) {
      for (let j = 0 ; j < this.sudokuBoard[i].length ; j++) {

        let obj = {}

        if (this.sudokuBoard[i][j] === 0) {
            obj.row = i
            obj.column = j
            obj.value = 0
        }

        if (Object.keys(obj).length > 0) {
          this.bakTrak.push(obj)
        }

      }
    }
  }

  backTrack(indexBT = 0) {
    for (let i = indexBT; i < this.bakTrak.length ; i++) {
      debugger;
      let x = this.bakTrak[i].row
      let y = this.bakTrak[i].column
      let number = this.sudokuBoard[x][y] + 1

      while (true) {
        if (this.checkHnV(x, y, number) && this.checkGrid(x, y, number)) {
          this.sudokuBoard[x][y] = number
          break;
        } else {
          number++
        }

      }

      if (number > 9) {
        number = 0
        this.sudokuBoard[x][y] = 0
        i = i - 2
      }
    }
    return true
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')

// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[7]


var game = new Sudoku(board_string)
// Remember: this will just fill out what it can and not "guess"


game.solve()
