//mohon koreksinya kakak. terima kasih :smile: 

"use strict"

class Sudoku {
    constructor(board_string) {
        this.papan = board_string
        this.board = this.board()
        this.posisiNol = []

    }


    // Returns a string representing the current state of the board
    board() {
        let papanSudoku = []
        let counterIndex = 0

        for (let i = 0; i < 9; i++) {
            let box = []
            for (let j = 0; j < 9; j++) {
                box.push(+this.papan[counterIndex])
                counterIndex++
            }
            papanSudoku.push(box)
        }
        return papanSudoku
    }

    cekH(x, y, value) {
        for (let i = 0; i < this.board[x].length; i++) {
            if (this.board[x][i] === value) {
                return false
            }
        }
        return true
    }

    cekV(x, y, value) {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i][y] === value) {
                return false
            }
        }
        return true
    }

    cekGrid(x, y, num) { //check square3x3
        let currentX = Math.floor(x / 3) * 3
        let currentY = Math.floor(y / 3) * 3
        for (let i = currentX; i < currentX + 3; i++) {
            for (let j = currentY; j < currentY + 3; j++) {
                if (this.board[i][j] === num) {
                    return false
                }
            }
        }
        return true
    }


    cekNol() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let koor = {
                    x: 0,
                    y: 0
                }

                if (this.board[i][j] == 0) {
                    koor.x = i
                    koor.y = j
                    this.posisiNol.push(koor)
                }
            }
        }
        return this.posisiNol
    }

    solve() {
        this.cekNol()
        // console.log(this.posisiNol);
        for (let i = 0; i < this.posisiNol.length; i++) {

            let x = this.posisiNol[i].x
            let y = this.posisiNol[i].y

            let number = this.board[x][y] + 1

            while (!this.cekH(x, y, number) || !this.cekV(x, y, number) || !this.cekGrid(x, y, number)) {
                number++
            }

            if (number <= 9) {
                this.board[x][y] = number
            } else {
                this.board[x][y] = 0
                i -= 2
            }

            console.log(this.board);
            sleep(100)
            console.clear()
        }
        console.log(this.board);


    }


}





// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]



var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

// console.log(game.board())
// console.log('ini papan ===> ' + '\n',game.board())
// console.log('ini object game ===>',game)

// console.log('ini cek Ho',game.cekH(0, 1, 1))

// console.log('ini cek Ve',game.cekV(0, 1, 9))

// console.log('ini cek Gr',game.cekGrid(0, 1, 1));

// console.log(game.cekNol())

// console.log(game.solve())






