// Selectors
const officeTitleSticker = document.querySelector(".tap-me-sticker");
const officeQuote = document.querySelector(".office-quote");
const officeChar = document.querySelector(".office-charc");
const shuffleBtn = document.querySelector(".shuffle-btn");
const episodeBtn = document.querySelector(".episode-button");
const closeBtn = document.querySelector(".close-button");
const episodeContainer = document.querySelector(".office-episodes");
const episodeMainContainer = document.querySelector(
  ".office-episodes-container"
);
const officeAudio = document.querySelector(".office-audio");

// API
const officeApiQuotes = "https://www.officeapi.dev/api/quotes/random";
const officeEpiList = "https://www.officeapi.dev/api/episodes";

// Event Listeners
shuffleBtn.addEventListener("click", getQuotes);
episodeBtn.addEventListener("click", episodeList);
closeBtn.addEventListener("click", toggleEpisodes);
officeTitleSticker.addEventListener("click", playAudio);

// Functions
// Play audio
function playAudio() {
  officeTitleSticker.classList.toggle("active");
  if (officeTitleSticker.classList.contains("active")) {
    officeAudio.play();
    officeTitleSticker.innerText = "Pause";
    officeTitleSticker.style.animation = "turnaround 3s linear infinite";
  } else {
    officeAudio.pause();
    officeTitleSticker.innerText = "Tap Me!";
    officeTitleSticker.style.animation = "none";
  }
}

// Get quotes
function getQuotes() {
  fetch(officeApiQuotes)
    .then((response) => response.json())
    .then((data) => {
      officeQuote.innerText = data.data.content;
      officeChar.innerText = `- ${data.data.character.firstname} ${data.data.character.lastname}`;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// Get episodes
function episodeList() {
  fetch(officeEpiList)
    .then((response) => response.json())
    .then((data) => {
      let totalData = data.data;
      totalData.map((episode) => {
        // Create new div
        const newEpisodeDiv = document.createElement("div");
        newEpisodeDiv.classList.add("office-episode");
        episodeContainer.append(newEpisodeDiv);
        // Create h1 for title
        const episodeTitle = document.createElement("h1");
        episodeTitle.classList.add("episode-title");
        episodeTitle.innerText = episode.title;
        newEpisodeDiv.append(episodeTitle);
        // Create p for desc
        const episodeDesc = document.createElement("p");
        episodeDesc.classList.add("episode-desc");
        episodeDesc.innerText = episode.description;
        newEpisodeDiv.append(episodeDesc);
        // Create span for more-info
        const episodeInfo = document.createElement("span");
        episodeInfo.classList.add("episode-info");
        episodeInfo.innerText = `${episode.director.role}: ${episode.director.name}`;
        newEpisodeDiv.append(episodeInfo);
        // hide episodes button
        episodeBtn.style.display = "none";
        closeBtn.style.display = "inline";
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// toggle buttons
function toggleEpisodes() {
  episodeMainContainer.classList.toggle("active");
  if (!episodeMainContainer.classList.contains("active")) {
    episodeContainer.style.display = "none";
    closeBtn.innerText = "S1. Episodes";
  } else {
    episodeContainer.style.display = "inline-flex";
    closeBtn.innerText = "Close List";
  }
}
