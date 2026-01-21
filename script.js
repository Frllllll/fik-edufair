let playerScore = 0;
let computerScore = 0;

const choices = ['batu', 'kertas', 'gunting'];
const choiceEmojis = {
    batu: '🪨',
    kertas: '📄',
    gunting: '✂️'
};

const resultText = document.getElementById('result-text');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const playerChoiceDisplay = document.getElementById('player-choice-display');
const computerChoiceDisplay = document.getElementById('computer-choice-display');
const resetButton = document.getElementById('reset');

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        playGame(playerChoice);
    });
});

resetButton.addEventListener('click', resetGame);

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Display choices with animation
    playerChoiceDisplay.textContent = choiceEmojis[playerChoice];
    playerChoiceDisplay.classList.add('win'); // Temporary animation
    
    setTimeout(() => {
        computerChoiceDisplay.textContent = choiceEmojis[computerChoice];
        computerChoiceDisplay.classList.add('lose'); // Temporary animation
        
        setTimeout(() => {
            playerChoiceDisplay.classList.remove('win');
            computerChoiceDisplay.classList.remove('lose');
            
            const result = getResult(playerChoice, computerChoice);
            updateScore(result);
            displayResult(result, playerChoice, computerChoice);
        }, 500);
    }, 500);
}

function getResult(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'batu' && computer === 'gunting') ||
        (player === 'kertas' && computer === 'batu') ||
        (player === 'gunting' && computer === 'kertas')
    ) return 'win';
    return 'lose';
}

function updateScore(result) {
    if (result === 'win') playerScore++;
    else if (result === 'lose') computerScore++;

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    // Check for game end
    if (playerScore === 3) {
        winGame();
    } else if (computerScore === 3) {
        loseGame();
    }
}

function displayResult(result, playerChoice, computerChoice) {
    let message;
    if (result === 'win') {
        message = `Kamu menang! ${capitalize(playerChoice)} mengalahkan ${computerChoice}.`;
        resultText.classList.add('win');
    } else if (result === 'lose') {
        message = `Kamu kalah! ${capitalize(computerChoice)} mengalahkan ${playerChoice}.`;
        resultText.classList.add('lose');
    } else {
        message = `Seri! Kedua pemain memilih ${playerChoice}.`;
        resultText.classList.add('tie');
    }

    resultText.textContent = message;

    setTimeout(() => {
        resultText.classList.remove('win', 'lose', 'tie');
    }, 1000);
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    resultText.textContent = 'Pilih senjatamu!';
    playerChoiceDisplay.textContent = '';
    computerChoiceDisplay.textContent = '';
    // Re-enable buttons
    document.querySelectorAll('.choice').forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
    });
}

function winGame() {
    resultText.textContent = 'Selamat! Kamu menang permainan!';
    resultText.classList.add('win');
    // Disable buttons
    document.querySelectorAll('.choice').forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
    });
    // Add confetti effect
    createConfetti();
}

function loseGame() {
    resultText.textContent = 'Kamu kalah permainan. Coba lagi!';
    resultText.classList.add('lose');
    // Disable buttons
    document.querySelectorAll('.choice').forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
    });
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti-container';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Add some sound effects (optional, requires audio files)
// You can add audio files and uncomment this section
/*
const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');
const tieSound = new Audio('tie.mp3');

function playSound(result) {
    if (result === 'win') winSound.play();
    else if (result === 'lose') loseSound.play();
    else tieSound.play();
}
*/
