document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = new Audio();
    var playButton = document.getElementById('playButton');
    var volumeSlider = document.getElementById('volumeSlider');
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

    playButton.addEventListener('click', function () {
        if (audioPlayer.paused || audioPlayer.ended) {
            playNextSong();
            playButton.classList.add('music-playing');
        } else {
            audioPlayer.pause();
            playButton.classList.remove('music-playing');
        }
    });

    audioPlayer.addEventListener('ended', function () {
        playNextSong();
    });

    // Volume slider functionality
    volumeSlider.addEventListener('input', function () {
        audioPlayer.volume = parseFloat(volumeSlider.value);
    });
});
