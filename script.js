const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let totalRounds = 5;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultTextEl = document.getElementById("result-text");
const roundsPlayedEl = document.getElementById("rounds-played");
const roundsSelect = document.getElementById("rounds");
const resetBtn = document.getElementById("reset");

function updateScores() {
    playerScoreEl.textContent = `Player: ${playerScore}`;
    computerScoreEl.textContent = `Computer: ${computerScore}`;
    roundsPlayedEl.textContent = `Round: ${roundsPlayed} / ${totalRounds}`;
}

function computerPlay() {
    // Randomly select rock, paper, or scissors
    // Math.random() generate 0-1, times 3 (length of choices), round down
    // to get an index and use that to get a choice from the chocues array
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection) {
    if (roundsPlayed >= totalRounds) {
        resultTextEl.textContent = "Game over! Please reset to play again.";
        return;
    }
    const computerSelection = computerPlay();
    let result = "";
    if (playerSelection === computerSelection) {
        result = "It's a tie!";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        result = "You win this round!";
        playerScore++;
    } else {
        result = "Computer wins this round!";
        computerScore++;
    }
    roundsPlayed++;
    updateScores();
    resultTextEl.textContent = `You chose ${playerSelection}, computer chose ${computerSelection}. ${result}`;
    if (roundsPlayed === totalRounds) {
        if (playerScore > computerScore) {
            resultTextEl.textContent += " You win the game!";
        } else if (playerScore < computerScore) {
            resultTextEl.textContent += " Computer wins the game!";
        } else {
            resultTextEl.textContent += " It's a tie game!";
        }
    }
}

document.getElementById("rock").onclick = () => playRound("rock");
document.getElementById("paper").onclick = () => playRound("paper");
document.getElementById("scissors").onclick = () => playRound("scissors");

resetBtn.onclick = () => {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    totalRounds = parseInt(roundsSelect.value, 10);
    updateScores();
    resultTextEl.textContent = "";
};

roundsSelect.onchange = () => {
    totalRounds = parseInt(roundsSelect.value, 10);
    resetBtn.click();
};

// Initialize display
updateScores();