"use strict"

class Sudoku {
  constructor(board_string) {
    this.papan = this.generateBoard(board_string);
  }

  solve() {
    // let acakAngkaIndex = this.randomNum()
    let index0Collections = this.collectingIndexOf0()
    for (let i = 0; i < index0Collections.length; i++) {
      let angkaIncrementer = this.papan[index0Collections[i][0]][index0Collections[i][1]] + 1
      while (!this.horizontalChecker(index0Collections[i][0], angkaIncrementer) || !this.verticalChecker(index0Collections[i][1], angkaIncrementer) || !this.blockChecker(index0Collections[i][0], index0Collections[i][1], angkaIncrementer)) {
          angkaIncrementer++  
      }
      if (angkaIncrementer <= 9) {
        this.papan[index0Collections[i][0]][index0Collections[i][1]] = angkaIncrementer
      }
      else {
        this.papan[index0Collections[i][0]][index0Collections[i][1]] = 0
        i -= 2
      }
      console.log(this.papan);
      this.sleep(100)
      console.clear()
    }

    //versi sebelum ada backtrack
    // for (let i = 0; i < this.papan.length; i++) {
    //   for (let j = 0; j < this.papan[i].length; j++) {
    //     let angkaIncrementer = 1
    //     if (this.papan[i][j] === 0) {
    //       while (angkaIncrementer < 10) {
    //         if (this.horizontalChecker(i, angkaIncrementer) && this.verticalChecker(j, angkaIncrementer) && this.blockChecker(i, j, angkaIncrementer)) {
    //           this.papan[i][j] = angkaIncrementer
    //           break;
    //         }
    //         angkaIncrementer++
    //       }
    //     }
    //   }
    // }
    // console.log(index0Collections);
    return this.papan
  }
  
  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  cekAngka(num) {
    let angka = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = 0; i < angka.length; i++) {
      if (num === angka[i]) {
        return true
      }
    }
    return false
  }

  collectingIndexOf0() {
    let index0 = []
    for (let i = 0; i < this.papan.length; i++) {
      for (let j = 0; j < this.papan[i].length; j++) {
        if (this.papan[i][j] === 0) {
          index0.push([i, j])
        } 
      }
    }
    return index0
  }

  // Returns a string representing the current state of the board
  generateBoard(str) {
    let finalBoard = []
    let boardLine = []
    for (let i = 0; i <= str.length; i++) {
      if (boardLine.length < 9) {
        boardLine.push(+str[i])
      }
      else {
        finalBoard.push(boardLine)
        boardLine = []
        boardLine.push(+str[i])
      }
    }
    return finalBoard
  }

  horizontalChecker(row, num) {
    for (let i = 0; i < this.papan.length; i++) {
      if (this.papan[row][i] === num) {
        return false
      }
    }
    return true
  }

  verticalChecker(col, num) {
    for (let i = 0; i < this.papan.length; i++) {
      if (this.papan[i][col] === num) {
        return false
      }
    }
    return true
  }

  blockChecker(start, limit, num) {
    let newX = Math.floor(start / 3) * 3
    let endX = Math.floor(start / 3) * 3 + 2
    let newY = Math.floor(limit / 3) * 3
    let endY = Math.floor(limit / 3) * 3 + 2
    for (let i = newX; i <= endX; i++) {
      for (let j = newY; j <= endY; j++) {
        if (this.papan[i][j] === num) {
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
console.log(game);
console.log(game.solve());

// Remember: this will just fill out what it can and not "guess"