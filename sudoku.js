"use strict"

class Sudoku {
  constructor(board_string) {
    this.puzzle = board_string.split('')
    this.papan = [[]]
  }

  solve() {
    let nilai = this.cek0()
    // console.log(nilai)
    for (let i = 0 ; i < nilai.length ; i++) {
      let temp = nilai[i]
      while (true) {
        // let indexi = nilai[i].i
        // let indexj = nilai[i].j
        // let value = nilai[i].value
        if (this.papan[temp.i].findIndex(x => x === temp.value) === -1 && this.cekVer(temp.value, temp.j) && this.cekGrid(temp.value , temp.i , temp.j)) {
          this.papan[temp.i][temp.j] = temp.value
          break
        } else {
          temp.value++
        }
      }
      if (temp.value > 9) {          
        temp.value = 0
        this.papan[temp.i][temp.j] = temp.value
        i = i-2
      }
    }
    return this.papan
  }

  cek0() {
    let nilai = []
    this.papan.forEach((arr,i) => {
      arr.forEach((x, j) =>{
        if(x == 0) { 
          nilai.push({ value: 1, i: i, j:j})
        }   
      })
    })
    return nilai
  }


  cekVer(num , j) {
    for (let i = 0; i < 9; i++) {
      if (this.papan[i][j] === num) return false
    }
    return true
  }

  cekGrid(num , i, j) {
    let istart = 3 * (Math.floor(i/3))
    let iend = istart +2
    let jstart = 3 * (Math.floor(j/3))
    let jend = jstart + 2

    for (let i = istart; i <= iend; i++) {
      for (let j = jstart; j <= jend; j++) {
        if (this.papan[i][j] === num) return false
      }      
    }
    return true       
  }

  board() {
    if (this.papan[0].length == 0) {
      this.puzzle.forEach(char => {
        if (this.papan[this.papan.length-1].length < 9) {
          this.papan[this.papan.length-1].push(Number(char))
        } else {
          this.papan.push([Number(char)])
        }
      });
    }
    return this.papan
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[Math.floor(Math.random() *50)]

var game = new Sudoku(board_string)
console.log(game.board())
console.log('ANSWER ====================== ANSWER')
console.log(game.solve())



