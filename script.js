document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = new Audio('halo.mp3');
    var playButton = document.getElementById('playButton');

    playButton.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = 'Pause Song';
        } else {
            audioPlayer.pause();
            playButton.textContent = 'Play Song';
        }
    });
});
