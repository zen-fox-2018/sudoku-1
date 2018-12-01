"use strict"

class Sudoku {
    constructor(board_string) {
        this.string = board_string
        this.myBoard = this.board();


    }

    //CEK BLOCK

    cekBlok(col, row, number) {
        // let row = 2
       // str = 
        if (row < 3) {
            row = Math.floor(row / 3)
        } else if (row >= 3 && row < 6) {
            row = Math.floor(row / 3)
        } else if (row >= 6 && row < 9) {
            row = Math.floor(row / 3)
        }

        if (col < 3) {
            col = Math.floor(row / 3)
        } else if (col >= 3 && col < 6) {
            col = Math.floor(col / 3)
        } else if (col >= 6 && col < 9) {
            col = Math.floor(col / 3)
        }

         for (let n = col; n < col + 3; n++) {
            for(let o = row; o < row +3; o++) {
                if(number === this.myBoard[n][o]){
                    return false
                }
            }
            return true
         }
         

      
    }

    //CEK VERTICAL
    cekVertical(col, number) {
        for (let m = 0; m < 9; m++) {
            if (number === this.myBoard[m][col]) {
                return false
            }
        }
        return true
    }
    // CEK HORIZONTAL
    cekHorizontal(row, number) {
        for (let j = 0; j < 9; j++) {
            if (number === this.myBoard[row][j]) {
                return false;
            }
        }
        return true;
    }
    solve() {}
    sleep(milliseconds) {
      let start = new Date().getTime();
      for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
          break;
        }
      }
    }

    solve() {
        let deretNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let cekAll = false
      //  while(!cekAll) {
        for (let i = 0; i < this.myBoard.length; i++) {
            for (let j = 0; j < this.myBoard[i].length; j++) {
                let temp = false
                if (this.myBoard[i][j] === '0') {
                 //   temp =true
                    for (let l = 0; l < deretNumber.length; l++) {
                        if(this.cekBlok(i, j, deretNumber[l]) && this.cekHorizontal(i , deretNumber[l]) && this.cekVertical(j,deretNumber[l])) {
                            this.myBoard[i][j] = deretNumber[l];
                            cekAll = true
                            break
                        }
                    }                   
                }
            }
        }
      //  }
    }
    // Returns a string representing the current state of the board
    board() {

        let hasil = []
        let k = 0
        for (let i = 0; i < 9; i++) {
            let hasilDalam = []
            for (let j = 0; j < 9; j++) {
                hasilDalam.push(this.string[k])
                k++
            }
            hasil.push(hasilDalam)
        }
        return hasil
    }


} //batas class

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
//game.cekBlok()
//ame.cekHorizontal()
console.log(game.board())
console.log(game.myBoard)