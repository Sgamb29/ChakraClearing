
const chakras = [
    "Focus on Your Tailbone", "The Space Slightly Below The Belly Button", "Focus on the Space Below the Chest",
    "Focus on the Middle of the Chest", "Focus on The Middle of the Throat", "Focus on the Space Between Your Eyebrows",
    "Focus on the Top Of Your Head", "Become Aware of Your Aura Around You",
];

const extraSession = [
    "Focus on Your Feet", "Focus on Your Knees", "Focus on Your Seat", "Focus on Your Spine",
    "Focus on Your Shoulders", "Focus on Your Elbows", "Focus on Your Wrists", "Focus on Your Fingertips and Hands",
    "Focus on The Back of Your Neck", "Focus on The Top of Your Head", "Become Aware of Your Aura",
];

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"];

let chakraIndex = 0;
let timerId = 0;
let isPaused = false;
let toResume = false;
let secondsDone = 0; // For adjusting after pausing.

const output = document.getElementById("output");
const timerOutput = document.getElementById("timerOutput");
const colorIndicator = document.getElementById("colorIndicator");
const pauseBtn = document.getElementById("pauseBtn");

let delay = 15 * 1000; // Duration to hold chakra
let countdown = 15;

let sessionListToUse = chakras;

// Change delay
const delayChooser = document.getElementById("delayChooser");
delayChooser.addEventListener("click", () => {
    delay = delay === 15 * 1000 ? 30 * 1000 : 15 * 1000;
    countdown = countdown === 15 ? 30 : 15;
    delayChooser.style.backgroundColor = delayChooser.style.backgroundColor === "green" ? "white" : "green";
});

// Change session type
const sessionChooser = document.getElementById("sessionChooser");
sessionChooser.addEventListener("click", () => {
    sessionListToUse = sessionListToUse === chakras ? extraSession : chakras;
    sessionChooser.style.backgroundColor = sessionChooser.style.backgroundColor === "green" ? "white" : "green";
    colorIndicator.hidden = !colorIndicator.hidden;
})

function startChakraClearing() {
    if (!toResume) {
        delayChooser.disabled = !delayChooser.disabled;
        sessionChooser.disabled = !sessionChooser.disabled;
        if (timerId !== 0) {
            endSession();
            return;
        }
        pauseBtn.hidden = false;
        displayOutput();
    }
    
    duration = delay - secondsDone * 1000;
    timerId = setInterval(() => {
        countdown -= 1;
        timerOutput.innerText = countdown.toString();
        secondsDone += 1;
        // Changing to next chakra.
        if (secondsDone * 1000 >= delay) {
            chakraIndex += 1;
            chakraIndex = chakraIndex >= sessionListToUse.length ? 0 : chakraIndex;
            displayOutput();
            // Reset countdown
            countdown = delay / 1000;
            secondsDone = 0;
            timerOutput.innerText = countdown.toString(); 
        }
    }, 1000);

    if (toResume) {
        toResume = false;
    }
    document.getElementById("startBtn").innerText = "End Session";
}

function displayOutput() {
    output.innerText = sessionListToUse[chakraIndex];
    timerOutput.innerText = countdown.toString();
    if (sessionListToUse === chakras) {
        colorIndicator.style.backgroundColor = colors[chakraIndex];
    }
}

function endSession() {
    clearInterval(timerId);
    timerId = 0;
    chakraIndex = 0;
    output.innerText = "Great Job For The Session!";
    timerOutput.innerText = "";
    document.getElementById("startBtn").innerText = "Start Chakra Clearing";
    colorIndicator.style.backgroundColor = "white";
    countdown = delay / 1000;
    pauseBtn.hidden = true;
    pauseBtn.innerText = "Pause";
    toResume = false;
    isPaused = false;
    secondsDone = 0;
}

function pause() {
    if (!isPaused) {
        clearInterval(timerId);
        isPaused = true;
        pauseBtn.innerText = "Resume";
    } else {
        toResume = true;
        isPaused = false;
        pauseBtn.innerText = "Pause";
        startChakraClearing();
    }
}