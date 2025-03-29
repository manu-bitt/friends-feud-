import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [gameState, setGameState] = useState({
    player1Name: '',
    player2Name: '',
    currentPlayer: 1,
    questions: [],
    player1Answers: [],
    player2Answers: [],
    currentQuestionIndex: 0
  });

  // Handle page navigation
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  // Start new game
  const startGame = () => {
    if (!gameState.player1Name || !gameState.player2Name) {
      alert('Please enter both player names!');
      return;
    }

    setGameState({
      ...gameState,
      questions: getRandomQuestions(),
      currentQuestionIndex: 0,
      currentPlayer: 1,
      player1Answers: [],
      player2Answers: []
    });
    navigateToPage('quiz');
  };

  // Handle answer submission
  const submitAnswer = (selectedAnswer) => {
    const newState = { ...gameState };
    
    // Save answer for current player
    if (gameState.currentPlayer === 1) {
      newState.player1Answers.push(selectedAnswer);
    } else {
      newState.player2Answers.push(selectedAnswer);
    }

    // Move to next question or switch players
    if (newState.currentQuestionIndex === 9) { // Last question
      if (newState.currentPlayer === 1) {
        // Switch to player 2
        newState.currentPlayer = 2;
        newState.currentQuestionIndex = 0;
      } else {
        // Game complete, show results
        navigateToPage('results');
      }
    } else {
      // Move to next question
      newState.currentQuestionIndex += 1;
    }

    setGameState(newState);
  };

  // Calculate final score
  const calculateScore = () => {
    let matches = 0;
    for (let i = 0; i < 10; i++) {
      if (gameState.player1Answers[i] === gameState.player2Answers[i]) {
        matches++;
      }
    }
    const score = (matches / 10) * 100;

    // Determine which video to play based on score
    let videoSrc = '';
    let resultMessage = '';

    if (score >= 0 && score <= 20) {
        videoSrc = 'assets/vedios/1.mp4';
        resultMessage = 'Complete Strangers 😱';
    } else if (score > 20 && score <= 40) {
        videoSrc = 'assets/vedios/2.mp4';
        resultMessage = 'Barely Acquaintances 😅';
    } else if (score > 40 && score <= 60) {
        videoSrc = 'assets/vedios3.mp4';
        resultMessage = 'Casual Friends 🙂';
    } else if (score > 60 && score <= 75) {
        videoSrc = 'assets/vedios4.mp4';
        resultMessage = 'Good Friends 😊';
    } else if (score > 75 && score <= 85) {
        videoSrc = 'assets/vedios5.mp4';
        resultMessage = 'Best Friends 🤗';
    } else if (score > 85 && score <= 95) {
        videoSrc = 'assets/vedios6.mp4';
        resultMessage = 'Soul Friends 💫';
    } else {
        // score > 95
        videoSrc = 'assets/video7.mp4';
        resultMessage = 'Telepathic Connection 🔮';
    }

    return { score, videoSrc, resultMessage };
  };

  return (
    <div className="container">
      {currentPage === 'welcome' && (
        <WelcomePage onStart={() => navigateToPage('setup')} />
      )}

      {currentPage === 'setup' && (
        <SetupPage 
          onPlayerNamesSubmit={(p1, p2) => {
            setGameState({
              ...gameState,
              player1Name: p1,
              player2Name: p2
            });
            startGame();
          }}
        />
      )}

      {currentPage === 'quiz' && (
        <QuizPage
          currentPlayer={gameState.currentPlayer}
          playerName={gameState.currentPlayer === 1 ? gameState.player1Name : gameState.player2Name}
          question={gameState.questions[gameState.currentQuestionIndex]}
          questionNumber={gameState.currentQuestionIndex + 1}
          onAnswer={submitAnswer}
        />
      )}

      {currentPage === 'results' && (
        <ResultsPage
          player1Name={gameState.player1Name}
          player2Name={gameState.player2Name}
          player1Answers={gameState.player1Answers}
          player2Answers={gameState.player2Answers}
          questions={gameState.questions}
          score={calculateScore()}
          onPlayAgain={() => navigateToPage('welcome')}
        />
      )}
    </div>
  );
}

// Component for each page
function WelcomePage({ onStart }) {
  return (
    <div id="welcome-page" className="page">
      <header>
        <h1>Friend Feud</h1>
        <p className="subtitle">The Ultimate Friendship Test! 🤝✨</p>
      </header>
      {/* ... rest of welcome page content ... */}
      <button onClick={onStart}>Start The Fun!</button>
    </div>
  );
}

function SetupPage({ onPlayerNamesSubmit }) {
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');

  return (
    <div id="setup-page" className="page">
      <h2>Who's Playing?</h2>
      <input 
        value={p1Name}
        onChange={(e) => setP1Name(e.target.value)}
        placeholder="First Player's Name"
      />
      <input 
        value={p2Name}
        onChange={(e) => setP2Name(e.target.value)}
        placeholder="Second Player's Name"
      />
      <button onClick={() => onPlayerNamesSubmit(p1Name, p2Name)}>
        Let's Begin!
      </button>
    </div>
  );
}

function QuizPage({ currentPlayer, playerName, question, questionNumber, onAnswer }) {
  return (
    <div id="quiz-page" className="page">
      <div className="player-info">
        <h2>Player {currentPlayer}: {playerName}</h2>
        <div>Question {questionNumber}/10</div>
      </div>
      <div className="question">
        <h3>{question.question}</h3>
        <div className="choices">
          {question.choices.map((choice, index) => (
            <button 
              key={index}
              onClick={() => onAnswer(choice)}
              className="choice-button"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ 
  player1Name, 
  player2Name, 
  player1Answers, 
  player2Answers, 
  questions, 
  score, 
  onPlayAgain 
}) {
  return (
    <div id="results-page" className="page">
      <h2>Results</h2>
      <div className="score">Friendship Score: {score.score}%</div>
      <div className="result-message">{score.resultMessage}</div>
      <div className="answers">
        {questions.map((q, i) => (
          <div 
            key={i} 
            className={`result-item ${player1Answers[i] === player2Answers[i] ? 'matched' : ''}`}
          >
            <h4>{q.question}</h4>
            <p>{player1Name}: {player1Answers[i]}</p>
            <p>{player2Name}: {player2Answers[i]}</p>
          </div>
        ))}
      </div>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
}

export default App; 