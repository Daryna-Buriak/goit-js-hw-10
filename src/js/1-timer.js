// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBttn = document.querySelector('.start-button');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startBttn.disabled = true;

let selectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    let dateDifference = selectedDates[0] - Date.now();
    if (dateDifference <= 0) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      //window.alert('Please choose a date in the future');
      startBttn.disabled = true;
    } else {
      startBttn.disabled = false;
    }

    selectedDate = selectedDates[0];
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

/*
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
// */
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function setTimerValues(days, hours, minutes, seconds) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

startBttn.addEventListener('click', event => {
  event.preventDefault();
  intervalId = setInterval(setTimeLeft, 1000, selectedDate);
});

function setTimeLeft(endDate) {
  let msLeft = endDate - Date.now();
  let convertedTimeLeft = convertMs(msLeft);

  setTimerValues(
    convertedTimeLeft.days,
    convertedTimeLeft.hours,
    convertedTimeLeft.minutes,
    convertedTimeLeft.seconds
  );

  if (msLeft > 0) {
    startBttn.disabled = true;
    input.disabled = true;
  } else {
    input.disabled = false;
    clearInterval(intervalId);

    setTimerValues(0, 0, 0, 0);
  }
}
