const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const stopButton = document.getElementById('stopButton');
const pauseButton = document.getElementById('pauseButton');
const volumeRange = document.getElementById('volumeRange');

const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
let voices = [];
let isPaused = false; // Track if the speech is paused

// Function to set the female voice
function setFemaleVoice() {
  voices = synth.getVoices();
  utterance.voice = voices.find(voice => voice.name.includes('Female')) || voices[0]; 
}

// Load voices when they become available
synth.onvoiceschanged = setFemaleVoice;

// Function to start reading the text
speakButton.addEventListener('click', () => {
  if (synth.speaking && !isPaused) {
    synth.cancel();
  }
  
  utterance = new SpeechSynthesisUtterance(textInput.value);
  utterance.rate = 1; // Set the speech rate
  utterance.pitch = 1; // Set the pitch
  utterance.volume = volumeRange.value; // Set the volume from the range input
  setFemaleVoice(); // Set female voice

  synth.speak(utterance);
  isPaused = false;
  pauseButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});

// Function to stop reading the text
stopButton.addEventListener('click', () => {
  synth.cancel();
  isPaused = false;
  pauseButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});

// Toggle pause and play
pauseButton.addEventListener('click', () => {
  if (synth.speaking) {
    if (!isPaused) {
      synth.pause();
      isPaused = true;
      pauseButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
      synth.resume();
      isPaused = false;
      pauseButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
  }
});

// Update the speech content dynamically as the user types
textInput.addEventListener('input', () => {
  if (synth.speaking && !isPaused) {
    synth.cancel();
    utterance.text = textInput.value;
    synth.speak(utterance);
  }
});

// Adjust the volume as the range input is changed
volumeRange.addEventListener('input', () => {
  utterance.volume = volumeRange.value; // Update volume dynamically
});
