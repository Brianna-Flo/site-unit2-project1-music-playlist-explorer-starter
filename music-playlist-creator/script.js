// // JavaScript for Opening and Closing the Modal
// const modal = document.getElementById("playlist-modal");
// const span = document.getElementsByClassName("close")[0];

// function openModal(playlist) {
//    document.getElementById('playlist-title').innerText = playlist.name;
//    document.getElementById('festivalImage').src = playlist.imageUrl;
//    document.getElementById('festivalDates').innerText = `Dates: ${playlist.dates}`;
//    document.getElementById('festivalLocation').innerText = `Location: ${playlist.location}`;
//    document.getElementById('artistLineup').innerHTML = `<strong>Lineup:</strong> ${playlist.lineup.join(', ')}`;
//    modal.style.display = "block";
// }

// span.onclick = function() {
//    modal.style.display = "none";
// }
// window.onclick = function(event) {
//    if (event.target == modal) {
//       modal.style.display = "none";
//    }
// }

// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
  document.getElementById("playlist-modal-photo").src = playlist.playlist_art;
  document.getElementById("playlist-title").innerText = playlist.playlist_name;
  document.getElementById("creator-name").innerText = playlist.playlist_author;
  document.getElementById("playlist-songs").innerHTML = ``;
  loadSongs(playlist.songs);
  modal.style.display = "block";
  // document.querySelector("body").toggleClass('stopScroll');
}

span.onclick = function () {
  modal.style.display = "none";
};

// make it so that you exit out only when clicking the "X"
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// iterate over data.playlists array
const loadPlaylists = () => {
  if (playlists.length === 0) {
    const mainBody = document.querySelector("main");
    mainBody.innerHTML = `
            <p>No playlists have been added</p>
        `;
  }
  let count = 0;
  const container = document.getElementById("playlist-cards");
  let row;
  for (const playlist of playlists) {
    if (count % 4 === 0) {
      row = document.createElement("section");
      row.className = "card-row";
      container.appendChild(row);
    }
    // create a new card
    let newCard = createCard(playlist);
    // add card to container
    row.appendChild(newCard);
    newCard.querySelector("#like-btn").addEventListener('click', (event) => {
      event.stopPropagation();
    });
    count++;
  }
};

// create card for each playlist
const createCard = (playlist) => {
  const playlistElement = document.createElement("section");
  playlistElement.className = "card outline";
  // playlistElement.onclick = function () {
  //   openModal(playlist);
  // };
  playlistElement.addEventListener('click', () => {
    openModal(playlist);
  });
  playlistElement.innerHTML = `
        <img class="outline" id="playlist-photo" src='${playlist.playlist_art}'/>
        <h3 class="no-space">${playlist.playlist_name}</h3>
        <p class="no-space">${playlist.playlist_author}</p>
        <section class="likes no-space">
            <i id="like-btn" class="fa-regular fa-heart"></i>
            <p id="like-cnt">likes</p>
        </section>
    `;
    // let variable = document.querySelector("#like-btn").addEventListener("click", ()=>{
    //   return;
    // });
    // console.log(variable);
  return playlistElement;
};

// execute only once all content loaded
document.addEventListener("DOMContentLoaded", () => {
  // we use an arrow function so we can execute multiple functions
  loadPlaylists();
});

const createSong = (song) => {
  const songElement = document.createElement("div");
  songElement.className = "song outline";
  songElement.innerHTML = `
    <img class="song-img outline" src='${song.song_img}'/>
    <div class="song-info">
        <h4 class="no-space">${song.song_title}</h4>
        <p class="no-space">${song.song_artist}</p>
        <p class="no-space">${song.album}</p>
    </div>
    <p class="song-time">${song.time}</p>
    `;
  return songElement;
};

const loadSongs = (songs) => {
  const container = document.getElementById("playlist-songs");
  for (const song of songs) {
    let newSong = createSong(song);
    container.appendChild(newSong);
  }
};



// like button click
// function likePlaylist() {
// document.addEventListener("click", () => {
//   querySelector(".likes").innerHTML = `
//     <p onclick="likePlaylist()" id="like-btn"><i class="fa-solid fa-heart"></i></p>
//     <p id="like-cnt">likes</p>
//   `;
// });
// }
