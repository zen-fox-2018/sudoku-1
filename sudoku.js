"use strict"

class Sudoku {
  constructor(board_string) {
    this.new = board_string
    this.angka = '123456789'
    this.sudoku = this.board()
    this.history = [{row: []}, {col : []} , {value: []}]
    this.inputHistory = this.checknol()
  }

  checknol () {
    for(let i = 0; i < this.sudoku.length; i++) {
      for(let j = 0; j < this.sudoku.length; j++) {
        if(this.sudoku[i][j] == 0){
          this.history[0].row.push(i)
          this.history[1].col.push(j)
        }
      }
    }
    return this.history
  }

  solve() {
    for(let i = 0; i < this.inputHistory[0].row.length; i++) {
      let k = 0
      while(true) {
        let row = this.inputHistory[0].row[i]
        let col = this.inputHistory[1].col[i]
        if(k <= 8 && this.checkHorizontal(row,this.angka[k]) == true && this.checkVertical(col,this.angka[k]) == true && this.checkGrid(row,col,this.angka[k])== true) {
          this.sudoku[row][col]= this.angka[k]
          this.inputHistory[2].value[i]= k
          break
        }else{
          k++
          if(k > 8) {
            this.sudoku[row][col] = '0'
            i -=1
            k = this.inputHistory[2].value[i]+1
          }
        }
      } 
    }
    return this.sudoku
  }
  // Returns a string representing the current state of the board
  board() {
    let row = []
    let k = 0
    for(let i = 0; i < 9; i++) {
      let col = []
      for(let j = 0; j < 9; j++) {
        col.push(this.new[k])
        k++
      }
      row.push(col)
    }
    return row
  }

  checkHorizontal(row,number) {
    for(let i = 0; i < this.sudoku.length; i++) {
     if(this.sudoku[row][i] == number) {
       return false
     }
    }
    return true
  }

  checkVertical(col, number) {
    for(let i = 0; i < this.sudoku.length; i++) {
      if(this.sudoku[i][col] == number) {
        return false
      }
    }
    return true
  }

  checkGrid (row, col, number) {
    let xStart = Math.floor(row/3)*3
    let yStart = Math.floor(col/3)*3
    for(let i = xStart; i < xStart+2; i++ ) {
      for(let j = yStart; j < yStart+2; j++) {
        if(this.sudoku[i][j] == number) {
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
// console.log(board_string)

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

console.log(game.solve())
// console.log(game.board());

// console.log(game.inputHistory)
// console.log(game.inputHistory[1].col[0])
// console.log(game.checkHorizontal(3,4))
// console.log(game.inputNumber())
// console.log(game.checkGrid(2,4,1));

