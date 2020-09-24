document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var board = {}




// var board = {
//   cells : [
//     {row:0, col:0, isMine:true, hidden: true}, 
//     {row:0, col:1, isMine:false, hidden: true}, 
//     {row:0, col:2, isMine:true, hidden: true},
//     {row:0, col:3, isMine:true, hidden: true},
//     {row:1, col:0, isMine:false, hidden: true},
//     {row:1, col:1, isMine:true, hidden: true}, 
//     {row:1, col:2, isMine:false, hidden: true},
//     {row:1, col:3, isMine:false, hidden: true},
//     {row:2, col:0, isMine:true, hidden: true},
//     {row:2, col:1, isMine:true, hidden: true}, 
//     {row:2, col:2, isMine:false, hidden: true},
//     {row:2, col:3, isMine:true, hidden: true},
//     {row:3, col:0, isMine:true, hidden: true},
//     {row:3, col:1, isMine:true, hidden: true}, 
//     {row:3, col:2, isMine:false, hidden: true},
//     {row:3, col:3, isMine:true, hidden: true}  
//   ]
// }


function startGame () {
  board = createBoard(4,10)
  document.addEventListener ("click", checkForWin)
  document.addEventListener ("contextmenu", checkForWin)

  for (i in board.cells){
    board.cells[i].surroundingMines = countSurroundingMines (board.cells[i])
  }


  lib.initBoard()

  console.log(board)
}


function checkForWin () {
  for (i = 0; i< board.cells.length; i++){ 
    if(board.cells[i].isMine && board.cells[i].isMarked){
      continue
    }
    else if(board.cells[i].isMine && !board.cells[i].isMarked){ 
      return
    }
    else if(board.cells[i].hidden){
      return
    }
  }

  console.log("all marked")
  lib.displayMessage('You win!')
}


function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  let count = 0
  for (i = 0; i < surrounding.length; i++){
    if (surrounding[i].isMine){
      count +=1
    
    }
  }
  return count

}


function createBoard (value = 4, bombs = (value*value/3)){
  clearBoard()
  let board = {
    cells:[]
  }
  // for(i = 0; i < (value * value); i++){
  //   board.cells.push({})
  // }
  let t = 0
  for (i = 0; i < value; i++){
    for (j = 0; j < value; j++){
      board.cells[t]={
        row:i, col:j, isMine:false, hidden: true
      }
      t++

    }
  }
  board = addBombs((value*value),bombs, board)

  return board
}

function addBombs(cells, bombs, board){
  let t = []
  for(i=0; i < bombs; i++){
    t.push(true)
  }
  for(i=0; i< (cells-bombs); i++){
    t.push(false)
  }
  // shuffle(t)

  t = (t.sort(() => Math.random() - 0.5))

  for(i=0; i<cells; i++){
    board.cells[i].isMine = t[i]
  }

 return board
}


function clearBoard(){
  document.querySelector(".board").innerHTML =""
}


function boardSize(value){
  board = createBoard(value)
  console.log(value)
  for (i in board.cells){
    board.cells[i].surroundingMines = countSurroundingMines (board.cells[i])
  }
  lib.initBoard()
}


function checkAllHidden(board){
  for(i=0 ; i < board.cells.length; i++){
    if (!board.cells[i].hidden){
      return false
    }
    return true
  } 
}