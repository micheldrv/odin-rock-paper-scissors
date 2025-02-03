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

window.onload = () => {
  console.log("hello");
};
