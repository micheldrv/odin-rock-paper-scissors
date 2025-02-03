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

window.onload = () => {
  console.log("hello");
};
