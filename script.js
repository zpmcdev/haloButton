document.addEventListener("DOMContentLoaded", function () {
    var audioPlayer = new Audio();
    var playButton = document.getElementById("playButton");
    var volumeSlider = document.getElementById("volumeSlider");
    var previousButton = document.getElementById("previousButton");
    var nextButton = document.getElementById("nextButton");
    var timerDisplay = document.createElement("div"); // Create a new div for the timer
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // If it's a mobile device, hide the volume slider
        volumeSlider.style.display = "none";
    }

    // Set up the timer display
    timerDisplay.id = "timerDisplay";
    volumeSlider.parentNode.insertBefore(timerDisplay, volumeSlider.nextSibling); // Insert the timer after the volume slider
        
    var musicList = [
        "./src/music/Epilogue.mp3",
        "./src/music/ghostsOfReach.mp3",
        "./src/music/finishTheFight.mp3",
        "./src/music/halo.mp3",
        "./src/music/neverForget.mp3",
        "./src/music/rememberance.mp3",
        "./src/music/peril.mp3",
        "./src/music/aWalkInTheWoods.mp3",
        "./src/music/bridgeTooFar.mp3",
        "./src/music/cairoSuite.mp3",
        "./src/music/chooseWisely.mp3",
        "./src/music/elevated.mp3",
        "./src/music/exodus.mp3",
        "./src/music/haloReborn.mp3",
        "./src/music/heavyPricePaid.mp3",
        "./src/music/justBeyond.mp3",
        "./src/music/luck.mp3",
        "./src/music/neverForgetMidnightVersion.mp3",
        "./src/music/newAlexandria.mp3",
        "./src/music/openingSuite.mp3",
        "./src/music/perchanceToDream.mp3",
        "./src/music/theMaw.mp3",
        "./src/music/theWeapon.mp3",
        "./src/music/toSleep.mp3",
        "./src/music/tribute.mp3",
        "./src/music/whatMakesUsHuman.mp3",
        "./src/music/zetaHalo.mp3",
    ];
    var shuffledMusicList = shuffleArray(musicList); // Shuffled playlist
    var currentSongIndex = 0;
    var allSongsPlayed = false;

    function shuffleArray(array) {
        // Fisher-Yates shuffle algorithm
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }

        // Ensure 'ghostsOfReach.mp3' and 'rememberance.mp3' are not within 2 plays of each other
        for (let i = 0; i < shuffledArray.length - 1; i++) {
            if (
                (shuffledArray[i] === "./src/music/ghostsOfReach.mp3" &&
                    shuffledArray[i + 1] === "./src/music/rememberance.mp3") ||
                (shuffledArray[i] === "./src/music/rememberance.mp3" &&
                    shuffledArray[i + 1] === "./src/music/ghostsOfReach.mp3")
            ) {
                const nextIndex = i + 1;
                const newIndex =
                    Math.floor(Math.random() * (shuffledArray.length - nextIndex)) +
                    nextIndex;
                [shuffledArray[nextIndex], shuffledArray[newIndex]] = [
                    shuffledArray[newIndex],
                    shuffledArray[nextIndex],
                ];
            }
        }

        return shuffledArray;
    }

    var previousImageIndex = -1; // Initialize to an invalid index

    function changeBackgroundImage() {
        const backgroundImages = [
            "./src/imgs/chief3.jpg",
            "./src/imgs/chiefDoor.jpg",
            "./src/imgs/chiefStand.jpg",
            "./src/imgs/helmetGround.jpg",
            "./src/imgs/minimalist.png",
            "./src/imgs/battleForAlpha.png",
            "./src/imgs/chiefAndKai.png",
            "./src/imgs/chiefArmor.jpg",
            "./src/imgs/chiefShip.jpg",
            "./src/imgs/chiefUp.jpg",
            "./src/imgs/darkChief.jpeg",
            "./src/imgs/floatyPillar.jpg",
            "./src/imgs/ringDark.jpg",
            "./src/imgs/halo4.jpg",
            "./src/imgs/haloLandscape.jpg",
            "./src/imgs/mayhem.png",
            "./src/imgs/chiefAndCortana.jpg",
            "./src/imgs/boysOnHog.jpg",
            "./src/imgs/chiefBubble.jpg",
            "./src/imgs/chiefPurp.jpg",
            "./src/imgs/chiefRun.jpg",
            "./src/imgs/chiefSand.jpg"
        ];

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * backgroundImages.length);
        } while (randomIndex === previousImageIndex);

        previousImageIndex = randomIndex;

        // Create a new Image object to preload the image
        const preloadedImage = new Image();
        preloadedImage.src = backgroundImages[randomIndex];

        preloadedImage.onload = () => {
            document.body.style.transition = "background-image 1s ease-in-out";
            document.body.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;

            setTimeout(() => {
                document.body.style.transition = "";
            }, 1000);
        };
    }

    // Set the initial background image randomly
    changeBackgroundImage();

    function playNextSong() {
        if (currentSongIndex < shuffledMusicList.length) {
            audioPlayer.src = shuffledMusicList[currentSongIndex];
            audioPlayer.play();
            currentSongIndex++;

            changeBackgroundImage();
        } else {
            if (!allSongsPlayed) {
                currentSongIndex = 0;
                allSongsPlayed = true;
            } else {
                shuffledMusicList = shuffleArray(musicList);
                currentSongIndex = 0;
            }
            playNextSong();
        }
    }

    function playPreviousSong() {
        currentSongIndex = Math.max(0, currentSongIndex - 2);
        playNextSong();
    }

    playButton.addEventListener("click", function () {
        if (audioPlayer.paused || audioPlayer.ended) {
            if (audioPlayer.currentTime > 0) {
                audioPlayer.play();
            } else {
                playNextSong();
            }
            playButton.classList.add("music-playing");
        } else {
            audioPlayer.pause();
            playButton.classList.remove("music-playing");
        }
    });

    previousButton.addEventListener("click", function () {
        playPreviousSong();
        playButton.classList.add("music-playing");
    });

    nextButton.addEventListener("click", function () {
        playNextSong();
        playButton.classList.add("music-playing");
    });

    audioPlayer.addEventListener("ended", function () {
        playNextSong();
        playButton.classList.add("music-playing");
    });

    volumeSlider.addEventListener("input", function () {
        audioPlayer.volume = parseFloat(volumeSlider.value);
    });

    // Calculate the time difference between now and March 21st
    var march21st = new Date("2024-03-21T00:00:00");
    var countdownInterval = setInterval(updateTimer, 1000); // Update every second

    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

    function updateTimer() {
        var currentTime = new Date();
        var timeDifference = march21st - currentTime;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "We Finished The Fight";
        } else {
            var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Format time values with leading zeros
            const formattedDays = formatTime(days);
            const formattedHours = formatTime(hours);
            const formattedMinutes = formatTime(minutes);
            const formattedSeconds = formatTime(seconds);
            timerDisplay.textContent = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    }
});
