let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    //Ensures the timer is shown when it is started. Otherwise it will take 1 second for the timer to start displaying
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        //Check if timer should stop
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }//if

        //Display the timer
        displayTimeLeft(secondsLeft);

    }, 1000);
}//timer

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;   

    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    //Ternerary operators add the leading zeros
    const display = `${hours < 10 ? '0' : ""}${hours}:${minutes < 10 ? '0' : ""}${minutes}:${remainderSeconds < 10 ? '0' : ""}${remainderSeconds}`;
    document.title = display;

    timerDisplay.textContent = display;

}//displayTimeLeft

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour
    const period = hour > 12 ? 'pm' : 'am';
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ""}${minutes+period}`;
}//displayEndTime

function startTimer() {
    timer(parseInt(this.dataset.time));
}//startTimer

buttons.forEach(button => button.addEventListener('click', startTimer));

//The form element has a name of 'customForm' allowing it to be called without query selector, and the input with name minutes can be called with document.customForm.minutes
document.customForm.addEventListener('submit', function(e) {
    //Stop page from reloading on submit
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});