let boxes = document.querySelectorAll(".box");
let restartGameButton = document.querySelector("#restart-game");
let newGameButton = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true;
let moves = 0;

const winnerPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const draw = () => {
  if (moves == 9) {
    msg.innerText = `Game Draw`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
  }
};

const checkWinner = () => {
  for (let pattern of winnerPattern) {
    let position1Value = boxes[pattern[0]].innerText;
    let position2Value = boxes[pattern[1]].innerText;
    let position3Value = boxes[pattern[2]].innerText;

    if (position1Value != "" && position2Value != "" && position3Value != "") {
      if (
        position1Value === position2Value &&
        position2Value === position3Value
      ) {
        showWinner(position1Value);
        return true;
      }
    }
  }

  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      moves++;
      box.disabled = true;
      if (!checkWinner()) {
        draw();
      }
    }
  });
});

const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const restart = () => {
  turnO = true;
  moves = 0;
  enabledBoxes();
  msgContainer.classList.add("hide");
};

restartGameButton.addEventListener("click", restart);
newGameButton.addEventListener("click", restart);
