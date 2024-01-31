document.addEventListener("DOMContentLoaded", function () {
  var audioPlayer = new Audio();
  var playButton = document.getElementById("playButton");
  var volumeSlider = document.getElementById("volumeSlider");
  var previousButton = document.getElementById("previousButton");
  var nextButton = document.getElementById("nextButton");
  var musicList = [
    "./src/music/Epilogue.mp3",
    "./src/music/ghostsOfReach.mp3",
    "./src/music/finishTheFight.mp3",
    "./src/music/halo.mp3",
    "./src/music/neverForget.mp3",
    "./src/music/rememberance.mp3",
    "./src/music/peril.mp3",
  ];
  var shuffledMusicList = shuffleArray(musicList); // Shuffled playlist
  var currentSongIndex = 0;
  var allSongsPlayed = false;

  function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    let shuffledArray = array.slice(); // Create a copy of the original array
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
        // Swap the next song with another randomly selected song
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
      "./src/imgs/wallpaper.png",
    ];

    // Pick a random background image different from the previous one
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * backgroundImages.length);
    } while (randomIndex === previousImageIndex);

    // Update the previousImageIndex
    previousImageIndex = randomIndex;

    // Apply the new background image with a fade transition
    document.body.style.transition = "background-image 1s ease-in-out";
    document.body.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;

    // Remove the transition property after the transition is complete
    setTimeout(() => {
      document.body.style.transition = "";
    }, 1000);
  }

  function playNextSong() {
    if (currentSongIndex < shuffledMusicList.length) {
      audioPlayer.src = shuffledMusicList[currentSongIndex];
      audioPlayer.play();
      currentSongIndex++;

      // Change the background image when a new song starts
      changeBackgroundImage();
    } else {
      if (!allSongsPlayed) {
        // Play the original playlist once
        currentSongIndex = 0;
        allSongsPlayed = true;
      } else {
        // Shuffle the playlist for subsequent plays
        shuffledMusicList = shuffleArray(musicList);
        currentSongIndex = 0;
      }
      playNextSong();
    }
  }

  function playPreviousSong() {
    currentSongIndex = Math.max(0, currentSongIndex - 2); // Go back two songs
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
});
