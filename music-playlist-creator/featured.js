// wait until page has populated with HTML elements before modifying them
document.addEventListener("DOMContentLoaded", () => {
  updateFeatured();
});

/**
 * Randomly select a playlist from "playlists" array to feature
 * @returns playlist object
 */
const selectFeatured = () => {
  let rand = Math.floor(Math.random() * playlists.length);
  return playlists[rand];
};

/**
 * Updates the webpage to present the featured playlist
 */
const updateFeatured = () => {
  const selectedPlaylist = selectFeatured();
  document.getElementById(
    "featured-img"
  ).src = `${selectedPlaylist.playlist_art}`;
  document.getElementById(
    "featured-name"
  ).innerText = `${selectedPlaylist.playlist_name}`;
  loadSongs(selectedPlaylist.songs);
};
