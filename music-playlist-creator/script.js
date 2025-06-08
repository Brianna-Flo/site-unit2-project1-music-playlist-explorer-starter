// Given a list of playlist objects, creates cards and populates webpage
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
  // dynamically create new playlist card
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

// create a card for a given playlist
const createCard = (playlist) => {
  const playlistElement = document.createElement("section");
  playlistElement.className = "card outline";
  // add functionality to open modal when playlist card is clicked
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
  // if playlist previously liked, change heart appearance
  // used to keep likes consistent across searches and sorts
  if (playlist.isLiked) {
    playlistElement.querySelector("#like-btn").className = "fa-solid fa-heart";
    playlistElement.querySelector("#like-btn").style.color = "#ED254E";
  }
  // like button functionality when heart icon clicked
  playlistElement
    .querySelector("#like-btn")
    .addEventListener("click", (event) => {
      // prevent modal from opening
      event.stopPropagation();
      likePlaylist(playlistElement, playlist);
    });
  // functionality for edit icon
  playlistElement
    .querySelector("#edit-btn")
    .addEventListener("click", (event) => {
      // prevent modal from opening
      event.stopPropagation();
      editPlaylist(playlistElement, playlist);
    });
  // functionality for delete icon
  playlistElement
    .querySelector("#delete-btn")
    .addEventListener("click", (event) => {
      // prevent modal from opening
      event.stopPropagation();
      deletePlaylist(playlistElement);
    });
  return playlistElement;
};

// Displayed on the modal and featured page, dynamically render a playlist's songs
const loadSongs = (songs) => {
  const container = document.getElementById("playlist-songs");
  for (const song of songs) {
    let newSong = createSong(song);
    container.appendChild(newSong);
  }
};

// creates an element for a given song
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

// functionality to like and unlike a playlist
const likePlaylist = (newCard, playlist) => {
  if (!playlist.isLiked) {
    // if playlist not previously liked, change to solid red heart and increment likes
    newCard.querySelector("#like-btn").className = "fa-solid fa-heart";
    newCard.querySelector("#like-btn").style.color = "#ED254E";
    playlist.likes++;
    playlist.isLiked = true;
    newCard.querySelector("#like-cnt").innerText = `${playlist.likes}`;
  } else {
    // if playlist previously liked, change to black outline and decrement likes
    newCard.querySelector("#like-btn").className = "fa-regular fa-heart";
    newCard.querySelector("#like-btn").style.color = "#000000";
    playlist.likes--;
    playlist.isLiked = false;
    newCard.querySelector("#like-cnt").innerText = `${playlist.likes}`;
  }
}

// Deletes a given playlist element when trash button is clicked by removing element from DOM
const deletePlaylist = (playlistElement) => {
  const container = document.querySelector("#playlist-cards");
  container.removeChild(playlistElement);
}

// sort functionality added to select element
const chooseSort = document.querySelector("#sort-btn");
chooseSort.addEventListener("change", () => {
  switch (chooseSort.value) {
    case "alpha":
      playlists.sort(alphaSort);
      break;
    case "alpha-rev":
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
    case "none":
      break;
  }
  document.getElementById("playlist-cards").innerHTML = ``;
  loadPlaylists(playlists);
});

// comparator function to sort in A-Z order
function alphaSort(a, b) {
  if (a.playlist_name < b.playlist_name) {
    return -1;
  } else if (a.playlist_name > b.playlist_name) {
    return 1;
  }
  return 0;
}

// comparator function to sort in Z-A order
function alphaRev(a, b) {
  if (a.playlist_name > b.playlist_name) {
    return -1;
  } else if (a.playlist_name < b.playlist_name) {
    return 1;
  }
  return 0;
}

// comparator function to sort likes in descending order (most to least liked)
function mostLiked(a, b) {
  if (a.likes > b.likes) {
    return -1;
  } else if (a.likes < b.likes) {
    return 1;
  }
  return 0;
}

// comparator function to sort likes in ascending order (least to most liked)
function leastLiked(a, b) {
  if (a.likes < b.likes) {
    return -1;
  } else if (a.likes > b.likes) {
    return 1;
  }
  return 0;
}

// comparator function to sort from most recently added to least
function dateAdded(a, b) {
  if (a.playlistID > b.playlistID) {
    return -1;
  } else if (a.playlistID < b.playlistID) {
    return 1;
  }
  return 0;
}

// search bar functionality
// functionality for magnifying glass (click indicating search requested)
const searchEntered = document.querySelector("#enter-search");
searchEntered.addEventListener("click", (event) => {
  filterPlaylists();
});

// functionality for clear button (click indicating display all playlists)
const clearSearch = document.querySelector("#clear-search");
clearSearch.addEventListener("click", () => {
  // clear search bar
  document.querySelector("#search-input").value = "";
  // clear filtered playlist cards present
  document.getElementById("playlist-cards").innerHTML = ``;
  // load all playlists to DOM
  loadPlaylists(playlists);
});

/**
 * Filter playlists based on the search request
 */
function filterPlaylists() {
  const searchRequest = document.querySelector("#search-input").value;
  const filteredList = playlists.filter((playlist) => {
    let playlistNameMatch = playlist.playlist_name
      .toLowerCase()
      .includes(searchRequest.toLowerCase());
    let playlistAuthorMatch = playlist.playlist_author
      .toLowerCase()
      .includes(searchRequest.toLowerCase());
    return playlistNameMatch || playlistAuthorMatch;
  });
  // clear out playlists currently presented
  document.getElementById("playlist-cards").innerHTML = ``;
  // load playlists that contain input in name or author
  loadPlaylists(filteredList);
}
