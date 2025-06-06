// number of playlists for playlistID of new playlists
let numPlaylists = playlists.length;

// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
  document.querySelector("body").className = "opened";
  document.getElementById("playlist-modal-photo").src = playlist.playlist_art;
  document.getElementById("playlist-title").innerText = playlist.playlist_name;
  document.getElementById("creator-name").innerText = playlist.playlist_author;
  document.getElementById("playlist-songs").innerHTML = ``;
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
    modal.style.display = "none";
    document.querySelector("body").className = "";
  } else if (event.target == createModal) {
    createModal.style.display = "none";
    document.querySelector("body").className = "";
    const songsCont = document.querySelector('#songs-input')
    // while (songsCont.children.length > 1) {
    //     songsCont.removeChild(songsCont.lastChild);
    // }
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
    `
  }
};

// execute only once all content loaded
document.addEventListener("DOMContentLoaded", () => {
  // we use an arrow function so we can execute multiple functions
  loadPlaylists(playlists);
});

const createModal = document.getElementById("create-modal");

// open up modal for playlist form
function createNewPlaylist() {
  document.querySelector("body").className = "opened";
  createModal.style.display = "block";
  document.querySelector("#playlistTitle").value = "";
  document.querySelector("#playlistAuthor").value = "";
  document.querySelector("#songTitle").value = "";
  document.querySelector("#songArtist").value = "";
  document.querySelector("#songAlbum").value = "";
  document.querySelector("#songDuration").value = "";

  modalButtonFunctionality();
//   const playlistForm = document.querySelector("#playlist-form");
//   const addSong = document.querySelector("#add-song-btn");
//   const songsCont = document.querySelector('#songs-input');
//   addSong.addEventListener("click", () => {
//     createSongInput(songsCont);
//   });

//   playlistForm.addEventListener("submit", handleCreatePlaylist);
}

const createSongInput = (songsCont) => {
    console.log("called!");
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

function handleCreatePlaylist(event) {
  // we do this because we want to customize the behavior that the form submit button does
  event.preventDefault(); // otherwise page will refresh (we dont want that)
  const newPlaylist = playlistFromForm();
  // and add this to the reviews container
  const playlistCards = document.querySelector("#playlist-cards");
  // dont call appendChild, this time we want to append to the top (most recent reviews shown first)
  playlistCards.insertBefore(newPlaylist, playlistCards.lastChild); // first child is the first item in the reviews list
  event.target.reset(); // resets the form when you submit
  const songsCont = document.querySelector('#songs-input');
//   while (songsCont.children.length > 1) {
//         songsCont.removeChild(songsCont.lastChild);
//   }
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
    `
  document.querySelector("body").className = "";
  createModal.style.display = "none";
}

const playlistFromForm = () => {
  const songCont = document.querySelector('#songs-input');
  const listOfSongs = [];
  const songData = songCont.querySelectorAll("#added-song"); // select all songs to be in an array
  for(let thisSong of songData) {
    listOfSongs.push({
        song_title: thisSong.querySelector("#songTitle").value,
        song_artist: thisSong.querySelector("#songArtist").value,
        album: thisSong.querySelector("#songAlbum").value,
        time: thisSong.querySelector("#songDuration").value,
        song_img: "assets/img/song.png",
    });
  }
  const playlist = {
    playlistID: ++numPlaylists,
    playlist_name: document.querySelector("#playlistTitle").value,
    playlist_author: document.querySelector("#playlistAuthor").value,
    playlist_art: "assets/img/playlist.png",
    likes: 0,
    isLiked: false,
    songs: listOfSongs,
  };
  // call create review element to create review element with this submitted review
  return createCard(playlist);
};

let playlistEdited = null;
function editPlaylist(playlistElement, playlist) {
  playlistEdited = playlistElement;
  document.querySelector("body").className = "opened";
  createModal.style.display = "block";
  document.querySelector("#playlistTitle").value = playlist.playlist_name;
  document.querySelector("#playlistAuthor").value = playlist.playlist_author;
  
  // populate the first song input
  document.querySelector("#songTitle").value = playlist.songs[0].song_title;
  document.querySelector("#songArtist").value = playlist.songs[0].song_artist;
  document.querySelector("#songAlbum").value = playlist.songs[0].album;
  document.querySelector("#songDuration").value = playlist.songs[0].time;
  for(let i = 1; i < playlist.songs.length; i++) { // iterate through remaining songs
    const newSong = createSongInput(document.querySelector("#songs-input"));
    newSong.querySelector("#songTitle").value = playlist.songs[i].song_title;
    newSong.querySelector("#songArtist").value = playlist.songs[i].song_artist;
    newSong.querySelector("#songAlbum").value = playlist.songs[i].album;
    newSong.querySelector("#songDuration").value = playlist.songs[i].time;
  }
  modalButtonFunctionality();
//   const playlistForm = document.querySelector("#playlist-form");
//   playlistForm.addEventListener("submit", handleUpdatePlaylist);
}

function modalButtonFunctionality() {
  const playlistForm = document.querySelector("#playlist-form");
  const addSong = document.querySelector("#add-song-btn");
  const songsCont = document.querySelector('#songs-input');
  addSong.addEventListener("click", () => {
    createSongInput(songsCont);
  });

  playlistForm.addEventListener("submit", handleCreatePlaylist);
}

function handleUpdatePlaylist(event) {
  //   we do this because we want to customize the behavior that the form submit button does
  event.preventDefault();

  if (playlistEdited !== null) {
    const newPlaylist = playlistFromForm();
    const parentCont = document.querySelector("#playlist-cards");
    parentCont.replaceChild(newPlaylist, playlistEdited);
  }
  document.querySelector("body").className = "";
  createModal.style.display = "none";
  event.target.reset();
}
