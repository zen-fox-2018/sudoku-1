"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.papanAwal = this.board()

  }

  solve() {
    let angkaSolve = 1
    for (let i = 0; i < this.papanAwal.length; i++) {
      for (let j = 0; j < this.papanAwal[i].length; j++) {
        if (this.papanAwal[i][j] === '#') {
          angkaSolve = 1
          while(angkaSolve < 10) {
            if (this.checkHorisontal(angkaSolve, i) && this.checkVertical(angkaSolve, j) && this.checkGrid(angkaSolve, i ,j) ) {
              console.log(`titik ${i},${j}, dari # menjadi ${String(angkaSolve)}`)
              this.papanAwal[i][j] = String(angkaSolve)
            }
            else {
              angkaSolve++
            }
          }
          
          
        }
      }
    }
    return this.papanAwal
  }

  //cek jika di horisontal sudah ada number maka false
  checkHorisontal(number, indeks_i) {
    // console.log(this.papanAwal, '================', indeks_i);    
    for (let j = 0; j < this.papanAwal[indeks_i].length; j++) {
      // console.log(number, 'ini number')
      // console.log(this.papanAwal[indeks_i][j], ' ini papan awal indeks i j ')
      if (number == this.papanAwal[indeks_i][j]) {
        return false
      }
    }
    return true
  }

  //cek jika di vertikal sudah ada number maka false
  checkVertical(number, indeks_j) {
    for (let i = 0; i < this.papanAwal.length; i++) {
      if (number == this.papanAwal[i][indeks_j]) {
        return false
      }
    }
    return true
  }

  //cek jika di grid sudah ada number maka false
  checkGrid(number, indeks_i, indeks_j) {
    let perhitungan_i = Math.floor(indeks_i / 3)
    let perhitungan_j = Math.floor(indeks_j / 3)
    let start_i = 0
    let end_i = 0
    let start_j = 0
    let end_j = 0
    if (perhitungan_i === 0) {
      start_i = 0
    }
    else if (perhitungan_i === 1) {
      start_i = 3
    }
    else {
      start_i = 6
    }
    end_i = start_i + 2

    if (perhitungan_j === 0) {
      start_j = 0
    }
    else if (perhitungan_j === 1) {
      start_j = 3
    }
    else {
      start_j = 6
    }
    end_j = start_j + 2
    // console.log ('start-i',start_i,'end-i', end_i)
    // console.log ('start-j',start_j,'end-j', end_j)
    for (let a = start_i; a < end_i; a++) {
      for (let b = start_j; b < end_j; b++) {
        if (number == this.papanAwal[a][b]) {
          return false
        }
      }
    }
    return true
  }

  // Returns a string representing the current state of the board
  board() {
    let papan = []
    for (let i = 0; i < 9; i++) {
      let papanDalam = []
      for (let j = 0; j < 9; j++) {
        let angka = this.string[j + i * 9]
        if (angka != 0) {
          papanDalam.push(angka)
        }
        else {
          papanDalam.push('#')
        }
      }
      papan.push(papanDalam)
    }
    return papan
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

// console.log(game)

// Remember: this will just fill out what it can and not "guess"


console.log(game.board())
console.log('--------')
console.log(game.solve())

// console.log('check horisontal nilai 1 di i = 0 ==>',game.checkHorisontal(1, 0))
// console.log('check horisontal nilai 3 di i = 0 ==>',game.checkHorisontal(3, 0))
// console.log('check vertical nilai 3 di j = 0 ==>',game.checkVertical(3, 0))
// console.log('check vertical nilai 1 di j = 0 ==>',game.checkVertical(1, 0))
// console.log('check grid nilai 3 di i = 5 j = 0 ==>', game.checkGrid(3, 5, 0))
// console.log('check grid nilai 9 di i = 0 j = 0 ==>', game.checkGrid(9, 0, 0))
// console.log(game.checkVertical(3, 0, 0))