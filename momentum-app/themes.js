// VARIABLES
const themesContainer = document.querySelector(".container-themeMenu");
const themeButton = document.querySelector("#button-theme");
//EVENT LISTENERS
themeButton.addEventListener('click', displayThemesMenu);
themesContainer.addEventListener('click', setTheme);
//FUNCTIONS
function displayThemesMenu() {
	if (themesContainer.classList.contains('hide')) {
        if (!reminderMenuContainer.classList.contains("hide")) {
            reminderMenuContainer.classList.add("hide");
            reminderButton.classList.remove("active");
        }
		themesContainer.classList.remove("hide");
		themeButton.classList.add("active");
		// var doubt = document.querySelector('.doubt');
		// doubt.classList.add("strike");
	}
	else {
		themesContainer.classList.add("hide");
		themeButton.classList.remove("active");
	}
}
//sets the Theme of the webpage
function setTheme(e) {
    const theme = e.target.id;
    const mainContainer = document.querySelector('.container-main'); 
    //if the grayscale button is pressed, toggle the grayscale of container-main to 80% or 0%;
    if (theme === "grayscale"){
        if (mainContainer.style.filter === "grayscale(80%)") {
            mainContainer.style.filter = "grayscale(0%)";
        }
        else {
        mainContainer.style.filter = "grayscale(80%)";
        }
    }
    else {
        if (theme !== '') { //checks if the cursor target is not null.
            if (theme ==="theme1") {
                todoContainer.style.backgroundImage = 'unset';
                document.documentElement.style.setProperty('--color-stickyNote', '#3fbac1');
                document.documentElement.style.setProperty('--color-stickyNoteContent', 'white')
                document.documentElement.style.setProperty('--color-toDoList', '#fb786e');
                document.documentElement.style.setProperty('--color-toDoListContent', 'white');
                document.documentElement.style.setProperty( '--color-hover', '#fb786e');
                document.documentElement.style.setProperty('--color-active', '#0782a1');
                musicButton.innerHTML = 'LOFI';
                spotifyFrame.src = "https://open.spotify.com/embed/playlist/1gx2qwdEsPFR6v0fE7iF58";
            }
            else if (theme ==="theme2") {
                todoContainer.style.backgroundImage = 'unset';
                document.documentElement.style.setProperty('--color-stickyNote', '#7a6391');
                document.documentElement.style.setProperty('--color-stickyNoteContent', 'white')
                document.documentElement.style.setProperty('--color-toDoList', '#f29b58');
                document.documentElement.style.setProperty('--color-toDoListContent', 'white');
                document.documentElement.style.setProperty( '--color-hover', '#f29b58');
                document.documentElement.style.setProperty('--color-active', '#1985b4');
                musicButton.innerHTML = 'LOFI';
                spotifyFrame.src = "https://open.spotify.com/embed/playlist/1gx2qwdEsPFR6v0fE7iF58";
                
            }
            else if (theme ==="theme3") {
                todoContainer.style.backgroundImage = 'unset';
                document.documentElement.style.setProperty('--color-stickyNote', '#eaf4ff');
                document.documentElement.style.setProperty('--color-stickyNoteContent', 'black')
                document.documentElement.style.setProperty('--color-toDoList', '#1cde7b');
                document.documentElement.style.setProperty('--color-toDoListContent', '#052653');
                document.documentElement.style.setProperty( '--color-hover', '#1cde7b');
                document.documentElement.style.setProperty('--color-active', '#052653');
                todoContainer.style.backgroundImage = 'linear-gradient(#1cde7b, #eaf4ff)';
                musicButton.innerHTML = 'LOFI';
                spotifyFrame.src = "https://open.spotify.com/embed/playlist/1gx2qwdEsPFR6v0fE7iF58";
                
            }
            else if (theme ==="theme4") {
                todoContainer.style.backgroundImage = 'unset';
                document.documentElement.style.setProperty('--color-stickyNote', '#ba6584');
                document.documentElement.style.setProperty('--color-stickyNoteContent', 'white')
                document.documentElement.style.setProperty('--color-toDoList', '#fedfe7');
                document.documentElement.style.setProperty('--color-toDoListContent', 'black');
                document.documentElement.style.setProperty( '--color-hover', '#fedfe7');
                document.documentElement.style.setProperty('--color-active', '#ba6584');
                musicButton.innerHTML = 'JAZZHOP';
                spotifyFrame.src = "https://open.spotify.com/embed/playlist/45i3KQ4ENPoZNRYtReXBcU";
            }
            else if (theme ==="theme5") {
                document.documentElement.style.setProperty('--color-stickyNote', '#3ca4c7');
                document.documentElement.style.setProperty('--color-stickyNoteContent', 'white')
                document.documentElement.style.setProperty('--color-toDoList', '#eca6be');
                document.documentElement.style.setProperty('--color-toDoListContent', 'white');
                document.documentElement.style.setProperty( '--color-hover', '#eca6be');
                document.documentElement.style.setProperty('--color-active', '#3ca4c7');
                todoContainer.style.backgroundImage = 'linear-gradient(rgb(10,189,198), rgb(234,0,217))';
                musicButton.innerHTML = "EDM"
                spotifyFrame.src = "https://open.spotify.com/embed/playlist/5D7O1sp9RLCR5jB1BAWc0V";
            }
        const classToBeRemoved = mainContainer.classList.item(1); // gets the current theme class
        mainContainer.classList.remove(classToBeRemoved); // removes the current theme class
        mainContainer.classList.add(theme); // adds the theme class depending on the button pressed
        }
    }
}
//END

