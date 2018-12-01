class Sudoku {
  constructor(board_string) {
    this.board_string=board_string
  }

    board() {
        var printBoard=[]
        var index=0
        for(let i=0; i<9; i++){
        var smallBoard=[]
            for(let j=0; j<9; j++){
                smallBoard.push(Number(this.board_string[index]))
                index++
            }
            printBoard.push(smallBoard)
        }
        return printBoard
    }

    checkCol(col, index, num){
        let colBoard = [];
        let arrCol = (pos, index) => pos.map(position => position[index])
        colBoard = arrCol(col, index)
        if (colBoard.indexOf(num) !== -1) {
            return false
        }
        return true
    }

    checkRow(row, num){
        if (row.indexOf(num) !== -1) {
            return false
        }
        return true
    }

    checkSquare(board, positionX, positionY, num){ //check square3x3
        let currentX = Math.floor(positionX / 3) * 3
        let currentY = Math.floor(positionY / 3) * 3
        for (let i = currentX; i < currentX+3; i++){
            for (let j = currentY; j < currentY+3; j++){
                if (board[i][j] === num){
                    return false
                }
            }
        }
        return true
    }

    solve(board){
        var start = 1
        var end = 9
        var backTrack = []
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board[i].length; j++){
                var isUnique = false
                if (board[i][j] === 0){
                    for (let x = start; x <= end; x++) {
                        if (this.checkRow(board[i], x)
                            && this.checkCol(board, j, x)
                            && this.checkSquare(board, i, j, x)){
                                board[i][j] = x
                                backTrack.push([i,j]) // bntuk jd nested array
                                isUnique = true
                                start = 1
                                break
                        }
                    }

                    if (isUnique === false){
                        var endCoor = backTrack.slice(-1)[0] // ambil arr backtrack yg pling akhir
                        backTrack.splice(backTrack.length-1) // ambil all array backtrack kecuali yg pling trakhir 
                        start = board[endCoor[0]][endCoor[1]] + 1 // start dimulai dari hasil index coordinator trakhir plus 1
                        i = endCoor[0]
                        j = endCoor[1] - 1
                        board[endCoor[0]][endCoor[1]] = 0
                    }
                }
            }
        }
        return board
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
game.board()
console.log("Before:")
console.log(game.board())
console.log("============================")

console.log("After:")
console.log(game.solve(game.board()))