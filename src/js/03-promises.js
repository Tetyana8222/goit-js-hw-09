import Notiflix from 'notiflix';

const form = document.querySelector('.form');
let delayInput = null;
let stepInput = null;
let amountInput = null;
// const firstDelayMs = document.querySelector('[name="delay"]');
// const delayStepMs = document.querySelector('[name="step"]');
// const amount = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let delayInput = Number(delay.value);
  let stepInput = Number(step.value);
  let amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayInput += stepInput;
  }
  event.currentTarget.reset();
}
