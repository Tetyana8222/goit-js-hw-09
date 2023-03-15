import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const mins = document.querySelector('span[data-minutes]');
const secs = document.querySelector('span[data-seconds]');
let timerId = null;

startBtn.disabled = true;

//flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', countDownTimer);
      function countDownTimer() {
        timerId = setInterval(() => {
          const currentTime = new Date();
          //time difference
          const deltaTime = selectedDates[0] - currentTime;
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          updateTimerFace({ days, hours, minutes, seconds });
          if (deltaTime < 1000) {
            clearInterval(timerId);
          }
        }, 1000);
        console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }
  },
};

function updateTimerFace({ days, hours, minutes, seconds }) {
  days.textContent = `${days}`;
  hours.textContent = `${hours}`;
  mins.textContent = `${minutes}`;
  secs.textContent = `${seconds}`;
}
function addLeadingZero({ days, hours, minutes, seconds }) {
  return String({ days, hours, minutes, seconds }).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// return `${days}d ${hours}h ${minutes}m ${seconds}s`;
flatpickr(inputDate, options);
