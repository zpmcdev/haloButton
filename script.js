document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = new Audio();
    var playButton = document.getElementById('playButton');
    var volumeSlider = document.getElementById('volumeSlider');
    var previousButton = document.getElementById('previousButton');
    var nextButton = document.getElementById('nextButton');
    var musicList = ['Epilogue.mp3', 'finishTheFight.mp3', 'ghostsOfReach.mp3', 'halo.mp3', 'neverForget.mp3', 'peril.mp3', 'rememberance.mp3'];
    var currentSongIndex = 0;

    function playNextSong() {
        if (currentSongIndex < musicList.length) {
            audioPlayer.src = musicList[currentSongIndex];
            audioPlayer.play();
            currentSongIndex++;
        } else {
            currentSongIndex = 0;
        }
    }

    function playPreviousSong() {
        currentSongIndex = Math.max(0, currentSongIndex - 2); // Go back two songs
        playNextSong();
    }

    playButton.addEventListener('click', function () {
        if (audioPlayer.paused || audioPlayer.ended) {
            if (audioPlayer.currentTime > 0) {
                audioPlayer.play();
            } else {
                playNextSong();
            }
            playButton.classList.add('music-playing');
        } else {
            audioPlayer.pause();
            playButton.classList.remove('music-playing');
        }
    });

    previousButton.addEventListener('click', function () {
        playPreviousSong();
        playButton.classList.add('music-playing');
    });

    nextButton.addEventListener('click', function () {
        playNextSong();
        playButton.classList.add('music-playing');
    });

    audioPlayer.addEventListener('ended', function () {
        playNextSong();
        playButton.classList.add('music-playing');
    });

    volumeSlider.addEventListener('input', function () {
        audioPlayer.volume = parseFloat(volumeSlider.value);
    });
});
