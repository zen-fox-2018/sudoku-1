"use strict"

class Sudoku {
  constructor(board_string) {
    this.num = '123456789';
    this.boardArr = this.board(board_string);
  }

  solve() {
    let emptyPos = this.savePosition();
    for (let i = 0; i < emptyPos.length; i++) {
      let x = emptyPos[i][0];
      let y = emptyPos[i][1];
      let isSolved = true;
      let num = this.boardArr[x][y] + 1;
      if (num > 9) {
        isSolved = false;
        i -=2;
        this.boardArr[x][y] = 0;
      }
      while (!this.checkAllCondition(num, x, y)) {
        num++;
        if (num > 9) {
          isSolved = false;
          i -=2;
          this.boardArr[x][y] = 0;
          break;
        }
      }
      console.log(num, '=========', i);
      if (isSolved) {
        this.boardArr[x][y] = num;
      }
      if (i < -1) {
        break;
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

  checkHorizontal(number, indexRow) {
    //indexRow(i) === tetap; j++
    for (let j = 0; j < this.boardArr.length; j++) {
      if (this.boardArr[indexRow][j] === number) {
        return false;
      }
    }
    return true;
  }

  checkVertical(number, indexCol) {
    //indexRow(i)++; j tetap
    for (let i = 0; i < this.boardArr.length; i++) {
      if (this.boardArr[i][indexCol] === number) {
        return false;
      }
    }
    return true;
  }

  checkBox(number, indexRow, indexCol) {
    //index(i) & index(j) === 3 random
    indexRow = Math.floor(indexRow / 3) * 3;
    indexCol = Math.floor(indexCol / 3) * 3;

    for (let i = indexRow; i < indexRow + 3; i++) {
      var isSame = false;
      for (let j = indexCol; j < indexCol + 3; j++) {
        if (this.boardArr[i][j] === number) {
          return false;
        }
      }
    }
    if (!isSame) {
      return true;
    }
  }

  checkAllCondition(number, indexRow, indexCol) {
    if (!this.checkBox(number, indexRow, indexCol) || !this.checkHorizontal(number, indexRow) ||
      !this.checkVertical(number, indexCol)) {
      return false;
    }
    return true;
  }

  savePosition() {
    let arr = [];
    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        if (this.boardArr[i][j] === 0) {
          arr.push([i, j]);
        }
      }
    }
    return arr;
  }

  sleep(milliseconds) {
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
  .split("\n")[0]

// console.log(board_string);


var game = new Sudoku(board_string);
// console.log(game);

// Remember: this will just fill out what it can and not "guess"

console.log(game.solve());
// console.log('\n');
// console.log(game.board(board_string));
// console.log(game.checkBox(4, 0, 1));