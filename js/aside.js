const audio = document.getElementById("audio");
const clock = document.getElementById("clock");
const timeForm = document.querySelector(".time-form");
const hoursInput = document.querySelector(".hours-input");
const minutesInput = document.querySelector(".minutes-input");
const secondsInput = document.querySelector(".seconds-input");
const playBtn = document.getElementById("play");
const maps = document.querySelectorAll(".map");
const coverImg = document.querySelector(".cover-img");
const soundTitle = document.querySelector(".music-title");

const sounds = ["break", "forest", "freedom", "morning"];

let soundTime = 0;
let flowTime = 0;

let getHours = 0;
let getMinutes = 0;
let getSeconds = 0;

let timerId;

const SHOW_PLAY_BTN = true;
const HIDDEN_PLAY_BTN = false;

for (let i = 0; i < sounds.length; i++) {
  maps[i].addEventListener("click", () => {
    stopSound();
    setupSoundName(i);
    initTime();
    printTimeForm(SHOW_PLAY_BTN);
    printSoundInfo(i);
  });
}

function playSound() {
  audio.volume = 0.5;
  audio.loop = true;
  audio.play();
}

function stopSound() {
  audio.pause();
  audio.currentTime = 0;
}

function setupSoundName(index) {
  audio.src = `./sounds/${sounds[index]}.mp3`;
}

function initTime() {
  if (timerId) {
    clearInterval(timerId);
  }

  soundTime = 0;
  flowTime = 0;

  getHours = Math.floor(hoursInput.value);
  getMinutes = Math.floor(minutesInput.value);
  getSeconds = Math.floor(secondsInput.value);

  soundTime += getHours * 3600;
  soundTime += getMinutes * 60;
  soundTime += getSeconds;

  formetText(getHours, getMinutes, getSeconds);
}

function formetText(getHours, getMinutes, getSeconds) {
  getHours = String(getHours).padStart(2, "0");
  getMinutes = String(getMinutes).padStart(2, "0");
  getSeconds = String(getSeconds).padStart(2, "0");

  clock.innerText = `${getHours}:${getMinutes}:${getSeconds}`;
}

function printTimeForm(isNotHidden) {
  if (isNotHidden === true) {
    timeForm.classList.remove("hidden");
    playBtn.disabled = false;
  } else {
    timeForm.classList.add("hidden");
    playBtn.disabled = true;
  }
}

function printSoundInfo(index) {
  coverImg.src = `./images/covers/${sounds[index]}.jpg`;
  coverImg.alt = `${sounds[index]}`;
  soundTitle.innerText = sounds[index];
}

timeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  initTime();
  playSound();
  printTimeForm(HIDDEN_PLAY_BTN);

  timerId = setInterval(() => {
    getHours = Math.floor(soundTime / 3600);
    getMinutes = Math.floor(soundTime % 3600 / 60);
    getSeconds = Math.floor(soundTime % 3600 % 60);

    getHours = String(getHours).padStart(2, "0");
    getMinutes = String(getMinutes).padStart(2, "0");
    getSeconds = String(getSeconds).padStart(2, "0");

    formetText(getHours, getMinutes, getSeconds);

    if (soundTime === 0) {
      stopSound();
      clearInterval(timerId);
      clock.innerText = "Finish🎉";
    } else {
      soundTime--;
    }
  }, 1000);
});

setupSoundName(0);
printSoundInfo(0);