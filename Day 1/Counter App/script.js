var counterValue = 0;

function increment() {
  counterValue++;
  document.getElementById(
    "counterValue"
  ).innerText = `Counter Value :- ${counterValue}`;
}

function decrement() {
  counterValue--;
  document.getElementById(
    "counterValue"
  ).innerText = `Counter Value :- ${counterValue}`;
}

function reset() {
  counterValue = 0;
  document.getElementById(
    "counterValue"
  ).innerHTML = `Counter Value :- ${counterValue}`;
}
