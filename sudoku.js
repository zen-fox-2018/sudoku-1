"use strict"

class Sudoku {
  constructor(board_string) {
    this.fixboard = this.board(board_string)
    this.zero  = this.findZero()
  }

  solve() {
    
    for (let i = 0 ; i < this.zero.length; i++) {
      let obj = this.zero[i]
      while(true) {
        let horizontal = this.horizontal(obj.value,obj.col)
        let vertikal = this.vertikal(obj.value,obj.row)
        let grid = this.grid(obj.value,obj.col,obj.row)
        if(grid === true && horizontal === -1 && vertikal === true) {
         this.fixboard[obj.col][obj.row] = obj.value
         break;
        } else {
          obj.value++
        }
      }
      if(obj.value > 9) {
        obj.value = 0
        this.fixboard[obj.col][obj.row] = obj.value
        i = i-2
      }

    }
        
          // console.log(num)
    
    return this.fixboard
  }

  horizontal(num,i) {
    let check = this.fixboard[i].findIndex(x => {
      return x === num
    })
    return check
  }

  vertikal(num,j) {
    for (let col = 0 ; col < 9 ; col++) {
      if(this.fixboard[col][j] === num) {
        return false
      }
    }
    return true
  }

  findZero() {
    let data = []
    this.fixboard.forEach((arr,i) => {
      arr.forEach((num,j) =>{
        if(num === 0) {
          let obj =  {
            col:i,
            row:j,
            value:1
          }
          data.push(obj)
          // console.log(data)
        }
      })
    })
   return data
  }

  grid(num,i,j) {
    let xstart = 3*(Math.floor(i/3))
    let xend = xstart+2
    let ystart = 3*(Math.floor(j/3))
    let yend = ystart+2
    // console.log(xstart,xend,ystart,yend)
    for (let i = xstart ; i <= xend ; i++) {
      for (let j = ystart ; j <= yend ; j++) {
          if (this.fixboard[i][j] === num) {
            return false
          }
      }
    }
    return true

  }
 
  // Returns a string representing the current state of the board
  board() {
    let board = [[]]
    for (let i = 0 ;i < board_string.length ; i++) {
      if(board[board.length-1].length < 9) {
        board[board.length-1].push(Number(board_string[i]))
      }else{
        board.push([Number(board_string[i])])
      }
    }
    return board
  }
   

  
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[Math.floor(Math.random()*50)]

var game = new Sudoku(board_string)
// game.board
console.log(`Board Awal`)
console.log(game.fixboard)
console.log("========================================")
// Remember: this will just fill out what it can and not "guess"
console.log(`Board Akhir`)
console.log(game.solve())
// console.log(game.zero)


// console.log(game.fixboard)
