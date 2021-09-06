var x = 1; //this variable is used to determine who's turn it is. (odd = X, even = O)
var lastPlayerMove = '';
var historyArray = []; //this array will be used to save the history of moves in the game for the PREVIOUS button
var nextArray = []; // this array will be used to save the history of moves for the NEXT button
//declare the root blue and red colors from style.css to be used on this JavaScript file.
const blue = "var(--color-blue)";
const red = "var(--color-lightRed)";
//section rows declaration to be used globally
const row3 = document.getElementById('row3');
const row2 = document.getElementById('row2');
const row1 = document.getElementById('row1');
// first checks if it's player one or player two's turn by checking var x. 
// If var x is odd then it's player one's turn. 
// inserts the appropriate symbol depending on the player's turn
function insertSymbol() {
    if (x % 2 != 0) { 
        document.getElementById('game-text').innerHTML = "Player O's turn";
        document.getElementById('game-text').style.color = blue;
        lastPlayerMove = 'X';
        return 'X';
    }
    else {
        document.getElementById('game-text').innerHTML = "Player X's turn";
        document.getElementById('game-text').style.color = red;
        lastPlayerMove = 'O';
        return  'O';
    }
}
//sets the color of the symbol to the specified color within this function.
function setColor(lastPlayerMove, button) {
    if (lastPlayerMove === 'X') {
        document.getElementById(button).style.color = blue;
    }
    else {
        document.getElementById(button).style.color = red;
    }
}
function action(button) {
    //If there is already an item inside the box, alert the player
    if (document.getElementById(button).innerHTML != '')  {
        alert('Invalid Input');
    }
    // input the X or O depending on who's turn it is.
    // add 1 to var x which is used to identify who's turn it is.
    else {
        document.getElementById(button).innerHTML = insertSymbol();
        setColor(lastPlayerMove, button);
        x++;
        checkWinner(lastPlayerMove);
        saveMoves();
    }
}
// Save the entire tic tac toe board into a 2d array every time a player does a move. 
function saveMoves() {
    // create dummy arrays to in order to push the contents of our board by row.
    let tempArray = []; 
    let tempArray2 = [];
    let tempArray3 = [];
    for (let i = 0; i < row1.children.length; i++) {
         tempArray.push(row1.children[i].innerHTML);
     }

     for (let i = 0; i < row2.children.length; i++) {
        tempArray2.push(row2.children[i].innerHTML);
    }

    for (let i = 0; i < row3.children.length; i++) {
        tempArray3.push(row3.children[i].innerHTML);
    }

    pushHistory(tempArray, tempArray2, tempArray3); // passes the dummy arrays to our pushHistory function
}

//pushHistory will push each dummyArray one by one to our historyArray.
function pushHistory(tempArray, tempArray2, tempArray3) {
    historyArray.push(tempArray);
    historyArray.push(tempArray2);
    historyArray.push(tempArray3);
}
// should show up only when there is a next
function next() {
    var temp3 = nextArray.pop();
    var temp2 = nextArray.pop();
    var temp1 = nextArray.pop();
    for (let i = 0; i < 3; i++) {     
        row3.children[i].innerHTML = temp3[i];
        row2.children[i].innerHTML = temp2[i];
        row1.children[i].innerHTML = temp1[i];
    }
    pushHistory(temp1, temp2, temp3);
}
function previous() {
    // get the last 3 rows of our history Array
    var temp3 = historyArray.pop();
    var temp2 = historyArray.pop();
    var temp1 = historyArray.pop();

    nextArray.push(temp1);
    nextArray.push(temp2);
    nextArray.push(temp3);
    //input the historyArray per row onto tic tac toe section rows
    for (let i = 0; i < 3; i++) {     
        row3.children[i].innerHTML = temp3[i];
        row2.children[i].innerHTML = temp2[i];
        row1.children[i].innerHTML = temp1[i];
    }
}
//paired with checkID + checkWinner
//used to get the innerHTML of a button id. Id will be specified in checkWinner function.
function getButtonValue(id) {
    return document.getElementById("button" + id).innerHTML;
}
//this will check if the player symbol in the given combinations in checkWinner function is the correct player's symbol.
function checkPlayerSymbol(id1, id2, id3, lastPlayerMove) {
   if ( getButtonValue(id1) === lastPlayerMove && getButtonValue(id2) === lastPlayerMove && getButtonValue(id3) === lastPlayerMove) {
       return true;
   }
}
//checks if there is already a winning combination after the last player move.
function checkWinner() {
    if (checkPlayerSymbol(1,2,3, lastPlayerMove) || checkPlayerSymbol(4,5,6, lastPlayerMove)
    || checkPlayerSymbol(7,8,9, lastPlayerMove) || checkPlayerSymbol(1,4,7, lastPlayerMove)
    || checkPlayerSymbol(2,5,8, lastPlayerMove) || checkPlayerSymbol(3,6,9, lastPlayerMove)
    || checkPlayerSymbol(3,5,7, lastPlayerMove) || checkPlayerSymbol(1,5,9, lastPlayerMove)
    ){
        alert(lastPlayerMove + "is the winner!");}
}
//clears the tic-tac-toe-board and the historyArray;
function reset() {
    historyArray = [];
    buttons = document.getElementsByClassName('action-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = "";
    }
    document.getElementById('game-text').innerHTML = "Let's Play!";
    console.log (historyArray);
}

