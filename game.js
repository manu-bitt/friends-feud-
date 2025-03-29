let currentPlayer = 1;
let currentQuestion = 0;
let player1Name = '';
let player2Name = '';
let player1Answers = [];
let player2Answers = [];
let questions = [];

function startQuiz() {
    showScreen('name-screen');
}

function startGame() {
    player1Name = document.getElementById('player1').value.trim();
    player2Name = document.getElementById('player2').value.trim();
    
    if (!player1Name || !player2Name) {
        alert('Please enter both names!');
        return;
    }

    questions = getRandomQuestions();
    currentPlayer = 1;
    currentQuestion = 0;
    showScreen('quiz-screen');
    updateQuizDisplay();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function updateQuizDisplay() {
    const playerName = currentPlayer === 1 ? player1Name : player2Name;
    document.getElementById('current-player').textContent = `${playerName}'s Turn`;
    document.getElementById('question-number').textContent = currentQuestion + 1;
    document.getElementById('question-text').textContent = questions[currentQuestion].question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    questions[currentQuestion].choices.forEach((choice, index) => {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = choice;
        option.onclick = () => selectOption(option);
        optionsContainer.appendChild(option);
    });
}

function selectOption(option) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
}

function nextQuestion() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    if (currentPlayer === 1) {
        player1Answers.push(selectedOption.textContent);
    } else {
        player2Answers.push(selectedOption.textContent);
    }

    currentQuestion++;

    if (currentQuestion === 10) {
        if (currentPlayer === 1) {
            currentPlayer = 2;
            currentQuestion = 0;
            alert(`${player2Name}'s turn!`);
        } else {
            showResults();
            return;
        }
    }

    updateQuizDisplay();
}

function showResults() {
    showScreen('results-screen');
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    let matches = 0;
    for (let i = 0; i < 10; i++) {
        const isMatch = player1Answers[i] === player2Answers[i];
        if (isMatch) matches++;
        
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${isMatch ? 'match' : ''}`;
        resultItem.innerHTML = `
            <h4>${questions[i].question}</h4>
            <p>${player1Name}: ${player1Answers[i]}</p>
            <p>${player2Name}: ${player2Answers[i]}</p>
        `;
        resultsContainer.appendChild(resultItem);
    }

    const score = (matches / 10) * 100;
    
    // Get video element
    const videoElement = document.getElementById('result-video');
    const resultMessage = document.getElementById('result-message');
    
    // Set video source and message based on score
    if (score >= 0 && score <= 20) {
        videoElement.src = 'assets/video1.mp4';
        resultMessage.textContent = 'Complete Strangers 😱';
    } else if (score > 20 && score <= 40) {
        videoElement.src = 'assets/video2.mp4';
        resultMessage.textContent = 'Barely Acquaintances 😅';
    } else if (score > 40 && score <= 60) {
        videoElement.src = 'assets/video3.mp4';
        resultMessage.textContent = 'Casual Friends 🙂';
    } else if (score > 60 && score <= 75) {
        videoElement.src = 'assets/video4.mp4';
        resultMessage.textContent = 'Good Friends 😊';
    } else if (score > 75 && score <= 85) {
        videoElement.src = 'assets/video5.mp4';
        resultMessage.textContent = 'Best Friends 🤗';
    } else if (score > 85 && score <= 95) {
        videoElement.src = 'assets/video6.mp4';
        resultMessage.textContent = 'Soul Friends 💫';
    } else {
        videoElement.src = 'assets/video7.mp4';
        resultMessage.textContent = 'Telepathic Connection 🔮';
    }

    // Load and play the video
    videoElement.load();
    videoElement.play();

    // Display the score
    document.getElementById('final-score').textContent = 
        `Friendship Score: ${score}% (${matches} matching answers)`;
}

function playAgain() {
    player1Answers = [];
    player2Answers = [];
    showScreen('name-screen');
}

// Add these functions to handle player switching
function updateProgress() {
    const progress = ((currentQuestion + 1) / 10) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

function switchToPlayer2() {
    document.getElementById('player1-name-display').textContent = player1Name;
    document.getElementById('player2-name-display').textContent = player2Name;
    showScreen('transition-screen');
}

function startPlayer2Round() {
    currentPlayer = 2;
    currentQuestion = 0;
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global game instance
    window.game = new FriendFeudGame();
}); 