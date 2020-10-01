document.addEventListener('DOMContentLoaded', startGame)


var board = {
}

let boardSize = 4
let numberOfBombs = (boardSize*boardSize/3)


function startGame () {
  board = createBoard(boardSize, numberOfBombs)
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)

  for(var i of board.cells){
    i.surroundingMines = countSurroundingMines(i)
  }
 
  lib.initBoard()
}

// Function to check win conditions
// Used in startGame eventlisteners

function checkForWin () {
  for(x of board.cells){
    if(x.isMine && x.isMarked){
      continue
    }else if(x.isMine && !x.isMarked){
      return
    }else if(x.hidden){
      return
    }
  }
  lib.displayMessage('You win!')
}

//function that counts number of cells that are mines around everycell in game. Called in StartGame()
function countSurroundingMines (cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col);
  var count = 0
  for(x of surroundingCells){
    if(x.isMine){
      count+=1
    }
  }
  return count
}


//function called when a different sized board is made
function clearBoard(){
  document.querySelector(".board").innerHTML =""
}
//Function takes in size of board, and number of bombs
//Returns a randomized array of true (for number of bombs) and false (for leftovers)
//To be called only in createBoard
function makeBombArray(size, bombs){
  bombsArray = []

  //add true for number of bombs
  for(i = 0; i < bombs; i++){
    bombsArray.push(true)
  }

  //add false for number of cells that are not bombs
  for(i = 0; i < (size*size)-bombs; i++){
    bombsArray.push(false)
  }
  bombsArray = (bombsArray.sort(() => Math.random() - 0.5))
  return bombsArray
}

//Function that takes in size of board and number of bombs
//Returns a randomized board with corresponding arguments
function createBoard (size, bombs){
  clearBoard()
  bombsArray = makeBombArray(size,bombs)

  let board = {
    cells:[]
  }
  let t = 0
  for(i = 0; i < size; i++){
    for(j = 0; j < size; j++){
      board.cells[t]= {row:i, col:j, isMine:bombsArray[t], hidden: true}
      t++
    }
  }
  return board
}


//Function that takes in a value and makes the main variable boardSize that variable, restarts the game
function changeBoardSize(size){
  boardSize = size
  numberOfBombs = (boardSize*boardSize/3)
  createMineOptions()
  startGame()
}


//Function that is used when the checkbox to manually choose number of bombs is clicked.
function chooseMine(){
  //changes numberOfBombs to default, for when you uncheck box
  numberOfBombs=(boardSize*boardSize/3)
  startGame()

  var checkBox = document.getElementById("mineChoice")
  var mineEntry = document.getElementById("mineEntryField")

//changes the style of the dropdown box to visible or hidden
  if(checkBox.checked == true){
    mineEntry.style.display = "inline-block";
    createMineOptions()
  } else {
    mineEntry.style.display = "none";
  }

}


//function called to make options for number of bombs equal to number of cells. called when size is changed, or option to choose bombs is choosen
function createMineOptions(value){
  value = value || numberOfBombs
  let element = document.getElementById("mineValue");

  //Removes previous options
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  //creates new options for current board size
  for(var i = 0; i < (boardSize*boardSize); i++){
    var opt = document.createElement('option');
    //Makes default selected equal to current Number of bombs
    if(i+1 == Math.floor(numberOfBombs)){
      opt.selected = "selected"
    }
    opt.value = i+1;
    opt.innerHTML = i+1;
    document.getElementById('mineValue').appendChild(opt);
  }
}

//function called by bomb dropdown menu onchange
function changeNumberOfBombs(value){
  numberOfBombs = value
  startGame()
}

function checkAllIsHidden(){
  for(x of board.cells){
    if(!x.hidden){
      return false
    }
  }

return true
}