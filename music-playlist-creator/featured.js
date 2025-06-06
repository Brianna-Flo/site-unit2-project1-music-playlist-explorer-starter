document.addEventListener("DOMContentLoaded", () => {
  // we use an arrow function so we can execute multiple functions
  updateFeatured();
});

// selected a playlist to feature
const selectFeatured = () => {
  let rand = Math.floor(Math.random() * playlists.length);
  return playlists[1];
  // return playlists[rand];
}

const updateFeatured = (playlist) => {
    console.log("in featured");
    const selectedPlaylist = selectFeatured();
    console.log("selected playlist")
    document.getElementById('featured-img').src = `${selectedPlaylist.playlist_art}`;
    document.getElementById('featured-name').innerText = `${selectedPlaylist.playlist_name}`
    loadSongs(selectedPlaylist.songs);
}

// const createFeatSong = (song) => {
//   const songElement = document.createElement("div");
//   songElement.className = "song outline";
//   songElement.innerHTML = `
//     <img class="song-img outline" src='${song.song_img}'/>
//     <div class="song-info">
//         <h4 class="no-space">${song.song_title}</h4>
//         <p class="no-space">${song.song_artist}</p>
//         <p class="no-space">${song.album}</p>
//     </div>
//     <p class="song-time">${song.time}</p>
//     `;
//   return songElement;
// };

// const loadFeatSongs = (songs) => {
//   const container = document.getElementById("playlist-songs");
//   for (const song of songs) {
//     let newSong = createFeatSong(song);
//     container.appendChild(newSong);
//   }
// };