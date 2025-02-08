const CHOICES = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  return CHOICES[random];
}

function capitalize(word) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
}

function determineWinner(choice1, choice2) {
  const index1 = CHOICES.indexOf(choice1);
  const index2 = CHOICES.indexOf(choice2);

  // normalize the next and previous values to the range of choices
  const next = (index2 + 1 + 3) % 3;
  const previous = (index2 - 1 + 3) % 3;

  // the choice beats the next one and loses to the previous one
  // otherwise it's a draw
  if (index1 == next) {
    return 1;
  }
  if (index1 == previous) {
    return -1;
  }
  return 0;
}

function mainMenu() {
  document.querySelector("#start").removeAttribute("style");
  document.querySelector("#game").style.display = "none";
  document.querySelector("#credits").style.display = "none";
}

function startGame() {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#credits").style.display = "none";
  document.querySelector("#result-text").style.display = "none";
  document.querySelector("#result-text-below").style.display = "none";
  document.querySelector("#result-image-left").style.display = "none";
  document.querySelector("#result-image-right").style.display = "none";
  humanScore = 0;
  computerScore = 0;
  updateScore();
  document.querySelector("#game").removeAttribute("style");
  document.querySelector("#buttons").removeAttribute("style");
  enableButtons();
}

function credits() {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#game").style.display = "none";
  document.querySelector("#credits").removeAttribute("style");
}

async function playRound(humanChoice) {
  disableButtons();
  const computerChoice = getComputerChoice();
  const result = determineWinner(humanChoice, computerChoice);
  await playResultAnimation(humanChoice, computerChoice);

  switch (result) {
    case 1:
      humanScore += 1;
      break;
    case -1:
      computerScore += 1;
      break;
    case 0:
      //
      break;
  }

  updateScore();
  if (humanScore < 5 && computerScore < 5) {
    updateResultText(result, humanChoice, computerChoice);
    enableButtons();
  } else {
    gameOver(humanScore == 5);
  }
}

async function playResultAnimation(humanChoice, computerChoice) {
  const left = document.querySelector("#result-image-left");
  const right = document.querySelector("#result-image-right");

  left.src = "assets/images/rock.svg";
  right.src = "assets/images/rock.svg";

  left.style.display = "block";
  right.style.display = "block";
  left.style.animation = "result-left 0.5s 3";
  right.style.animation = "result-right 0.5s 3";

  await new Promise((r) => setTimeout(r, 1250));

  if (humanChoice != "rock") {
    left.src = `assets/images/${humanChoice}.svg`;
  }
  if (computerChoice != "rock") {
    right.src = `assets/images/${computerChoice}.svg`;
  }

  await new Promise((r) => setTimeout(r, 300));

  left.style.animation = "";
  right.style.animation = "";
}

function updateResultText(result, humanChoice, computerChoice) {
  const textTop = document.querySelector("#result-text");
  const textBottom = document.querySelector("#result-text-below");

  textTop.removeAttribute("style");
  textBottom.removeAttribute("style");

  if (result == 1) {
    textTop.textContent = "You won the round!";
    textBottom.textContent = `${capitalize(
      humanChoice
    )} beats ${computerChoice}`;
  } else if (result == -1) {
    textTop.textContent = "You lost the round!";
    textBottom.textContent = `${capitalize(
      computerChoice
    )} beats ${humanChoice}`;
  } else {
    textTop.textContent = "The round is a draw!";
    textBottom.style.display = "none";
  }
}

function gameOver(win) {
  const textTop = document.querySelector("#result-text");
  const textBottom = document.querySelector("#result-text-below");
  const buttons = document.querySelector("#buttons");

  textTop.removeAttribute("style");
  textBottom.style.display = "none";
  buttons.style.display = "none";

  if (win) {
    textTop.textContent = "You won the game!";
  } else {
    textTop.textContent = "You lost the game!";
  }
}

function updateScore() {
  document.querySelector("#score-player").textContent = humanScore.toString();
  document.querySelector("#score-computer").textContent =
    computerScore.toString();
}

function disableButtons() {
  for (const id of ["#rock", "#paper", "#scissors"]) {
    document.querySelector(id).disabled = true;
  }
}

function enableButtons() {
  for (const id of ["#rock", "#paper", "#scissors"]) {
    document.querySelector(id).disabled = false;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#start-button").addEventListener("click", (event) => {
    event.preventDefault();
    startGame();
  });

  document
    .querySelector("#credits-button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      credits();
    });

  document
    .querySelector("#credits-return")
    .addEventListener("click", (event) => {
      event.preventDefault();
      mainMenu();
    });

  document.querySelector("#game-return").addEventListener("click", (event) => {
    event.preventDefault();
    mainMenu();
  });

  document.querySelector("#rock").addEventListener("click", (event) => {
    event.preventDefault();
    playRound("rock");
  });

  document.querySelector("#paper").addEventListener("click", (event) => {
    event.preventDefault();
    playRound("paper");
  });

  document.querySelector("#scissors").addEventListener("click", (event) => {
    event.preventDefault();
    playRound("scissors");
  });
});
