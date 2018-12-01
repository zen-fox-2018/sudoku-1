"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string;
    this.num = '123456789';
    this.boardArr = this.board(board_string);
  }

  solve() {
    let arr = [];
    let indexNum = 0;
    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        if (this.boardArr[i][j] === 0) {
          while (!this.checkBox(this.num[indexNum], i, j) && !this.checkHorizontal(this.num[indexNum], i, j) && !this.checkVertical(this.num[indexNum], i, j)) {
            indexNum++;
          }
          this.boardArr[i][j] = Number(this.num[indexNum]);
        }
        // console.log(indexNum);
      }
    }
    return this.boardArr;
  }

  // Returns a string representing the current state of the board
  board(str) {
    var counter = 0;
    var result = [];
    for (var i = 0; i < 9; i++) {
      var hasil = [];
      for (var j = 0; j < 9; j++) {
        hasil.push(Number(str[counter]));
        counter++;
      }
      result.push(hasil);
    }
    // console.log(result);
    return result;
  }

  checkHorizontal(number, indexRow, indexCol) {
    //indexRow(i) === tetap; j++
    for (let j = 0; j < this.boardArr.length; j++) {
      if (this.boardArr[indexRow][j] === Number(number)) {
        return false;
      }
    }
    return true;
  }

  checkVertical(number, indexRow, indexCol) {
    //indexRow(i)++; j tetap
    for (let i = 0; i < this.boardArr.length; i++) {
      if (this.boardArr[i][indexCol] === Number(number)) {
        return false;
      }
    }
    return true;
  }

  checkBox(number, indexRow, indexCol) {
    //index(i) & index(j) === 3 random
    indexRow = Math.floor(indexRow / 3) * 3;
    indexCol = Math.floor(indexCol / 3) * 3;
    console.log(indexCol, indexRow, '========');

    for (let i = indexRow; i < indexRow + 2; i++) {
      var isSame = false;
      for (let j = indexCol; j < indexCol + 2; j++) {
        if (this.boardArr[i][j] === Number(number)) {
          return false;
        }
      }
      if (!isSame) {
        return true;
      }
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

// console.log(board_string);


var game = new Sudoku(board_string);
// console.log(game);

// Remember: this will just fill out what it can and not "guess"

console.log(game.solve())