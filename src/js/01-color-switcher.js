const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

const PROMPT_INTERVAL = 1000;
let timerId = null;
//функція з умови
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//створюємо функцію переключатель кольору
const colorSwitcher = () => {
  body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
  //timerId = setInterval(function, milliseconds);
  timerId = setInterval(colorSwitcher, PROMPT_INTERVAL);
  //deactivation of button
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  //activation of button
  startBtn.disabled = false;
});
