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
  }
};

// execute only once all content loaded
document.addEventListener("DOMContentLoaded", () => {
  // we use an arrow function so we can execute multiple functions
  loadPlaylists();
});