// start timer
//timer.js
function startTimer(){
    console.log('Starting session timer'); //debug log

    //check if timer already exists to prevent duplicates
    if(document.getElementById('sessionTimer')){
        console.log('Timer already exists, not creating a new one');
        return;
    }

    //initialize session timer at 0 seconds
    let sessionSeconds = 0;

    //create timer display element
    const timerElement = document.createElement('div');
    timerElement.id= "sessionTimer";
    timerElement.style.marginTop = "20px";
    timerElement.style.color = "var(--text-color)";
    timerElement.style.fontSize = "18px";
    timerElement.style.textAlign = "center";
    document.body.appendChild(timerElement);

    //update timer display initially
    updateTimerDisplay(timerElement, sessionSeconds);

    //update timer every second
    let timerInterval = setInterval(() => {
        sessionSeconds++;
        updateTimerDisplay(timerElement, sessionSeconds);

        //store current time in session storage
        sessionStorage.setItem('timeOnPage', sessionSeconds.toString());

        //trigger special message for long sessions (over 5 minutes)
        if(sessionSeconds === 300) {
            showLongSessionMessage();
        }
    }, 1000);
    //when page is about to unload, stop timer
    window.addEventListener('beforeunload', () => {
        console.log('Page unloading, stopping timer');//debug log
        clearInterval(timerInterval);
    });
}

function updateTimerDisplay(element, totalSeconds){
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    let timeText = `⏱ Time on page: `;

    if (hours > 0){
        timeText += `${hours}h`;
    }

    if (hours > 0 || minutes > 0){
        timeText += `${minutes}m`;
    }
    timeText += `${seconds}s`;

    element.textContent = timeText;
}

//show message for users spening a long time on the site
function showLongSessionMessage(){
    console.log('Showing long session message (5 minutes)'); //debug log

    //check if message already exists preventing duplicates
    if(document.getElementById('longSessionMessage')){
        console.log('Long session message already exists')
        return;
    }
    const messageDiv = document.createElement('div');
    messageDiv.id = "longSessionMessage";
    messageDiv.style.padding = '10px';
    messageDiv.style.margin = '20px 0';
    messageDiv.style.backgroundColor = 'var(--bg-color)';
    messageDiv.style.color = 'var(--button-text)';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.textAlign = 'center';
    messageDiv.innerHTML =`
    <p>You've been looking at the pokedex for 5 minutes! Thanks for your interest in The Pokedex.</p>
    <button id="dismissMessage" style="margin-top: 10px; padding: 5px 10px; border: none; border-radious: 4px; cursor: pointer;"> Dismiss </button>
    `;

//checkl if timer element already exists
const timerElement = document.getElementById('sessionTimer');
if(timerElement){
    document.body.insertBefore(messageDiv, timerElement);
} else {
    document.body.appendChild(messageDiv);
}
//add event listener to dismiss button
const dismissButton = document.getElementById('dismissMessage');
if(dismissButton)
{
    dismissButton.addEventListener('click', function() 
    {
        const message = document.getElementById('longSessionMessage');
        if (message)
        {
            message.remove();
        }
    });
}
    }


startTimer()