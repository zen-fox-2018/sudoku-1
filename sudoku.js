"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuString = board_string;
    this.sudokuBoard = this.board();
    this.zeroValue = this.checkZero();
    // console.log(typeof this.zeroValue);
  }


  solve() {
    for (let i = 0; i < this.zeroValue.length; i++) {
      // console.log(this.zeroValue[i]);
      let x = this.zeroValue[i].coordinateX;
      let y = this.zeroValue[i].coordinateY;
      let num = this.zeroValue[i].value;
      // console.log(i);
      while (this.allCheck(x,y,num) === false){
        num++;
        if (num <=9) {
          this.sudokuBoard[x][y] = num;
          this.zeroValue[i].value = num;
        }
        else{
          this.sudokuBoard[x][y] = 0;
          i -= 2
        }
      }
    }
    return this.sudokuBoard;
  }

  allCheck (x,y,num){
    if (this.horizontalCheck(y,num) === true && this.verticalCheck(x,num) === true && this.blockCheck(x,y,num) === true){
      return true;
    }
    else {
      return false;
    }
  }

  horizontalCheck (indexX, num) {
    for (let i = 0; i < this.sudokuBoard.length; i++) {
      if(this.sudokuBoard[i][indexX] === num) {
        return false;
      }
    }
    return true;
  }

  verticalCheck (indexY,num) {
    for (let i = 0; i < this.sudokuBoard.length; i++) {
      if (this.sudokuBoard[indexY][i] === num) {
        return false;
      }
    }
    return true;
  }

  blockCheck  (indexX,indexY,num){
    let startX = (Math.floor(indexX/3)) * 3;
    let stopX = startX + 2;
    let startY = (Math.floor(indexY/3)) * 3;
    let stopY = startY +2;
    for (let i = startY; i < stopY; i++) {
      for (let j = startX; j < stopX; j++) {
        if (this.sudokuBoard[i][j] === num){
          return false;
        }
      }
    }
    return true;
  }

  checkZero(){
    var papanSudoku = this.sudokuBoard;
    // console.log(papanSudoku);
    var result = [];
    for (let i = 0; i < papanSudoku.length; i++) {
      for (let j = 0; j < papanSudoku[i].length; j++) {
        if (papanSudoku[i][j] === '0') {
          var obj = {
            coordinateX : j,
            coordinateY : i,
            value : papanSudoku[i][j]
          }
        }
        result.push(obj);
      }
    }
    console.log(result);
    return result;
  }

  // Returns a string representing the current state of the board
  board() {
    var result = [];
    for (let i = 0; i < 9; i++) {
      var isi = [];
      for (let j = 0; j < 9; j++) {
        isi.push(this.sudokuString[(i*9)+j]);
      }
      result.push(isi);
    }
    return result;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// console.log(game);
console.log(game.solve());
// Remember: this will just fill out what it can and not "guess"
// game.solve()
// console.log(game);
// console.log(game.board())
