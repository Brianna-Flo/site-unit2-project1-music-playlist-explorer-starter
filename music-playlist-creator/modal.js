// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
  document.querySelector("body").className = "opened";
  document.getElementById("playlist-modal-photo").src = playlist.playlist_art;
  document.getElementById("playlist-title").innerText = playlist.playlist_name;
  document.getElementById("creator-name").innerText = playlist.playlist_author;
  document.getElementById("playlist-songs").innerHTML = ``;
  document.getElementById("shuffle-btn").addEventListener('click', () => {
    shuffle(playlist.songs);
  });
  loadSongs(playlist.songs);
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
  document.querySelector("body").className = "";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector("body").className = "";
  } else if (event.target == createModal) {
    createModal.style.display = "none";
    document.querySelector("body").className = "";
  }
};

// execute only once all content loaded
document.addEventListener("DOMContentLoaded", () => {
  // we use an arrow function so we can execute multiple functions
  loadPlaylists();
});




const createModal = document.getElementById('create-modal');

// open up modal for playlist form
function createNewPlaylist() {
  document.querySelector("body").className = "opened";
  createModal.style.display = "block";
  const playlistForm = document.querySelector("#playlist-form");
  playlistForm.addEventListener('submit', handleCreatePlaylist);
}

function handleCreatePlaylist (event) {
    // we do this because we want to customize the behavior that the form submit button does
    event.preventDefault();  // otherwise page will refresh (we dont want that)

    const title = document.querySelector('#playlistTitle').value;
    const author = document.querySelector('#playlistAuthor').value;
    // const songTitle = document.querySelector('#review-text').value;

    const song = [{
        "song_title": document.querySelector('#songTitle').value,
        "song_artist": document.querySelector('#songArtist').value,
        "album": document.querySelector('#songAlbum').value, 
        "time": document.querySelector('#songDuration').value, 
        "song_img": "assets/img/song.png",
    }];

    const playlist = {
        "playlistID": 1,
        "playlist_name": document.querySelector('#playlistTitle').value,
        "playlist_author": document.querySelector('#playlistAuthor').value,
        "playlist_art": "assets/img/playlist.png",
        "likes": 0,
        "songs": song
    };

    // call create review element to create review element with this submitted review
    const newPlaylist = createCard(playlist);
    // and add this to the reviews container
    const playlistCards = document.querySelector('#playlist-cards');
    const lastRow = playlistCards.lastChild;
    // dont call appendChild, this time we want to append to the top (most recent reviews shown first)
    lastRow.insertBefore(newPlaylist, lastRow.lastChild);  // first child is the first item in the reviews list
    event.target.reset();  // resets the form when you submit
    document.querySelector("body").className = "";
    createModal.style.display = "none";
}