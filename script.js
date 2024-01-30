document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = new Audio('halo.mp3');
    var playButton = document.getElementById('playButton');

    playButton.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.classList.add('music-playing'); // Add the 'music-playing' class when music is playing
        } else {
            audioPlayer.pause();
            playButton.classList.remove('music-playing'); // Remove the 'music-playing' class when music is paused
        }
    });
});
