"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.baseBoard = this.board();
    this.checkBoard = this.generateCheck();
  }

  solve() {
    for (let i = 0; i < this.checkBoard.length; i++) {
      let x = this.checkBoard[i].x;
      let y = this.checkBoard[i].y;
      let number = this.baseBoard[x][y] + 1;
      while(!this.checkSudoku(x , y, number)) {
        number++;
      }
      if(number <= 9) {
        this.baseBoard[x][y] = number;
      } else {
        this.baseBoard[x][y] = 0;
        i -= 2;
      }
      console.log(this.baseBoard);
      sleep(50);
      console.clear();
    }
    console.log(this.baseBoard);
  }

  // Returns a string representing the current state of the board
  board() {
    let myBoard = [];
    let newColumn = [];
    for (var i = 0; i < this.boardString.length; i++) {
      newColumn.push(+this.boardString[i]);
      if(newColumn.length === 9){
        myBoard.push(newColumn);
        newColumn = [];
      }
    }
    return myBoard;
  }

  generateCheck () {
    let myCheck = []
    for (let i = 0; i < this.baseBoard.length; i++) {
      for (let j = 0; j < this.baseBoard[i].length; j++) {
        if (this.baseBoard[i][j] === 0) {
          myCheck.push({x : i, y : j});
        }
      }
    }
    return myCheck;
  }

//CHECK DIPISAH

//   checkH(row, number) {
//     for (let j = 0; j < this.baseBoard.length; j++) {
//       if(this.baseBoard[row][j] === number){
//         return false;
//       }
//     }
//     return true;
//   }
//
//   checkV(col, number) {
//     for (let i = 0; i < this.baseBoard.length; i++) {
//       if(this.baseBoard[i][col] === number){
//         return false;
//       }
//     }
//     return true;
//   }
//
//   checkB(row, col, number) {
//     let startRow = Math.floor(row / 3);
//     let startCol = Math.floor(col / 3);
//     for (let i = startRow * 3; i < (startRow + 1) * 3; i++) {
//       for (let j = startCol * 3; j < (startCol + 1) * 3; j++) {
//         if(number === this.baseBoard[i][j]) {
//           return false;
//         }
//       }
//     }
//     return true;
//   }


//CHECK DIJADIKAN SATU
  checkSudoku (row, col, number) {
    for (let index = 0; index < this.baseBoard.length; index++) {
      //check Horizontal
      if(this.baseBoard[row][index] === number) {
        return false;
      }
      //check Vertical
      if(this.baseBoard[index][col] === number) {
        return false;
      }
    }

    //check Per Block
    let startRow = Math.floor(row / 3);
    let startCol = Math.floor(col / 3);
    for (let i = startRow * 3; i < (startRow + 1) * 3; i++) {
      for (let j = startCol * 3; j < (startCol + 1) * 3; j++) {
        if(number === this.baseBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]
let board_string = '200300080090000001006070400300800006010009070004020500700400200000006000050010009'
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
