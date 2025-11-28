

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
let changeId = 0;
let timerId = 0;

const output = document.getElementById("output");
const timerOutput = document.getElementById("timerOutput");
const colorIndicator = document.getElementById("colorIndicator");

let delay = 15 * 1000;
let countdown = 15;

let sessionListToUse = chakras;

// Change Delay
const delayChooser = document.getElementById("delayChooser");
delayChooser.addEventListener("click", () => {
    delay = delay === 15 * 1000 ? 30 * 1000 : 15 * 1000;
    countdown = countdown === 15 ? 30 : 15;
    delayChooser.style.backgroundColor = delayChooser.style.backgroundColor === "green" ? "white" : "green";
});

// Change Session
const sessionChooser = document.getElementById("sessionChooser");
sessionChooser.addEventListener("click", () => {
    sessionListToUse = sessionListToUse === chakras ? extraSession : chakras;
    sessionChooser.style.backgroundColor = sessionChooser.style.backgroundColor === "green" ? "white" : "green";
    colorIndicator.hidden = !colorIndicator.hidden;
})

function startChakraClearing() {
    delayChooser.disabled = !delayChooser.disabled;
    sessionChooser.disabled = !sessionChooser.disabled;
    if (timerId !== 0 & changeId !== 0) {
        clearInterval(timerId);
        clearInterval(changeId);
        timerId = 0;
        changeId = 0;
        chakraIndex = 0;
        output.innerText = "Great Job For The Session!";
        timerOutput.innerText = "";
        document.getElementById("startBtn").innerText = "Start Chakra Clearing";
        colorIndicator.style.backgroundColor = "white";
        countdown = delay / 1000;
        return;
    }

    
    output.innerText = sessionListToUse[chakraIndex];
    timerOutput.innerText = countdown.toString();
    if (sessionListToUse === chakras) {
        colorIndicator.style.backgroundColor = colors[chakraIndex];
    }
    
    timerId = setInterval(() => {
        countdown -= 1;
        timerOutput.innerText = countdown.toString();
    }, 1000)
    changeId = setInterval(() => {
        chakraIndex += 1;
        chakraIndex = chakraIndex >= sessionListToUse.length ? 0 : chakraIndex;
        output.innerText = sessionListToUse[chakraIndex]; 
        if (sessionListToUse === chakras) {
            colorIndicator.style.backgroundColor = colors[chakraIndex];
        }
        countdown = delay / 1000;
        timerOutput.innerText = countdown.toString(); 
    }, delay);

    document.getElementById("startBtn").innerText = "End Session";

}