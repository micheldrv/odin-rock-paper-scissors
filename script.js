let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  switch (random) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function getHumanChoice() {
  let choice;
  do {
    choice = prompt("Please select your choice (rock, paper, or scissors):")
      .trim()
      .toLowerCase();
  } while (!["rock", "paper", "scissors"].includes(choice));
  return choice;
}

function capitalize(word) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
}

function determineWinner(choice1, choice2) {
  const options = ["rock", "paper", "scissors"];

  const index1 = options.indexOf(choice1);
  const index2 = options.indexOf(choice2);

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

function playRound() {
  const humanChoice = getHumanChoice();
  const computerChoice = getComputerChoice();
  const result = determineWinner(humanChoice, computerChoice);
  switch (result) {
    case 1:
      console.log(
        `You win! ${capitalize(humanChoice)} beats ${computerChoice}`
      );
      humanScore += 1;
      break;
    case -1:
      console.log(
        `You lose! ${capitalize(computerChoice)} beats ${humanChoice}`
      );
      computerScore += 1;
      break;
    case 0:
      console.log(`Draw! Both have chosen ${humanChoice}`);
      break;
  }
}

window.onload = () => {
  console.log("hello");
};
