"use strict"

class Sudoku {
  constructor(paramBoardString) {
    this.boardString = paramBoardString
    this.row = 9
    this.papan = this.board()
  }

  solve() {
    
    let historryArray=[]
    let tempNumber = 0
    for(let i = 0; i < this.papan.length; i++){
      for(let j = 0; j < this.papan[i].length; j++){
       
        // console.log(this.papan)
        // this.sleep(500)
        
        if(this.papan[i][j] == 0){
          
          let number = 1
          while(true && number <= 9){
            if(this.checkVertical(j,number) && this.checkHorizontal(i,number) && this.checkGrid(i,j,number)){
              //console.log(number,'===> ini masuk ')
              this.papan[i][j] = String(number)
              historryArray.push([i,j,number])
              tempNumber++
              //console.log(historryArray,tempNumber,'Ini History array dan number')
              break
            }
            else {
              while(tempNumber> 1 && (number >= 9)){
                // assign angka sebelumnya jadi 0 dan i j yang paling terakhir
                console.log(historryArray)
                
                this.papan[i][j] = '0' 
                i = historryArray[historryArray.length - 1][0]
                j = historryArray[historryArray.length - 1][1]
                number = historryArray[historryArray.length - 1][2] +1
                console.log(`>>> ini current i dan j ${i} ${j}`)
                historryArray = historryArray.slice(0 , historryArray.length - 1)    
                
                tempNumber--
                console.log( number,'ini Current number')
                console.log(tempNumber,'Ini temp number',historryArray.length,'Ini array length',)
                
                }
              console.log('While Stop')
              //break
             //tempNumber=0
            }
            number++
            if(number>9){
              number = 1
            }
          }
        }
        
      }
    }
    return this.papan
  }


  checkGrid(coorI,coorJ,number){
    for(let i = ~~(coorI / 3) * 3 ; i < ~~(coorI / 3) * 3 + 3; i++){
      for(let j = ~~(coorJ / 3) * 3; j < ~~(coorJ / 3) * 3 + 3; j++){
        //console.log(i,j,'===>Ini i dan j')
        if(this.papan[i][j] == number){
          return false
        }
      }
    }
    return true
  }
  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  checkVertical(coor,number) {
    for(let i = 0; i < this.papan.length; i++){
      if(this.papan[i][coor] == number){
        return false
      }
    }
    return true
  }
  checkHorizontal(coor,number) {
   for(let i = 0; i < this.papan.length ; i++){
     if(this.papan[coor][i] == number){
      return false
     }
   }
   return true
  }


  // Returns a string representing the current state of the board
  board() {
    let boardOutput = []
    let k=0
    for(let i =0; i < this.row ; i++){
      let boardOutputInside = []
      for(let j = 0; j < this.row ; j++){
        boardOutputInside.push(this.boardString[k])
        k++
      }
      boardOutput.push(boardOutputInside)
    }
    return boardOutput
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
//game.solve()

//console.log(game.board())
console.log(game.solve())

// console.log([1,2,3].slice(0,2))
