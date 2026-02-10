// Get out elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


//Build our functions
function togglePlay() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

function updateButton() {
    console.log('Change the button');
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

//Skips through the video by clicking the proper buttons or by clicking the left/right arrow keys
function skip(e) {

    //Handles skipping via button click
    if(e.keyCode == null) {
    // console.log(`Skipping ${this.dataset.skip} due to button click event`);
    video.currentTime += parseFloat(this.dataset.skip);
    }//if

    //Handles skipping via arrow key down
    else {
        //Left arrow key
        if(e.keyCode === 37) {
            // console.log(`Skipping ${skipButtons[0].dataset.skip} due to keyboard code ${e.keyCode} event`);
            video.currentTime += parseFloat(skipButtons[0].dataset.skip);
        }//if
        //Right arrow key
        else if(e.keyCode === 39)
        {
            // console.log(`Skipping ${skipButtons[1].dataset.skip} due to keyboard code ${e.keyCode} event`);
            video.currentTime += parseFloat(skipButtons[1].dataset.skip);
        }//else if

    }//else

}//skip

function handleRangeUpdate() {
    video[this.name] = this.value;
}//handleRangeUpdate

function handleProgress() {
    const percent = (video.currentTime / video.duration) *100;
    progressBar.style.flexBasis = `${percent}%`;
}//handleProgress

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

// Hook up the event listeners
video.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click',togglePlay);

video.addEventListener('timeupdate', handleProgress);


skipButtons.forEach(button => button.addEventListener('click', skip));
window.addEventListener('keydown', skip);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //? Arrow function first check if mousedown is true. If it is, contiune and run scrub(e)
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);