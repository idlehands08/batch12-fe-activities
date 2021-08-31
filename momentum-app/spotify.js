const spotifyContainer = document.querySelector('.container-spotify');
const musicButton = document.querySelector ('#button-music');
const spotifyFrame = document.querySelector('#spotify');


musicButton.addEventListener('click', showSpotify);

function showSpotify(){
    if (spotifyContainer.classList.contains('hide')) {
		spotifyContainer.classList.remove("hide");
		musicButton.classList.add("active");
		// var doubt = document.querySelector('.doubt');
		// doubt.classList.add("strike");
	}
	else {
		spotifyContainer.classList.add("hide");
		musicButton.classList.remove("active");
	}
}

