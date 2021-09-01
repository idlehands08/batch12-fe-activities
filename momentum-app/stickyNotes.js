// VARIABLES
const notesButton = document.querySelector('#button-Notes');
const stickyNotesContainer = document.querySelector('.container-stickyNote');
const stickyNotesContainerWrapper = document.querySelector('.wrapper-stickyNotesContainer');
const plusNoteButton = document.querySelector('#plusNoteButton');
const closeNotesButton = document.querySelector("#close-notes-button");
let stickyCounter = 0; // variable that counts the current number of sticky notes. (to be used for max sticky notes which is 9);
// LISTENERS
notesButton.addEventListener('click',  displayNotesContainer);
stickyNotesContainer.addEventListener('click', deleteNote);
closeNotesButton.addEventListener('click', displayNotesContainer);
plusNoteButton.addEventListener('click', addNotes);
// FUNCTIONS
function displayNotesContainer() {
    //checks if there are no current sticky notes. 
    //Add note if there are none and show the notes container
    if(document.querySelectorAll('.stickyNote').length === 0) {
        addNotes();
        stickyNotesContainer.classList.remove("hide");
        stickyNotesContainerWrapper.classList.remove("hide");
		notesButton.classList.add("active");
    }
    //if there are sticky notes present, just toggle the hide class for container and active class for the notes button.
    else {
        if (stickyNotesContainer.classList.contains('hide')) {
            stickyNotesContainer.classList.remove("hide");
            stickyNotesContainerWrapper.classList.remove("hide");
            notesButton.classList.add("active");
        }
        else {
            stickyNotesContainer.classList.add("hide");
            stickyNotesContainerWrapper.classList.add("hide");
            notesButton.classList.remove("active");
        }
    }
	
}
//add the addNotes() function to all add buttons for all sticky Notes
function addStickyNoteListeners() {
    //get all current stickyNotes add Button
    const addNotesButton = document.querySelectorAll('#addNotesButton'); 
    for (let i = 0;i < addNotesButton.length; i++) {
        addNotesButton[i].addEventListener('click', addNotes);
    }
}
//add listener to close notes button and plusnote sign which are used for phone size version of Notes;
addStickyNoteListeners(); // calls the addStickyNoteListener() upon webpage load.
function addNotes() {
    //max number of sticky notes is 9 (don't want the screen to be too cluttered and you would rarely need more)
    if (stickyCounter <= 8) {
        //create the stickyNote div
        const stickyNoteDiv = document.createElement('div');
        stickyNoteDiv.classList.add('stickyNote');
        //create and append the addStickyButton onto stickyNote div
        const addStickyButton = document.createElement('button');
        addStickyButton.classList.add('addNotesButton');
        addStickyButton.innerHTML = '<i id="addNotesButton" class="fas fa-plus"></i>';
        stickyNoteDiv.appendChild(addStickyButton);
        //create and append the closeStickyButton onto stickyNoteDiv
        const closeStickyButton = document.createElement('button');
        closeStickyButton.classList.add('closeNotesButton');
        closeStickyButton.innerHTML = '<i id="closeNotesButton" class="fas fa-times"></i>'
        stickyNoteDiv.appendChild(closeStickyButton);
        //create and append our note-title and set the proper attributes
        const stickyTitleField = document.createElement('input');
        stickyTitleField.classList.add('note-title');
        stickyTitleField.setAttribute("type", "text");
        stickyTitleField.setAttribute("placeholder", "add title here");
        stickyTitleField.setAttribute("autocomplete", "off");
        stickyNoteDiv.appendChild(stickyTitleField);
        //create and append our textarea and set the proper attributes
        const stickyTextArea = document.createElement("textarea");
        stickyTextArea.classList.add('stickyTextArea');
        stickyTextArea.setAttribute("placeholder", "take some notes...");
        stickyTextArea.setAttribute("autocomplete", "off");
        stickyNoteDiv.appendChild(stickyTextArea);
        //append stickyNoteDiv to stickyNotesContainer
        stickyNotesContainer.appendChild(stickyNoteDiv);
        addStickyNoteListeners();
        //adds 1 to stickyCounter (to be used for max number of sticky notes which is 9)
        stickyCounter++;
    }
    else {
        alert('You have reached the maximum number of sticky notes');
    }
}
function deleteNote(e) {
        const targetNote = e.target;
        //Delete the target stickyNote
        if(targetNote.classList[1] === 'fa-times')  {
           targetNote.parentElement.parentElement.remove();
           //removes the hover effect on NotesButton when all stickyNotes have been deleted
           if(document.querySelectorAll('.stickyNote').length === 0) {
            notesButton.classList.remove("active");
           }
           //subtracts 1 from stickyCounter (to be used for max number of sticky notes which is 9)
           stickyCounter--;
        }
}
stickyNotesContainer.addEventListener('mousedown', mousedown);
function mousedown(e) {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
    let prevX = e.clientX; //current X position of mouse
    let prevY = e.clientY; //current Y position of mouse
    function mousemove(e) {
        let newX = prevX - e.clientX; 
        let newY = prevY - e.clientY;
        const rect = stickyNotesContainer.getBoundingClientRect();
        stickyNotesContainer.style.left = rect.left - newX + "px"; //subtracts newX to the current left value
        stickyNotesContainer.style.top = rect.top - newY + "px"; //subtracts newY to the current top value
        prevX = e.clientX;
        prevY = e.clientY;
    }
    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
    }
}