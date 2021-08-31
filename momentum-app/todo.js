
//VARIABLES
const todoContainer = document.querySelector('.container-toDoList'); // used for displayToDoList() and drag function -- IMPORTANT
const closeToDoListButton = document.querySelector('.closeToDoListButton');
const toDoListButton = document.querySelector('#button-toDoList');  // add task  button 
const inputFieldItem = document.querySelector('#input-toDoItem'); // add task input field
const addButton = document.querySelector('#addToDoButton'); //add button for tasks
const toDoList = document.querySelector('.toDo-List'); // <UL> To Do list

 // toDoItem div tag which contains <p> and the complete delete buttons

//EVENT LISTENERS
//call addToDo() onclick of addButon (fa plus sign next to to do list input)
addButton.addEventListener('click', addToDo);
//call addToDo() upon pressing enter while on to do list input
inputFieldItem.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
		addToDo();
        inputFieldItem.value = '';
    }
});
//delete or complete a task depending on the button pressed
toDoList.addEventListener('click', deleteCompleteTask);
//complete a task when you double click the toDoItem container

//FUNCTIONS
function addToDo(){
    if (inputFieldItem.value.trim() != "") {
    event.preventDefault();
    // create li tag
    const  toDoLi = document.createElement("li");
    //create div toDoItem
    const toDoItemDiv = document.createElement("div");
    toDoItemDiv.classList.add("toDoItem");
    toDoLi.appendChild(toDoItemDiv);
    //add p tag onto toDoItemDiv
    const pTag = document.createElement("p");
    pTag.innerHTML = inputFieldItem.value;
    toDoItemDiv.appendChild(pTag);
    //add check button and trash button to container toDoItem div
    const checkButton = document.createElement("button");
    checkButton.classList.add("check");
    const trashButton = document.createElement("button");
    trashButton.classList.add("delete");
    //set the inner HTML of the buttons for the fontawesome icons
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    //append check and trash button to container-button div
    toDoItemDiv.appendChild(checkButton);
    toDoItemDiv.appendChild(trashButton);
    //Finally, append the entire LI tag to to our toDoList <ul>
    toDoList.appendChild(toDoLi);
    inputFieldItem.value = '';
    }
}

function deleteCompleteTask(e){
    const targetTask = e.target;
    //Delete the Item
    if(targetTask.classList[1] === 'fa-trash' || targetTask.classList[0] === 'trash')  {
        targetTask.parentElement.parentElement.remove();
    }

    if(targetTask.classList[1] === "fa-check" || targetTask.classList[0] === "delete") {
        targetTask.parentElement.parentElement.classList.toggle("linethrough");
    }
}



toDoListButton.addEventListener('click', displayToDoList);
closeToDoListButton.addEventListener('click', displayToDoList);
//shows/hides the entire To Do List Container
function displayToDoList() {
	if (todoContainer.classList.contains('hide')) {
		todoContainer.classList.remove("hide");
		toDoListButton.classList.add("active");
		
	}
	else {
		todoContainer.classList.add("hide");
		toDoListButton.classList.remove("active");
	}
	
}

// Function to make to do list container Draggable
todoContainer.addEventListener('mousedown', mousedown);
function mousedown(e) {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    let prevX = e.clientX; //current X position of mouse
    let prevY = e.clientY; //current Y position of mouse

    function mousemove(e) {
        let newX = prevX - e.clientX; 
        let newY = prevY - e.clientY;

        const rect = todoContainer.getBoundingClientRect();
        todoContainer.style.left = rect.left - newX + "px"; //subtracts newX to the current left value
        todoContainer.style.top = rect.top - newY + "px"; //subtracts newY to the current top value

        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
    }
}

