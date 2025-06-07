// Given a list of playlist objects, populates the page with
const loadPlaylists = (playlistList) => {
  const container = document.getElementById("playlist-cards");
  if (playlistList.length !== 0) {
    for (const playlist of playlistList) {
      // create a new card
      let newCard = createCard(playlist);
      // add card to container
      container.appendChild(newCard);
    }
  }

  let newPlaylist = document.createElement("section");
  newPlaylist.className = "new-playlist card outline";
  newPlaylist.addEventListener("click", () => {
    createNewPlaylist();
  });
  newPlaylist.innerHTML = `
    <i class="fa-regular fa-plus"></i>
    <h3>Create new playlist</h3>
  `;
  container.appendChild(newPlaylist);
};

// create card for each playlist
const createCard = (playlist) => {
  const playlistElement = document.createElement("section");
  playlistElement.className = "card outline";
  playlistElement.addEventListener("click", () => {
    openModal(playlist);
  });
  playlistElement.innerHTML = `
        <img class="outline" id="playlist-photo" src='${playlist.playlist_art}'/>
        <h3 class="no-space">${playlist.playlist_name}</h3>
        <p class="no-space">${playlist.playlist_author}</p>
        <section class="card-btns">
          <section class="likes no-space">
              <i id="like-btn" class="fa-regular fa-heart"'></i>
              <p id="like-cnt">${playlist.likes}</p>
          </section>
          <div>
            <i id="edit-btn" class="fa-solid fa-pen-to-square"></i>
            <i id="delete-btn" class="fa-solid fa-trash"></i>
          </div>
        </section>
    `;

  if (playlist.isLiked) {
    playlistElement.querySelector("#like-btn").className = "fa-solid fa-heart";
    playlistElement.querySelector("#like-btn").style.color = "#ED254E";
  }
  playlistElement
    .querySelector("#like-btn")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      likePlaylist(playlistElement, playlist);
    });
  playlistElement
    .querySelector("#edit-btn")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      editPlaylist(playlistElement, playlist);
    });
  playlistElement
    .querySelector("#delete-btn")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      deletePlaylist(playlistElement);
    });
  return playlistElement;
};

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

function likePlaylist(newCard, playlist) {
  if (!playlist.isLiked) {
    newCard.querySelector("#like-btn").className = "fa-solid fa-heart";
    newCard.querySelector("#like-btn").style.color = "#ED254E";
    playlist.likes++;
    playlist.isLiked = true;
    newCard.querySelector("#like-cnt").innerText = `${playlist.likes}`;
  } else {
    newCard.querySelector("#like-btn").className = "fa-regular fa-heart";
    newCard.querySelector("#like-btn").style.color = "#000000";
    playlist.likes--;
    playlist.isLiked = false;
    newCard.querySelector("#like-cnt").innerText = `${playlist.likes}`;
  }
}

function shuffle(songList) {
  let curr = songList.length;
  while (curr != 0) {
    let rand = Math.floor(Math.random() * curr);
    curr--;

    [songList[curr], songList[rand]] = [songList[rand], songList[curr]];
  }
  document.getElementById("playlist-songs").innerHTML = ``;
  loadSongs(songList);
}

function deletePlaylist(playlistElement) {
  const container = document.querySelector("#playlist-cards");
  container.removeChild(playlistElement);
}

// sort functionality
const chooseSort = document.querySelector("#sort");
chooseSort.addEventListener("change", () => {
  switch (chooseSort.value) {
    case "name":
      playlists.sort(alphaSort);
      break;
    case "name-rev":
      playlists.sort(alphaRev);
      break;
    case "likes":
      playlists.sort(mostLiked);
      break;
    case "likes-rev":
      playlists.sort(leastLiked);
      break;
    case "date":
      playlists.sort(dateAdded);
      break;
  }
  document.getElementById("playlist-cards").innerHTML = ``;
  loadPlaylists(playlists);
});

function alphaSort(a, b) {
  if (a.playlist_name < b.playlist_name) {
    return -1;
  } else if (a.playlist_name > b.playlist_name) {
    return 1;
  }
  return 0;
}

function alphaRev(a, b) {
  if (a.playlist_name > b.playlist_name) {
    return -1;
  } else if (a.playlist_name < b.playlist_name) {
    return 1;
  }
  return 0;
}

function mostLiked(a, b) {
  if (a.likes > b.likes) {
    return -1;
  } else if (a.likes < b.likes) {
    return 1;
  }
  return 0;
}

function dateAdded(a, b) {
  if (a.playlistID > b.playlistID) {
    return -1;
  } else if (a.playlistID < b.playlistID) {
    return 1;
  }
  return 0;
}

function leastLiked(a, b) {
  if (a.likes < b.likes) {
    return -1;
  } else if (a.likes > b.likes) {
    return 1;
  }
  return 0;
}

// search bar functionality
const search = document.querySelector("#enter-search");
search.addEventListener("click", (event) => {
  filterPlaylists();
});

const clearSearch = document.querySelector("#clear-search");
clearSearch.addEventListener("click", () => {
  document.querySelector("#search-input").value = ""
  document.getElementById("playlist-cards").innerHTML = ``;
  loadPlaylists(playlists);
});

function filterPlaylists() {
  const searchRequest = document.querySelector("#search-input").value;

  const filteredList = playlists.filter((playlist) => {
    return (
      playlist.playlist_name
        .toLowerCase()
        .includes(searchRequest.toLowerCase()) ||
      playlist.playlist_author
        .toLowerCase()
        .includes(searchRequest.toLowerCase())
    );
  });
  document.getElementById("playlist-cards").innerHTML = ``;
  loadPlaylists(filteredList);
}
