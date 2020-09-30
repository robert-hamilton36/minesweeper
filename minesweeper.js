document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var board = {}

let boardSize = 4
let numberOfMines = (boardSize*boardSize/3)




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
  board = createBoard(boardSize,numberOfMines)
  createMineOptions()
  document.addEventListener ("click", checkForWin)
  document.addEventListener ("contextmenu", checkForWin)
  // document.addEventListener ("submit", howManyMines(this.value))

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


// function createBoard (value = 4, bombs = (value*value/3)){
function createBoard (value , bombs){
  clearBoard()

  value = value || boardSize
  bombs = bombs || (value*value/3)

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


function changeBoardSize(value){
  console.log(boardSize)
  boardSize = value
  console.log(boardSize)
  board = createBoard(value)
  console.log(value)
  for (i in board.cells){
    board.cells[i].surroundingMines = countSurroundingMines (board.cells[i])
  }
  createMineOptions(value)
  lib.initBoard()
}

function restart(){
  board=createBoard(boardSize, numberOfMines)
  for (i in board.cells){
    board.cells[i].surroundingMines = countSurroundingMines (board.cells[i])
  }
  lib.initBoard()
  return 
}


function checkAllHidden(board){
  for(i=0 ; i < board.cells.length; i++){
    if (!board.cells[i].hidden){
      return false
    }
    return true
  } 
}

function chooseMine(){
  difficulty((boardSize*boardSize/3))
  var checkBox = document.getElementById("mineChoice")

  var mineEntry = document.getElementById("mineEntryField")

  if(checkBox.checked == true){
    mineEntry.style.display = "inline-block";
  } else {
    mineEntry.style.display = "none";
  }

}

function howManyMines(value){
  console.log("this worked")
  numberOfMines = value
  console.log(numberOfMines)
  restart()
  board = createBoard(boardSize, numberOfMines)
  lib.initBoard()
}


function createMineOptions(value){

  console.log("changing" + value)
  let element = document.getElementById("mineValue");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for(var i = 0; i < (boardSize*boardSize); i++){
    var opt = document.createElement('option');
    if(i+1 == value){
      opt.selected = "selected"
    }
    opt.value = i+1;
    opt.innerHTML = i+1;
    document.getElementById('mineValue').appendChild(opt);
  }


}

function difficulty(value){
  console.log(value)
  numberOfMines = value
  console.log
  clearBoard()
  board = createBoard(boardSize, numberOfMines)
  for (i in board.cells){
    board.cells[i].surroundingMines = countSurroundingMines (board.cells[i])
  }
  createMineOptions(value)
  lib.initBoard()
  console.log(numberOfMines+" mines")

}