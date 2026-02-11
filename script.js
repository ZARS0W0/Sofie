const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

const YOUTUBE_VIDEO_ID = "myh5xtfUG-I";
let ytPlayer = null;
let musicStarted = false;

function startBackgroundMusic() {
    if (!ytPlayer || !ytPlayer.unMute || musicStarted) return;
    musicStarted = true;
    try {
        ytPlayer.unMute();
        ytPlayer.setVolume(parseInt(document.getElementById("volume-slider").value, 10));
        ytPlayer.playVideo();
    } catch (e) { }
}

function initYouTubePlayer() {
    if (ytPlayer) return;
    ytPlayer = new YT.Player("yt-player-wrap", {
        height: "1",
        width: "1",
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
        },
        events: {
            onReady: function (event) {
                const vol = parseInt(document.getElementById("volume-slider").value, 10);
                event.target.setVolume(vol);
                event.target.unMute();
                event.target.playVideo();
            },
        },
    });
}

function onYouTubeIframeAPIReady() {
    initYouTubePlayer();
}

if (typeof YT !== "undefined" && YT.Player) {
    initYouTubePlayer();
}

const volumeSlider = document.getElementById("volume-slider");
if (volumeSlider) {
    volumeSlider.addEventListener("input", function () {
        startBackgroundMusic();
        const vol = parseInt(this.value, 10);
        if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(vol);
    });
}

document.body.addEventListener("click", startBackgroundMusic, { once: true });
document.body.addEventListener("touchstart", startBackgroundMusic, { once: true });

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['💕', '💖', '💗', '💝', '💓'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

function createSparkle(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + (Math.random() - 0.5) * 50 + 'px';
        sparkle.style.top = y + (Math.random() - 0.5) * 50 + 'px';
        sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
}

setInterval(createFloatingHeart, 500);

envelope.addEventListener("click", () => {
    createSparkle(window.innerWidth / 2, window.innerHeight / 2);

    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
        if (ytPlayer && ytPlayer.playVideo) ytPlayer.playVideo();
    }, 50);
});

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

yesBtn.addEventListener("click", (e) => {
    createSparkle(e.clientX, e.clientY);

    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";
    finalText.style.display = "block";

    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
});
