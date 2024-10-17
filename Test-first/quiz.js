const questions = [
  {
      question: "What is the capital of France?",
      options: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
      answer: "C",
      explanation: "The capital of France is Paris.",
  },
  {
      question: "Which planet is known as the Red Planet?",
      options: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"],
      answer: "B",
      explanation: "Mars is known as the Red Planet.",
  },
  {
      question: "Who wrote 'Hamlet'?",
      options: ["A. Mark Twain", "B. Charles Dickens", "C. William Shakespeare", "D. Leo Tolstoy"],
      answer: "C",
      explanation: "William Shakespeare wrote 'Hamlet'.",
  },
  {
      question: "What is the largest ocean on Earth?",
      options: ["A. Atlantic Ocean", "B. Indian Ocean", "C. Arctic Ocean", "D. Pacific Ocean"],
      answer: "D",
      explanation: "The Pacific Ocean is the largest ocean on Earth.",
  },
  {
      question: "Which element has the chemical symbol 'O'?",
      options: ["A. Oxygen", "B. Gold", "C. Silver", "D. Iron"],
      answer: "A",
      explanation: "The chemical symbol 'O' stands for Oxygen.",
  },
  {
      question: "What is the powerhouse of the cell?",
      options: ["A. Nucleus", "B. Ribosome", "C. Mitochondria", "D. Golgi Apparatus"],
      answer: "C",
      explanation: "Mitochondria are known as the powerhouse of the cell.",
  },
  {
      question: "Who painted the Mona Lisa?",
      options: ["A. Vincent van Gogh", "B. Pablo Picasso", "C. Leonardo da Vinci", "D. Claude Monet"],
      answer: "C",
      explanation: "The Mona Lisa was painted by Leonardo da Vinci.",
  },
  {
      question: "What is the smallest prime number?",
      options: ["A. 0", "B. 1", "C. 2", "D. 3"],
      answer: "C",
      explanation: "The smallest prime number is 2.",
  },
  {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["A. Oxygen", "B. Carbon Dioxide", "C. Nitrogen", "D. Hydrogen"],
      answer: "B",
      explanation: "Plants absorb Carbon Dioxide during photosynthesis.",
  },
  {
      question: "What is the capital of Japan?",
      options: ["A. Beijing", "B. Seoul", "C. Tokyo", "D. Bangkok"],
      answer: "C",
      explanation: "The capital of Japan is Tokyo.",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 600; // 10 minutes = 600 seconds
let timerInterval;
let userAnswers = [];

// Instructions screen to quiz transition
document.getElementById('proceed-btn').addEventListener('click', function() {
  document.getElementById('instructions-container').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  startTimer();
  showQuestion();
});

function showQuestion() {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = currentQuestion.options.map(option =>
      `<label><input type="radio" name="option" value="${option.charAt(0)}"> ${option}</label><br>`
  ).join('');
  
  document.getElementById('prev-btn').classList.toggle('hidden', currentQuestionIndex === 0);
  document.getElementById('submit-btn').classList.toggle('hidden', currentQuestionIndex < questions.length - 1);
}

// Next Button: Move to the next question
document.getElementById('next-btn').addEventListener('click', function() {
  handleAnswer();
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      document.getElementById('quiz-container').classList.add('hidden');
      document.getElementById('submit-btn').classList.remove('hidden');
  }
});

// Skip Button: Skip the current question
document.getElementById('skip-btn').addEventListener('click', function() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      document.getElementById('quiz-container').classList.add('hidden');
      document.getElementById('submit-btn').classList.remove('hidden');
  }
});

// Previous Button: Go back to the previous question
document.getElementById('prev-btn').addEventListener('click', function() {
  if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
  }
});

// Submit Button: Show popup to confirm submission
document.getElementById('submit-btn').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'flex';
});

// Popup Cancel Button: Cancel submission
document.getElementById('cancel-btn').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});

// Popup Sure Button: Confirm submission
document.getElementById('sure-btn').addEventListener('click', function() {
  calculateScore();
  document.getElementById('popup').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('score').textContent = `${score.toFixed(2)} / ${questions.length}`;
  
  // Hide submit button after showing the result
  document.getElementById('submit-btn').classList.add('hidden');
});

function startTimer() {
  timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('time').textContent = timeLeft;

      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          document.getElementById('submit-btn').click();
      }
  }, 1000);
}

function handleAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  
  // Store user answers
  if (selectedOption) {
      userAnswers[currentQuestionIndex] = selectedOption.value;
  } else {
      userAnswers[currentQuestionIndex] = null; // Unanswered
  }
}

// Calculate score based on answers
function calculateScore() {
  score = 0;
  userAnswers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
          score += 1; // Correct answer
      } else if (answer === null) {
          score += 0; // Unanswered
      } else {
          score -= 0.25; // Incorrect answer
      }
  });
}

document.getElementById('view-solutions-btn').addEventListener('click', function() {
  const solutionsElement = document.getElementById('solutions');
  solutionsElement.classList.remove('hidden');
  solutionsElement.innerHTML = questions.map((q, index) => 
      `<p><strong>Q${index + 1}:</strong> ${q.explanation}</p>`
  ).join('');
});

// Initialize quiz
window.onload = function() {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('result').classList.add('hidden');
};
