document.addEventListener("DOMContentLoaded", () => {
    const mainPlayBtn = document.getElementById("main-play-btn");
    const playIcon = mainPlayBtn.querySelector("i");
    const playlistCards = document.querySelectorAll(".playlist-card");
    const playerCover = document.getElementById("player-cover");
    const playerTitle = document.getElementById("player-title");
    const playerArtist = document.getElementById("player-artist");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeText = document.getElementById("current-time");

    let isPlaying = false;
    let progressInterval = null;
    let currentSeconds = 0;

    // Toggle Play/Pause State
    function togglePlay() {
        isPlaying = !isPlaying;

        if (isPlaying) {
            playIcon.classList.remove("fa-play", "ml-0.5");
            playIcon.classList.add("fa-pause");
            startProgress();
        } else {
            playIcon.classList.remove("fa-pause");
            playIcon.classList.add("fa-play", "ml-0.5");
            clearInterval(progressInterval);
        }
    }

    // Progress Bar Simulation
    function startProgress() {
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (currentSeconds >= 225) { // 3:45 total duration
                currentSeconds = 0;
            } else {
                currentSeconds++;
            }

            const percent = (currentSeconds / 225) * 100;
            progressBar.style.width = `${percent}%`;

            const mins = Math.floor(currentSeconds / 60);
            const secs = currentSeconds % 60;
            currentTimeText.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
        }, 1000);
    }

    // Main Play Button Listener
    mainPlayBtn.addEventListener("click", togglePlay);

    // Card Selection Listener
    playlistCards.forEach((card) => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h3").textContent;
            const artist = card.querySelector("p").textContent;
            const imgSrc = card.querySelector("img").src;

            playerTitle.textContent = title;
            playerArtist.textContent = artist;
            playerCover.src = imgSrc;

            currentSeconds = 0;
            if (!isPlaying) togglePlay();
            else startProgress();
        });
    });
});