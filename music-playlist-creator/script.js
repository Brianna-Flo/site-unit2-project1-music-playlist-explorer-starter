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
const loadPlaylists = () => {
    if (playlists.length === 0) {
        const mainBody = document.querySelector("main");
        mainBody.innerHTML = `
            <p>No playlists have been added</p>
        `;
    }
    let count = 0;
    const container = document.getElementById('playlist-cards');
    let row;
    for (const playlist of playlists) {
        if (count % 4 === 0) {
            row = document.createElement('section');
            row.className = 'card-row';
            container.appendChild(row);
        }
        // create a new card
        let newCard = createCard(playlist);
        // add card to container
        row.appendChild(newCard);
        count++;
    }
}

// create card for each playlist
const createCard = (playlist) => {
    const playlistElement = document.createElement('section');
    playlistElement.className = "card outline";
    playlistElement.onclick = function() {openModal()};
    playlistElement.innerHTML = `
        <img class="outline" id="playlist-photo" src='${playlist.playlist_art}'/>
        <h3 class="no-space">${playlist.playlist_name}</h3>
        <p class="no-space">${playlist.playlist_author}</p>
        <section class="likes no-space">
            <img class="outline" id="heart" />
            <p id="like-count">likes</p>
        </section>
    `;
    return playlistElement;
}

// execute only once all content loaded
document.addEventListener("DOMContentLoaded", () => {  // we use an arrow function so we can execute multiple functions
    loadPlaylists();
});