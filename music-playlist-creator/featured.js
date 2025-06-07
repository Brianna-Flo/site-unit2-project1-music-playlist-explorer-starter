document.addEventListener("DOMContentLoaded", () => {
  updateFeatured();
});

// Randomly select a playlist from array to feature
const selectFeatured = () => {
  let rand = Math.floor(Math.random() * playlists.length);
  return playlists[rand];
};

/**
 *
 * @param {*} playlist
 */
const updateFeatured = (playlist) => {
  const selectedPlaylist = selectFeatured();
  document.getElementById(
    "featured-img"
  ).src = `${selectedPlaylist.playlist_art}`;
  document.getElementById(
    "featured-name"
  ).innerText = `${selectedPlaylist.playlist_name}`;
  loadSongs(selectedPlaylist.songs);
};
