const board = document.querySelector('.board');

var counter = 0; //used to count the turns
const boardArray = []; // initializes our board array
boardArray[counter] = []; // initializes the first index of our board array as an array as well

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

const playerMove = (e) => {
    targetCell = e.target;
    if(playerXTurn() === true) {
        targetCell.classList.add('x');
        board.classList.remove('x');
        board.classList.add('o'); //switches turn to 
        
    }
    else {
        targetCell.classList.add('o');
        board.classList.add('x');
        board.classList.remove('o');
        board.classList.add('x')//switches turn
    }
    console.log("clicked");
}





function loadBoardFunctions() {
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
        cell.addEventListener('click', playerMove, { once: true });
       
    });
    // console.log(cells);
}
loadBoardFunctions();

