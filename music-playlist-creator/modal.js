// number of playlists, used for playlistID in new playlists
let numPlaylists = playlists.length;

const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];
const createModal = document.getElementById("create-modal");

function openModal(playlist) {
  // track whether modal is open
  document.querySelector("body").className = "opened";
  document.getElementById("playlist-modal-photo").src = playlist.playlist_art;
  document.getElementById("playlist-title").innerText = playlist.playlist_name;
  document.getElementById("creator-name").innerText = playlist.playlist_author;
  // clear previously loaded songs to display this playlist's songs
  document.getElementById("playlist-songs").innerHTML = ``;
  // add functionality for shuffle button
  document.getElementById("shuffle-btn").addEventListener("click", () => {
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
    // behavior for playlist information modal
    modal.style.display = "none";
    // indicates modal closed
    document.querySelector("body").className = "";
  } else if (event.target == createModal) {
    // behavior for create and edit playlist modal
    createModal.style.display = "none";
    // indicates modal closed
    const songsCont = document.querySelector("#songs-input");
    // clear additional song input from previous openers
    songsCont.innerHTML = `
        <div id="added-song">
            <div>
            <label for="songTitle">Song Title:</label>
            <input type="text" id="songTitle" name="songTitle" required />
            <label for="songArtist">Song Artist:</label>
            <input type="text" id="songArtist" name="songArtist" required />
            </div>
            <div>
            <label for="songAlbum">Song Album:</label>
            <input type="text" id="songAlbum" name="songAlbum" required />
            <label for="songDuration">Song Duration:</label>
            <input type="text" id="songDuration" name="songDuration" required />
            </div>
        </div>
    `;
  }
};

//  dynamically create and display playlists only once all HTML content loaded
document.addEventListener("DOMContentLoaded", () => {
  //  we use an arrow function so we can execute multiple functions
  loadPlaylists(playlists);
});

//  shuffles array of playlists
function shuffle(songList) {
  let curr = songList.length;
  while (curr != 0) {
    let rand = Math.floor(Math.random() * curr);
    curr--;

    [songList[curr], songList[rand]] = [songList[rand], songList[curr]];
  }
  //  clears and reloads page with new ordering
  document.getElementById("playlist-songs").innerHTML = ``;
  loadSongs(songList);
}

// Create playlist functionality
// open up modal for playlist form
function createNewPlaylist() {
  // indicates modal open
  document.querySelector("body").className = "opened";
  createModal.style.display = "block";
  const playlistForm = document.querySelector("#playlist-form");
  // functionality for "Add Another Song!" button
  addSongFunctionality();
  // change submit button functionality
  playlistForm.addEventListener("submit", handleCreatePlaylist);
  // clear form input values
  playlistForm.reset();
}

// functionality for "Add Another Song!" button
function addSongFunctionality() {
  const playlistForm = document.querySelector("#playlist-form");
  const addSong = document.querySelector("#add-song-btn");
  addSong.addEventListener("click", createSongInput);
  // fixed bug of multiple event listeners added by removing listener on close
  addSong.addEventListener("close", () => {
    addSong.removeEventListener(createSongInput);
  });
}

// creates a new div for song information
function createSongInput() {
  const songsCont = document.querySelector("#songs-input");
  const newSong = document.createElement("div");
  newSong.id = "added-song";
  newSong.innerHTML = `
        <div>
            <label for="songTitle">Song Title:</label>
            <input type="text" id="songTitle" name="songTitle" required />
            <label for="songArtist">Song Artist:</label>
            <input type="text" id="songArtist" name="songArtist" required />
        </div>
        <div>
            <label for="songAlbum">Song Album:</label>
            <input type="text" id="songAlbum" name="songAlbum" required />
            <label for="songDuration">Song Duration:</label>
            <input type="text" id="songDuration" name="songDuration" required />
        </div>`;
  songsCont.appendChild(newSong);
  return newSong;
}

// Executed whwen submit button pressed to create and display a new playlist card
function handleCreatePlaylist(event) {
  // customize behavior of form submit button
  event.preventDefault();
  const newPlaylist = playlistFromForm(false, null);
  // and add this to the reviews container
  const playlistCards = document.querySelector("#playlist-cards");
  // dont call appendChild, this time we want to append to the top (most recent reviews shown first)
  playlistCards.insertBefore(newPlaylist, playlistCards.lastChild); // first child is the first item in the reviews list
  event.target.reset(); // resets the form when you submit
  const songsCont = document.querySelector("#songs-input");
  songsCont.innerHTML = `
        <div id="added-song">
            <div>
            <label for="songTitle">Song Title:</label>
            <input type="text" id="songTitle" name="songTitle" required />
            <label for="songArtist">Song Artist:</label>
            <input type="text" id="songArtist" name="songArtist" required />
            </div>
            <div>
            <label for="songAlbum">Song Album:</label>
            <input type="text" id="songAlbum" name="songAlbum" required />
            <label for="songDuration">Song Duration:</label>
            <input type="text" id="songDuration" name="songDuration" required />
            </div>
        </div>
    `;
  document.querySelector("body").className = "";
  createModal.style.display = "none";
}

// Creates a new playlist card using values from submitted form
const playlistFromForm = (editing, playlistEditing) => {
  const songCont = document.querySelector("#songs-input");
  const listOfSongs = [];
  // select all song elements
  const songData = songCont.querySelectorAll("#added-song");
  for (let thisSong of songData) {
    // create song objects and add to array
    listOfSongs.push({
      song_title: thisSong.querySelector("#songTitle").value,
      song_artist: thisSong.querySelector("#songArtist").value,
      album: thisSong.querySelector("#songAlbum").value,
      time: thisSong.querySelector("#songDuration").value,
      song_img: "assets/img/song.png",
    });
  }
  // if editing playlist, retain number of likes
  const changeLikes = editing ? playlistEditing.likes : 0;
  // if user did not input playlist image, use default image
  const playlistArt =
    document.querySelector("#playlistImg").value === ""
      ? "assets/img/playlist.png"
      : `${document.querySelector("#playlistImg").value}`;
  // create new playlist object
  const playlist = {
    playlistID: ++numPlaylists,
    playlist_name: document.querySelector("#playlistTitle").value,
    playlist_author: document.querySelector("#playlistAuthor").value,
    playlist_art: playlistArt,
    likes: changeLikes,
    isLiked: false,
    songs: listOfSongs,
  };
  // Create card element with this submitted information
  return createCard(playlist);
};

// keep track of playlist being edited
let playlistEdited = null;
let currPlaylist = null;
function editPlaylist(playlistElement, playlist) {
  playlistEdited = playlistElement;
  currPlaylist = playlist;
  // indicate that modal is opened
  document.querySelector("body").className = "opened";
  createModal.style.display = "block";
  // update input elements to contain playlist information
  document.querySelector("#playlistTitle").value = playlist.playlist_name;
  document.querySelector("#playlistAuthor").value = playlist.playlist_author;
  document.querySelector("#playlistImg").value = playlist.playlist_art;

  // populate the first song input
  document.querySelector("#songTitle").value = playlist.songs[0].song_title;
  document.querySelector("#songArtist").value = playlist.songs[0].song_artist;
  document.querySelector("#songAlbum").value = playlist.songs[0].album;
  document.querySelector("#songDuration").value = playlist.songs[0].time;
  for (let i = 1; i < playlist.songs.length; i++) {
    // create and populate song input elements for remaining songs
    const newSong = createSongInput();
    newSong.querySelector("#songTitle").value = playlist.songs[i].song_title;
    newSong.querySelector("#songArtist").value = playlist.songs[i].song_artist;
    newSong.querySelector("#songAlbum").value = playlist.songs[i].album;
    newSong.querySelector("#songDuration").value = playlist.songs[i].time;
  }
  const playlistForm = document.querySelector("#playlist-form");
  // functionality for "Add Another Song!" button
  addSongFunctionality();
  // modify functionality of submit form button
  playlistForm.addEventListener("submit", handleUpdatePlaylist);
}

//
function handleUpdatePlaylist(event) {
  // customize behavior of form submit button
  event.preventDefault();
  if (playlistEdited !== null) {
    const newPlaylist = playlistFromForm(true, currPlaylist);
    newPlaylist.querySelector("#like-cnt").innerText = `${currPlaylist.likes}`;
    const parentCont = document.querySelector("#playlist-cards");
    // replace old playlist with new playlist
    parentCont.replaceChild(newPlaylist, playlistEdited);
    const songsCont = document.querySelector("#songs-input");
    songsCont.innerHTML = `
            <div id="added-song">
                <div>
                <label for="songTitle">Song Title:</label>
                <input type="text" id="songTitle" name="songTitle" required />
                <label for="songArtist">Song Artist:</label>
                <input type="text" id="songArtist" name="songArtist" required />
                </div>
                <div>
                <label for="songAlbum">Song Album:</label>
                <input type="text" id="songAlbum" name="songAlbum" required />
                <label for="songDuration">Song Duration:</label>
                <input type="text" id="songDuration" name="songDuration" required />
                </div>
            </div>
        `;
  }
  document.querySelector("body").className = "";
  createModal.style.display = "none";
  event.target.reset();
}
