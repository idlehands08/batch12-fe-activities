// VARIABLES
const centerWrapper = document.querySelector('.wrapper-center'); // contains the clock, greeting, and focus display
// clock variables
const clockContainer = document.querySelector(".clock")
const clockTitle = clockContainer.querySelector("h1")
//welcome page variables
const welcomeContainer = document.querySelector('.container-welcome');
const nameInput = document.getElementById('input-name');
const userName = document.querySelector('#userName');
const editNameButton = document.querySelector('#button-editName');
var user;
const resetConfirmationMessage = document.querySelector('#reset-confirmation-message');
//focus variables
const focusContainer = document.querySelector('.container-focus');
const focusInput = document.querySelector('#focus-input');
const focusDisplay = document.querySelector('.focus-display');
const focus = document.querySelector('#focus');
const editFocusButton = document.querySelector('#editFocusButton');
//productivity quote variables
const quotesList = [
	['Focus on being productive instead of busy.', '-Tim Ferriss'],
	['Do the hard jobs first. The easy jobs will take care of themselves.', '- Dale Carnegie'],
	['Productivity is being able to do things that you were never able to do before.', '- Franz Kafka'],
	['It’s not always that we need to do more but rather that we need to focus on less.', '- Nathan W. Morris'],
	['My goal is no longer to get more done, but rather to have less to do.', '- Francine Jay'],
	['You can fool everyone else, but you can’t fool your own mind.', '- David Allen'],
	['You miss 100% of the shots you don’t take.', '-Wayne Gretzky'],
	['Simplicity boils down to two steps: Identify the essential. Eliminate the rest.','- Leo Babauta'],
	['Strive not to be a success, but rather to be of value.', 'Albert Einstein'],
	['Sometimes, things may not go your way, but the effort should be there every single night.', '- Michael Jordan'],
	['The tragedy in life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach.', '- Benjamin E. Mays'],
	['If you spend too much time thinking about a thing, you’ll never get it done.', '- Bruce Lee'],
	['Until we can manage time, we can manage nothing else.', '- Peter Drucker']
]
const prodQuoteContainer = document.querySelector('.container-quotes')
const prodQuote = document.querySelector('#prodQuote');
const generateQuoteButton = document.querySelector('#button-generateQuote');
const addQuoteButton = document.querySelector('#button-addQuote');
// reset function variables
const resetContainer = document.querySelector('#container-reset');    
const resetButton = document.querySelector('#button-reset');
const resetButtonYes = document.querySelector('#button-reset-yes');
const resetButtonNo = document.querySelector('#button-reset-no');
//stretch reminder variables
const healthQuotesArray = [
	['To ensure good health: eat lightly, breathe deeply, live moderately, cultivate cheerfulness, and maintain an interest in life.','- William Londen'],
	['Physical fitness is the first requisite of happiness.', '- Joseph Pilates'],
	['The human body has been designed to resist an infinite number of changes and attacks brought about by its environment. The secret of good health lies in successful adjustment to changing stresses on the body.', '- Harry J. Johnson'],
	['To keep the body in good health is a duty…otherwise we shall not be able to keep the mind strong and clear.', '- Buddha'],
	['Good health is not something we can buy. However, it can be an extremely valuable savings account.', '- Anne Wilson Schaef'],
	['You can’t control what goes on outside, but you CAN control what goes on inside.', '- Unknown'],
	['Keeping your body healthy is an expression of gratitude to the whole cosmos- the trees, the clouds, everything.', '- Thich Nhat Hanh'],
	['Healthy citizens are the greatest asset any country can have.', '- Winston Churchill']
]
//reminder/break variables
const reminderContainer= document.querySelector('.container-reminders'); // contains the container for reminders
const reminderText = document.querySelector('.reminderText');
const reminderMenuContainer = document.querySelector('.container-remindersMenu');
const centerContainer = document.querySelector('.container-center');
const reminderButton = document.querySelector('#button-reminder'); // button to trigger stretch reminder for presentation purposes only
const healthQuote = document.querySelector('.healthQuote');
const healthQuoteAuthor = document.querySelector('.healthQuoteAuthor');
const set10secondsButton = document.querySelector('#intervalButton1');
const set30minButton = document.querySelector('#intervalButton2');
const set60minButton = document.querySelector('#intervalButton3');
const set90minButton = document.querySelector('#intervalButton4');
const offButton = document.getElementById('stopIntervalButton');
const intervalButtons = document.querySelectorAll('.reminder-intervalButton');
const triggerStretchButton = document.querySelector("#triggerStretchButton");
//EVENT LISTENERS
editFocusButton.addEventListener('click', showFocusInputField);
// productivity quote event listeners
generateQuoteButton.addEventListener('click', displayRandomProdQuote);
addQuoteButton.addEventListener('click', addQuote);
//edit name event listener
editNameButton.addEventListener('click', editName);
//reset function event listeners
resetButton.addEventListener('click', displayResetConfirmation);
resetButtonNo.addEventListener('click', displayResetConfirmation);
reminderButton.addEventListener('click', displayReminderMenu);
// FUNCTIONS
// Clock Feature Section
function getTime(){
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	// clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	clockTitle.innerText =   `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}
// IIFE - Immediately Invoked Function Expression. Function that initializes the clock feature. Calls itself.
(function initializeClock(){
	getTime();
	setInterval(getTime, 1000); //get time every second
}())
//container-welcome div - Asks for the user's name. Disappears after entering name
// function that gets the user name from the welcome message
nameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && nameInput.value.trim() !== '') {
		welcomeContainer.classList.add("hide");
		user = nameInput.value;
		userName.innerHTML =  user;
		centerWrapper.classList.remove('hide'); //displays center content after entering name
    }
});
//EDIT USERNAME
//makes the userName tag editable.
function editName() {
	userName.contentEditable = "true";
	userName.focus();
}
//gets the textContent of the userName tag upon pressing enter and sets the user value to that input.
userName.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
		userName.contentEditable = "false";
		user = userName.textContent;
		userName.innerHTML = user;
    }
});
//PRODUCTIVITY QUOTE
//display random prod quote
function displayRandomProdQuote() {
	const random = Math.floor(Math.random() * quotesList.length);
	prodQuote.innerHTML = quotesList[random][0];
}
displayRandomProdQuote(); //display random quote on page startup.
//add prod quote - combination of addquote and prodquote event listener enter
function addQuote() {
	prodQuote.contentEditable = "true";
	prodQuote.focus();
}
prodQuote.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
		prodQuote.contentEditable = "false";
		quotesList.push(prodQuote.textContent);
		prodQuote.innerHTML = quotesList.pop();
    }
});
// FOCUS
//function to edit focus
//brings back the focus input field container and hides the focus display container
function showFocusInputField() {
	focus.classList.remove('linethrough');
	focusContainer.classList.remove('hide');
	focusDisplay.classList.add('hide');
	prodQuoteContainer.classList.add('hide');
} 
var focusCrosshair;
focusInput.addEventListener('keypress', function (e) {
	//if focus input is entered and the value is not null
    if (e.key === 'Enter' && focusInput.value !== "") {
		focusContainer.classList.add("hide"); // hide the focus input container
		focusDisplay.classList.remove('hide'); 	//remove hide from focus display
		prodQuoteContainer.classList.remove('hide'); //remove hide from productivity quote container
		focus.innerHTML ='<i class="fas fa-crosshairs"></i>' + '  ' + focusInput.value;
		focusInput.value = "";
		focusCrosshair = document.querySelector('.fa-crosshairs');
		focusCrosshair.addEventListener('click', linethroughFocus);
    }
});
//linethrough the focus item onclick
function linethroughFocus() {
	focusCrosshair.classList.toggle('linethrough');
	focus.classList.toggle('linethrough');
}
//RESET FUNCTION
function displayResetConfirmation() {
	if (resetContainer.classList.contains('hide')) {
		resetConfirmationMessage.innerHTML = "Are you sure you want to reset " + user + "?";
		resetContainer.classList.remove("hide");
	}
	else {
		resetContainer.classList.add("hide");
	}
}
// reset page - if YES from reset confirmation page is clicked, this function is executed.
resetButtonYes.onclick = function refreshPage(){
	window.location.reload();
}
//STRETCH REMINDER functions
//stretch reminder triggers on certain interval depending on the button set on the break menu on the lower right of page.
offButton.addEventListener('click', getInterval);
triggerStretchButton.addEventListener('click', stretchReminder);
var interval = 3600000;  //defaults stretch break interval to 1 hour on page load
startInterval(interval); //starts a 1 hour interval for stretch breaks
var intervalId; // intervalId is used to store the intervalId so that it can be deleted when a new one is created.
var currentActiveInterval = set60minButton; //default activeButton is the 60 min button;
set60minButton.classList.add('active'); // default activeButton class put on the 60 min button. 
//functions should be recycled/refactored -----
set10secondsButton.addEventListener('click', function() {
	interval = 10000;
	clearInterval(intervalId);
	startInterval(interval);
	currentActiveInterval.classList.remove('active');
	currentActiveInterval = set10secondsButton;
	set10secondsButton.classList.add('active');
	console.log(interval);
});
set30minButton.addEventListener('click', function() {
	interval = 1800000;
	clearInterval(intervalId);
	startInterval(interval);
	currentActiveInterval.classList.remove('active');
	currentActiveInterval = set30minButton;
	set30minButton.classList.add('active');
	console.log(interval);
});
set60minButton.addEventListener('click', function() {
	interval = 3600000;
	clearInterval(intervalId);
	startInterval(interval);
	currentActiveInterval.classList.remove('active');
	currentActiveInterval = set60minButton;
	set60minButton.classList.add('active');
	console.log(interval);
});
set90minButton.addEventListener('click', function() {
	interval = 5400000;
	clearInterval(intervalId);
	startInterval(interval);
	currentActiveInterval.classList.remove('active');
	currentActiveInterval = set90minButton;
	set90minButton.classList.add('active');
	console.log(interval);
});
offButton.addEventListener('click', function() {
	clearInterval(intervalId);
	currentActiveInterval.classList.remove('active');
	currentActiveInterval = offButton;
	offButton.classList.add('active');
	console.log(intervalId);
});
//starts a new interval for the stretch break function. Triggers whenever one of the interval settings button is clicked.
function startInterval(newInterval) {
	// Store the id of the interval so we can clear it later
	intervalId = setInterval(function() {
		console.log(newInterval); //checks if the new Interval is being passed onto the new setInterval function
		stretchReminder();
	}, newInterval);
  }
function getInterval() {
	console.log(interval);
}
function stretchReminder() {
    centerWrapper.classList.add('hide');
	reminderContainer.classList.remove('hide');
    reminderText.innerHTML = `Hey ${user}! Time for some movement!`;
	centerContainer.addEventListener('click', displayDefault);
	const random = Math.floor(Math.random() * healthQuotesArray.length);
	healthQuote.innerHTML = healthQuotesArray[random][0];
	healthQuoteAuthor.innerHTML = healthQuotesArray[random][1];
	hideAllItems(); //hide all open items to increase user focus on stretch reminder
}
//display the default items. Will be triggered by clicking on the screen whenever stretch reminder is displayed.
function displayDefault() {
	reminderContainer.classList.add('hide');
	centerWrapper.classList.remove('hide');
	reminderText.innerHTML = "";
	prodQuoteContainer.classList.remove('hide');
	centerContainer.removeEventListener('click', displayDefault);
}
//function that will hide all open items whenever stretchReminder is triggered
//first checks if a window is open by checking if it contains the hide class.
function hideAllItems() {
	if (!themesContainer.classList.contains("hide")) { //checks if the container DOES NOT contain the hide class
		themesContainer.classList.add("hide"); //adds the hide class if
		themeButton.classList.remove("active"); // removes the active status from its button
	}
	if (!stickyNotesContainer.classList.contains("hide"))  {
		stickyNotesContainer.classList.add("hide");
		notesButton.classList.remove("active");
	}

	if(!todoContainer.classList.contains("hide")) {
		todoContainer.classList.add("hide");
		toDoListButton.classList.remove("active");
	}
	if (!resetContainer.classList.contains('hide')) {
		resetContainer.classList.add("hide");
		
	}
	if (!spotifyContainer.classList.contains("hide")) {
		spotifyContainer.classList.add("hide");
		musicButton.classList.remove("active");
	}

	if(!prodQuoteContainer.classList.contains("hide")) {
		prodQuoteContainer.classList.add("hide");
	}
}
function displayReminderMenu() {
	if (reminderMenuContainer.classList.contains('hide')){
		if (!themesContainer.classList.contains('hide')){
			themesContainer.classList.add("hide");
			themeButton.classList.remove("active");
		}
		reminderMenuContainer.classList.remove("hide");
		reminderButton.classList.add("active");
	}
	else {
		reminderMenuContainer.classList.add("hide");
		reminderButton.classList.remove("active");
	}
	
}
//END