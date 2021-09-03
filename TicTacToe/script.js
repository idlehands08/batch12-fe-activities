//GLOBAL VARIABLES
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell')
var counter = 0; //used to count the turns
var lastPlayerTurn = ""; //determines who was the last player to mark move on board. Used to check for winning combinations. 
const boardArray = []; // initializes our board array
boardArray[counter] = []; // initializes the first index of our board array as an array as well

//FUNCTIONS
//IIFE function that initializes board on page load
(function createBoard() {
    for(let i = 0; i < 3; i++) {
        boardArray[counter][i] = [];
        for (let j=0; j < 3; j++)  {
            let newDiv = document.createElement('div');
            newDiv.classList.add(`cell`);
            board.appendChild(newDiv);
            boardArray[counter][i].push(newDiv.innerHTML);
        }
    }
    counter += 1;
    console.log(boardArray);
}())

//checks if it is player X's turn or player O's turn;
const playerXTurn = () => {
    if(board.classList.contains('x')) {
        return true;
    }
    else {
        return false;
    }
}

//handles click event when player clicks on a cell
const playerMove = (e) => {
    targetCell = e.target;
    if(playerXTurn() === true) {
        targetCell.classList.add('x');
        board.classList.remove('x');
        board.classList.add('o'); //switches turn to o 
    }
    else {
        targetCell.classList.add('o');
        board.classList.add('x');
        board.classList.remove('o');
        board.classList.add('x')//switches turn to x
    }
    storeHistory(); //calls the storeHistory function to store current state of board after a player turn
}

//adds event listeners to our board
function loadBoardFunctions() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', playerMove, { once: true });
    });
}
loadBoardFunctions();

//stores current board state every turn onto our boardArray to be used for previous and next button upon game completion.
const storeHistory = () => {
    const cells = document.querySelectorAll('.cell'); //get all cells on current turn
    boardArray[counter] = []; // create a new array on boardArray
    let row1 = []; // row arrays used to push items
    let row2 = [];
    let row3 = [];
    var playerSymbol = "";
    // setPlayerSymbol function determines what playerSymbol to place inside array.
    const setPlayerSymbol = (cell) => {
        if(cell.classList.contains('x')) {
            playerSymbol = 'X'
        }
        else if (cell.classList.contains('o')) {
            playerSymbol = 'O';
        }
        else {
            playerSymbol = '';
        }
    }
    //these loops will insert our current board state onto our scope row variables
    for (let i = 0; i < 3; i++) {
        setPlayerSymbol(cells[i]);
        row1.push(playerSymbol);
    }
    for (let j = 3; j < 6; j++) {
        setPlayerSymbol(cells[j]);
        row2.push(playerSymbol);
    }
    for (let x = 6; x < 9; x++) {
        setPlayerSymbol(cells[x]);
        row3.push(playerSymbol);
    }
    //push all of our scope row variables onto our global boardArray
    boardArray[counter].push(row1);
    boardArray[counter].push(row2);
    boardArray[counter].push(row3);
    counter++; //adds 1 to counter for the next array on boardArray
    console.log(boardArray); // --for test purposes only--
}

const previousButton = document.querySelector('.previous');

const previousMove = () => {
    counter -= 1;
    loadHistory();
}

previousButton.addEventListener('click', previousMove);

const nextMove = () => {
    counter += 1;
    loadHistory();
}

const nextButton = document.querySelector('.next');

nextButton.addEventListener('click', nextMove);

const loadHistory = () => {
    const cells = document.querySelectorAll('.cell'); //get all cells 
    var cellCounter = 0;
    boardHistory = boardArray[counter];
    boardHistory.forEach(row => {
        row.forEach((item, index) =>{
            if(item === 'X') {
                cells[cellCounter].classList.add('x');
                cellCounter++;
            }
            else if(item === 'O') {
                cells[cellCounter].classList.add('o');
                cellCounter++;
            }
            else {
                cells[cellCounter].classList.remove('x');
                cells[cellCounter].classList.remove('o');
                cellCounter++;
            }
        })
    });
}