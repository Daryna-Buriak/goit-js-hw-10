// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.delay-input');
const createBtn = document.querySelector('.button-styles');

form.addEventListener('submit', event => {
  event.preventDefault();
  const selectedDelay = Number(delayInput.value);
  const state = document.querySelector('input[name="state"]:checked');
  const selectedState = state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(selectedDelay);
      } else {
        reject(selectedDelay);
      }
    }, selectedDelay);
    form.reset();
  });

  promise
    .then(selectedDelay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${selectedDelay}ms`,
      });
    })
    .catch(selectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${selectedDelay}ms`,
      });
    });
});
