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
//    document.getElementById('festivalName').innerText = festival.name;
//    document.getElementById('festivalImage').src = festival.imageUrl;
//    document.getElementById('festivalDates').innerText = `Dates: ${festival.dates}`;
//    document.getElementById('festivalLocation').innerText = `Location: ${festival.location}`;
//    document.getElementById('artistLineup').innerHTML = `<strong>Lineup:</strong> ${festival.lineup.join(', ')}`;
   modal.style.display = "block";
}

span.onclick = function() {
   modal.style.display = "none";
}

// make it so that you exit out only when clicking the "X"
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}


// iterate over data.playlists array

// create card for each playlist
