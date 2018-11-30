"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.boards = this.board()
    this.space = this.checkSpace()
  }

  checkRow(row, value) {
    let condition = true
    for(let i = 0; i < this.boards.length; i++) {
      if(this.boards[row][i] === value) {
        condition = false
        // console.log(this.boards[row][i])
      }
    }
    // console.log(value)
    // console.log(condition)
    return condition
  }

  checkCol(col, value) {
    let condition = true
    for(let i = 0; i < this.boards.length; i++) {
      if(this.boards[i][col] === value) {``
        condition = false
      }
    }
    // console.log(condition)
    return condition
  }

  checkGrid(row, col, value){
    let condition =  true
    let rowStart = Math.floor(row/3) * 3
    let colStart = Math.floor(col/3) * 3
    for(let i = rowStart; i <= rowStart + 2; i++){
      for(let j = colStart; j <= colStart + 2; j++){
        if(this.boards[i][j] === value){
          condition = false 
        }
      }
    }
    return condition
  }

  checkSpace() {
    let arrSpace = []
    for(let i = 0; i < this.boards.length; i++) {
      for(let j = 0; j < this.boards[i].length; j++) {
        if(this.boards[i][j] === 0) {
          arrSpace.push({
            row: i,
            col: j,
            value: this.boards[i][j]
          })
        }
      }
    }
    return arrSpace
  }

  solve() {
    for(let i = 0; i < this.space.length; i++) {
      let row = this.space[i].row
      let col = this.space[i].col
      while(true) {
        if(this.checkRow(row, this.space[i].value) === true && this.checkCol(col, this.space[i].value) === true && this.checkGrid(row, col, this.space[i].value) === true) {
          this.boards[row][col] = this.space[i].value
          break 
        } else {
          this.space[i].value++
        }
      }
      
      //Backtracking
      if(this.space[i].value === 10) {
        this.space[i].value = 0
        this.boards[row][col] = this.space[i].value
        i -= 2
      }
      // this.sleep(500)
    }
    
    console.clear()
    console.log('===================================')
    console.log('========== SUDOKU SOLVER ==========')
    console.log('===================================')
    console.log(this.boards)
  }

  // Returns a string representing the current state of the board
  board() {
    let answer = this.board_string
    let board = []
    let counter = 0
    
    for(let i = 0; i < 9; i++) {
      let inner = []
      for(let j = 0; j < 9; j++) {
        inner.push(Number(answer[counter]))
        counter++
      }
      board.push(inner)
    }
    return board
  }

  sleep (milliseconds) {
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
  .split("\n")[1]

var game = new Sudoku(board_string)
// Remember: this will just fill out what it can and not "guess"
// game.sleep(500)
game.board()
game.solve()

// game.checkSpace()
// game.checkRow(0, 7)
// game.checkCol(0, 5)
// console.log(game.checkGrid(3, 0, 4))
// console.log(game.board())
