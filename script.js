const CHOICES = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  return CHOICES[random];
}

function getHumanChoice() {
  let choice;
  do {
    choice = prompt("Please select your choice (rock, paper, or scissors):")
      .trim()
      .toLowerCase();
  } while (!CHOICES.includes(choice));
  return choice;
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

function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (let i = 0; i < 5; i++) {
    playRound();
  }

  console.log(`Your score: ${humanScore}`);
  console.log(`Computer score: ${computerScore}`);
  console.log("Game result:");

  if (humanScore > computerScore) {
    console.log("You win the game!");
  } else if (humanScore < computerScore) {
    console.log("You lose the game!");
  } else {
    console.log("It's a draw!");
  }
}

window.onload = () => {
  console.log("Rock Paper Scissors");
  console.log("playGame() to play five rounds");
  console.log("playRound() to play a single round");
};
