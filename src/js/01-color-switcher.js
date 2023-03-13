const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

const PROMPT_INTERVAL = 1000;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const colorSwitcher = () => {
  body.style.backgroundColor = getRandomHexColor();
};
startBtn.addEventListener('click', () => {
  timerId = setInterval(colorSwitcher, PROMPT_INTERVAL);
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
