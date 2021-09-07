//GLOBAL VARIABLES
//html elements
const board = document.querySelector('.board');
const prevNextButtons = document.querySelector('.container-prevNext');
const previousButton = document.querySelector('.previous');
const historyButton = document.querySelector('#checkHistory');
const nextButton = document.querySelector('.next');
const resetButton = document.querySelector('#reset');
const announcementTag = document.querySelector('.announcement')
const winningMessageContainer = document.querySelector('.container-winningMessage');
const winningPlayerAnnouncement = document.querySelector('.winningMessage');
const historyButtonContainer = document.querySelector('.container-historyButtons');
const scoreBoardContainer = document.querySelector('.container-scoreBoard');
const rematchButtons = document.querySelectorAll('.rematch');
const scoreXTag = document.querySelector('.scoreX');
const scoreOTag = document.querySelector('.scoreO');
const marioSound = new Audio('./audio/smb_jump-small.wav');
const luigiSound = new Audio('./audio/smb_jump-super.wav');
const coinSound = new Audio('./audio/smw_coin.wav');
const growSound = new Audio('./audio/smb_vine.wav');
const pipeSound = new Audio('./audio/smb_pipe.wav');
const breakBlockSound = new Audio('./audio/smb_breakblock.wav');
const pauseSound = new Audio('./audio/smb_pause.wav');
const bgMusic = document.querySelector('#bgMusic');
const settingsButton = document.querySelector('#settingsButton');
const settingsMenu = document.querySelector('.settings');
const settingsCloseButton = document.querySelector('#settingsCloseButton');
const bgmOnButton = document.querySelector('#bgmON');
const bgmOffButton = document.querySelector('#bgmOFF');
const sfxOnButton = document.querySelector('#sfxON');
const sfxOffButton = document.querySelector('#sfxOFF');
const playerSelectContainer = document.querySelector('.container-playerSelect');
const singlePlayerTag = document.getElementById('singlePlayer');
const twoPlayersTag = document.getElementById('twoPlayers')
const modeSelect = document.querySelector('.modeSelect');
const characterSelect = document.querySelector('.characterSelect');
const selectMario = document.getElementById('selectMario');
const selectLuigi = document.getElementById('selectLuigi');

//sound
bgMusic.loop = 'true';
bgMusic.volume = 0.2;
luigiSound.volume = 0.3;
marioSound.volume = 0.3;
growSound.volume = 0.3;
coinSound.volume = 1.0;

//declared variables
var counter = 0; //used to count the turns
var lastCounter = 0; //used to indicate when the nextButton will disappear
var lastPlayerSymbol = ""; //determines who was the last player to mark move on board. Used to check for winning combinations. 
var boardArray = []; // initializes our board array
boardArray[counter] = []; // initializes the first index of our board array as an array as well
var scoreX = 0;
var scoreO = 0;
var mode = 'singlePlayer';
var playerCharacter = "mario";

//EVENT LISTENERS
previousButton.addEventListener('click', previousMove);
nextButton.addEventListener('click', nextMove);
historyButton.addEventListener('click', displayHistoryButtonsContainer);
resetButton.addEventListener('click', refreshPage);
singlePlayerTag.addEventListener('click', setSinglePlayerMode);
twoPlayersTag.addEventListener('click', setTwoPlayersMode);
selectMario.addEventListener('click', marioSelected);
selectLuigi.addEventListener('click', luigiSelected);

//FUNCTIONS
//initializes an empty board. Called on page load and when rematchButton is pressed.
function createBoard() {
    for(let i = 0; i < 3; i++) {
        for (let j=0; j < 3; j++)  {
            let newDiv = document.createElement('div');
            newDiv.classList.add(`cell`);
            board.appendChild(newDiv);
        }
    }
}
createBoard();

//checks if it is player X's turn or player O's turn;
const playerXTurn = () => {
    if(board.classList.contains('x')) {
        return true;
    }
    else {
        return false;
    }
}

//function to handle player x/mario cell clicks
const xAction = () => {
    targetCell.classList.add('x'); //adds classList x to indicate an x mark on the cell
    marioSound.play();
    board.classList.remove('x'); // removes classList x from board to give way for next turn
    board.classList.add('o'); //switches turn to o
    lastPlayerSymbol = 'x'; //saves last player move as x
    scoreBoardContainer.classList.add('oTurn');
}

//function to handle player o/luigi cell clicks 
const oAction = () => {
    targetCell.classList.add('o'); //adds classList x to indicate an o mark on the cell
    luigiSound.play();
    board.classList.remove('o'); // removes classList o from board to give way for next turn
    board.classList.add('x');  // switches turn to x
    lastPlayerSymbol = 'o'; //saves the last player move as o 
    scoreBoardContainer.classList.remove('oTurn');
}

//handles click event when player clicks on a cell
const playerMove = (e) => {
    targetCell = e.target;
    if(playerXTurn() === true) {
       xAction();
    }
    else {
        oAction();
    }
    storeHistory(); //calls the storeHistory function to store current state of board after a player turn
    if (checkForWinner(lastPlayerSymbol)) {
        //if else which sets the color for the announcement tag depending on lastPlayerSymbol (the winner of the game);
        if (lastPlayerSymbol === 'x') {
            announcementTag.style.color = "var(--color-playerX)";
            scoreBoardContainer.classList.remove('oTurn');
        }
        else {
            announcementTag.style.color = "var(--color-playerO)"; 
            scoreBoardContainer.classList.add('oTurn');
        }
        announcementTag.innerHTML = "Congratulations!";
        lastCounter = counter; // sets value of lastCounter to counter value after gamewin.
    }
    else {
        if(counter === 8) {
            handleDraw();
            lastCounter = counter;
        }
        else {
            counter++;  //adds 1 to counter for the next array to be pushed on boardArray
            if (mode === 'singlePlayer') {
                removeCellEventListener();
                botDelay(); //calls on bot action with a random delay
            }
        }
    }
}

//add event listeners to all cells. Called on createBoard();
function addCellEventListener() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if(!cell.classList.contains('x') && !cell.classList.contains('o')) //only adds event listener to empty cells
        cell.addEventListener('click', playerMove, { once: true });
        cell.style.cursor = "pointer";
    });
    rematchButtons.forEach(rematchButton => {
        rematchButton.addEventListener('click', restartGame);
    });
}


//removes eventListener for all cells. Called when a player wins.
function removeCellEventListener() {
    const cells=document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', playerMove);
        cell.style.cursor = "not-allowed";
    });
}

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
    //push all of our scope row variables onto our global boardArray using the same index
    //using the same index will make sure that all rows are pushed onto one index of our global boardArray.
    boardArray[counter].push(row1);
    boardArray[counter].push(row2);
    boardArray[counter].push(row3);
}

//used for history function. Shows previous move.
function previousMove(){
    counter -= 1; //first subtracts one from counter in order to point to our previous entry in our boardArray.
    if(counter<1) {
        previousButton.classList.add('disable');
        previousButton.setAttribute("disabled", true);
        
    }
    nextButton.classList.remove('disable');
    nextButton.removeAttribute("disabled");
    loadHistory(); 
    
}

//used for history function. Shows next move.
function nextMove(){
    counter += 1;
    if( counter === lastCounter ){
        nextButton.classList.add('disable');
        nextButton.setAttribute("disabled", true);
    }
    // previousButton.classList.remove('hide');
    previousButton.classList.remove('disable');
    previousButton.removeAttribute("disabled");
    loadHistory();
}

//this function is used in our previous and next button. 
//Pulls out entries from our historyArray depending on the counter.
//displays our history content on our board.
const loadHistory = () => {
    const cells = document.querySelectorAll('.cell'); //get all cells 
    var cellCounter = 0; //used to move through our cells
    boardHistory = boardArray[counter];
    //this function pushes each content of our history array onto our board.
    boardHistory.forEach(row => {
        row.forEach((item) =>{
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

//Check for Game Winner function - called after every playerMove function activation
//the function will first ask for the lastPlayerSymbol which is passed from the playerMove function
function checkForWinner(lastPlayerSymbol){
    //checks if there is already a winner through all the possible winning combinations
    if (checkPlayerSymbol(0,1,2, lastPlayerSymbol) || checkPlayerSymbol(3,4,5, lastPlayerSymbol)
    || checkPlayerSymbol(6,7,8, lastPlayerSymbol) || checkPlayerSymbol(0,3,6, lastPlayerSymbol)
    || checkPlayerSymbol(1,4,7, lastPlayerSymbol) || checkPlayerSymbol(2,5,8, lastPlayerSymbol)
    || checkPlayerSymbol(2,4,6, lastPlayerSymbol) || checkPlayerSymbol(0,4,8, lastPlayerSymbol)
    ){
        removeCellEventListener(); //remove event listener from cells to prevent click function after game
        //styling of winning message bg and winningPlayer content depending on who won the game
        
        setTimeout(function() {
            setWinningStyleAndMessages(lastPlayerSymbol);
        }, 3000);
        return true;
    }
    //checks if the lastPlayerSymbol is on each index of the possible winning combination
    function checkPlayerSymbol(index1,index2,index3, lastPlayerSymbol) {
        const cells = document.querySelectorAll('.cell');
        if (cells[index1].classList.contains(lastPlayerSymbol) && cells[index2].classList.contains(lastPlayerSymbol) 
        && cells[index3].classList.contains(lastPlayerSymbol)) {
            highlightSymbols(index1,index2,index3);
            return true;
        }
    }
}

//this function is called when the history buton is clicked.
function displayHistoryButtonsContainer() {
    revertCellStyling(); //sets the default styling of our board since it was edited during game win animations.
    announcementTag.style.color = "var(--color-cellBorder)"
    announcementTag.innerHTML ="History"
    historyButtonContainer.classList.remove('hide');
    winningMessageContainer.classList.add('hide');
    breakBlockSound.play();
    resetButton.classList.add('hide');
}

//sets the content of our winning message/box depending on who won the round.
function setWinningStyleAndMessages(winnerSymbol) {
    if (winnerSymbol === 'x') {
        winningMessageContainer.classList.remove('hide');
        winningMessageContainer.style.backgroundColor = "var(--color-playerX)";
        winningPlayerAnnouncement.innerHTML = "Player 1 has won the game!";
    }
    else { 
        winningMessageContainer.classList.remove('hide');
        winningMessageContainer.style.backgroundColor = "var(--color-playerO)";
        winningPlayerAnnouncement.innerHTML = "Player 2 has won the game!";
    }
}      

function highlightSymbols(index1,index2,index3) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.border = "none";
        cell.style.borderRadius = "40%";
    });
    setTimeout(function() {
        cells[index1].style.transition = "0.35s all ease";
        cells[index1].style.transform = "scale(1.5)";
        growSound.play();
    },500);
    setTimeout(function() {
        cells[index2].style.transition = "0.35s all ease";
        cells[index2].style.transform = "scale(1.5)";
    },1000);
    setTimeout(function() {
        cells[index3].style.transition = "0.35s all ease";
        cells[index3].style.transform = "scale(1.5)";
        // powerUp.play();
    },1500);
    setTimeout(function() {
        if (lastPlayerSymbol==="x") {
            scoreXTag.style.transform = "scale(1.8)"
        }
        else {
            scoreOTag.style.transform = "scale(1.8)"
        }
        addScore(lastPlayerSymbol);
    },2000);
    setTimeout(function() {
        scoreXTag.style.transform = "unset";
        scoreOTag.style.transform = "unset";
    },2500);
}

//sets the message of our winningMessage when a draw happens.
function handleDraw() {
    winningPlayerAnnouncement.innerHTML = "DRAW"
    winningMessageContainer.classList.remove('hide');
    winningMessageContainer.style.backgroundColor = "var( --color-background)";
    pauseSound.play(); //plays the pause sound from super mario bros. when the game is a draw.
    
}

//sets the default styling of our board since it was edited during game win animations.
function revertCellStyling(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.transition = "none";
        cell.style.transform = "unset";
        cell.style.border = "3px solid var(--color-cellBorder)";
        cell.style.borderRadius = "unset";
        
    });
    for (let i = 0; i < 3; i++) {
        cells[i].style.borderTop = "none";
    }
    for (let j = 0; j < 3; j++) {
        cells[3*j].style.borderLeft = "none";
    }
    for(let k = 0; k < 3; k++) {
        cells[3*k+2].style.borderRight = "none";
    }
    for( let x=6; x < 9; x++ ) {
        cells[x].style.borderBottom = "none";
    }

    announcementTag.innerHTML = `History - Player Turn ${counter}`;
}

//function that is called on when rematch button is pressed.
function restartGame() {
    const cells = document.querySelectorAll(".cell")
    revertCellStyling();
    cells.forEach(cell=> {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.style.cursor = "pointer";
    })
    addCellEventListener();
    if (lastPlayerSymbol ==="x") {
        scoreBoardContainer.classList.add('oTurn');
    }
    else {
        scoreBoardContainer.classList.remove('oTurn');
    }
    
    addCellEventListener();
    if (mode === 'singlePlayer') {
        board.classList.remove('o');
        board.classList.add('x');
        scoreBoardContainer.classList.remove('oTurn');
        if(playerCharacter === 'luigi') {
            botDelay();
        } 

    }
   
    //reset the variables
    resetButton.classList.remove('hide');
    counter = 0;
    lastCounter = 0;
    lastPlayerSymbol = "";
    boardArray = []; 
    historyButtonContainer.classList.add('hide');
    winningMessageContainer.classList.add('hide');
    announcementTag.innerHTML ="";
    pipeSound.play();
}

//function that reloads the page. Called by resetButton.
function refreshPage(){
    window.location.reload();
}

//adds a score to our scoreboard depending on who won the game.
function addScore(lastPlayerSymbol){
    if(lastPlayerSymbol === 'x') {
        scoreX += 1;
        scoreXTag.innerHTML = `${scoreX < 10 ? `0${scoreX}` : scoreX}`;
    }
    else {
        scoreO +=1;
        scoreOTag.innerHTML = `${scoreO < 10 ? `0${scoreO}` : scoreO}`;
       
    }
    coinSound.play(); 
}

function bot() {
    let freeCells = [];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if(!cell.classList.contains('x') && !cell.classList.contains('o')) {
            freeCells.push(cell);
            console.log(cell + ' has no children');
        }
    })
    let randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
    console.log(randomCell);
    botMove(randomCell);
}


//bot function that allows our bot to take his turn.
//exactly the same as playerMove() but takes in a cell instead of a target.
const botMove = (cell) => {
    targetCell = cell;
    if(playerXTurn() === true) {
        xAction();
    }
    else {
        oAction();
    }
    storeHistory(); //calls the storeHistory function to store current state of board after a player turn
    if (checkForWinner(lastPlayerSymbol)) {
        if (lastPlayerSymbol === 'x') {
            announcementTag.style.color = "var(--color-playerX)";
            scoreBoardContainer.classList.remove('oTurn');
        }
        else {
            announcementTag.style.color = "var(--color-playerO)"; 
            scoreBoardContainer.classList.add('oTurn');
        }
        announcementTag.innerHTML = "Congratulations!";
        lastCounter = counter; // sets value of lastCounter to counter value after gamewin.
    }
    else {
        if(counter === 8) {
            handleDraw();
            lastCounter = counter;
        }
        else {
            counter++;  //adds 1 to counter for the next array to be pushed on boardArray
        }
    }
}


function botDelay(){
    let randomDelay = ((Math.random() * 1000) + 300).toFixed();
    setTimeout(() => {
        bot();
        addCellEventListener();
    }, randomDelay);
}

function setSinglePlayerMode() {
    mode = "singlePlayer"
    modeSelect.classList.add('hide');
    characterSelect.classList.remove('hide');
    breakBlockSound.play();
}

function setTwoPlayersMode() {
    mode = "multiPlayer";
    modeSelect.classList.add('hide');
    characterSelect.classList.remove('hide');
    playerSelectContainer.classList.add('hide');
    breakBlockSound.play();
    bgMusic.play();
    addCellEventListener();
}

function marioSelected() {
    playerCharacter = 'mario';
    playerSelectContainer.classList.add('hide');
    breakBlockSound.play();
    bgMusic.play();
    addCellEventListener();
}

function luigiSelected() {
    playerCharacter = 'luigi';
    playerSelectContainer.classList.add('hide');
    breakBlockSound.play();
    botDelay();
    bgMusic.play();
    addCellEventListener();
}

settingsButton.addEventListener('click', toggleSettingsWindow);
settingsCloseButton.addEventListener('click', toggleSettingsWindow);
bgmOffButton.addEventListener('click', toggleBgmOff);
bgmOnButton.addEventListener('click', toggleBgmOn);
sfxOffButton.addEventListener('click', toggleSfxOff);
sfxOnButton.addEventListener('click', toggleSfxOn);

function toggleSettingsWindow() {
    if(settingsMenu.classList.contains('hide')){
        settingsMenu.classList.remove('hide');
        settingsButton.classList.add('active');
    }
    else {
        settingsMenu.classList.add('hide');
        settingsButton.classList.remove('active');
    }
}

function toggleBgmOff() {
    bgmOnButton.classList.remove('active');
    bgmOffButton.classList.add('active');
    bgMusic.muted = true;
}

function toggleBgmOn () {
    bgmOnButton.classList.add('active');
    bgmOffButton.classList.remove('active');
    bgMusic.muted = false;
}

function toggleSfxOff() {
    sfxOnButton.classList.remove('active');
    sfxOffButton.classList.add('active');
    marioSound.muted = true;
    luigiSound.muted = true;
    coinSound.muted = true;
    growSound.muted = true;
    pipeSound.muted= true;
    breakBlockSound.muted = true;
    pauseSound.muted = true;
}

function toggleSfxOn() {
    sfxOnButton.classList.add('active');
    sfxOffButton.classList.remove('active');
    marioSound.muted = false;
    luigiSound.muted = false;
    coinSound.muted = false;
    growSound.muted = false;
    pipeSound.muted= false;
    breakBlockSound.muted = false;
    pauseSound.muted = false;
}
//turns on sound when the mute image is selected to toggle to sound on.
