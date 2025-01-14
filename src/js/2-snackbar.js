// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.delay-input');
const createBtn = document.querySelector('.button-styles');

//console.dir(delayInput);
//console.dir(createBtn);

form.addEventListener('submit', event => {
  event.preventDefault();
  const selectedDelay = Number(delayInput.value);
  const state = document.querySelector('input[name="state"]:checked');
  const selectedState = state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        promise.then(
          iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${selectedDelay}ms`,
          })
        );
      } else {
        promise.catch(
          iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${selectedDelay}ms`,
          })
        );
      }
    }, selectedDelay);
    form.reset();
  });

  //console.log(selectedDelay);
  //console.log(state);
  //console.log(selectedState);
});
