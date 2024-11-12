const questions = [
    {
        "question": "What is the largest planet in our solar system?",
        "options": ["Earth", "Venus", "Jupiter", "Mars"],
        "answer": "C",
        "solution": "Jupiter is the largest planet in our solar system."
    },
    {
        "question": "Who is known as the Father of Computers?",
        "options": ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
        "answer": "A",
        "solution": "Charles Babbage is known as the Father of Computers."
    },
    {
        "question": "What is the chemical symbol for water?",
        "options": ["O2", "H2O", "CO2", "NaCl"],
        "answer": "B",
        "solution": "The chemical symbol for water is H2O."
    },
    {
        "question": "In which continent is the Sahara Desert located?",
        "options": ["Asia", "Africa", "Australia", "South America"],
        "answer": "B",
        "solution": "The Sahara Desert is located in Africa."
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
        "answer": "C",
        "solution": "Leonardo da Vinci painted the Mona Lisa."
    },
    {
        "question": "What is the currency of Japan?",
        "options": ["Yen", "Won", "Rupee", "Dollar"],
        "answer": "A",
        "solution": "The currency of Japan is the Yen."
    },
    {
        "question": "What is the process by which plants make their own food?",
        "options": ["Respiration", "Photosynthesis", "Digestion", "Osmosis"],
        "answer": "B",
        "solution": "Plants make their own food through photosynthesis."
    },
    {
        "question": "Who is the author of the Harry Potter series?",
        "options": ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "C.S. Lewis"],
        "answer": "B",
        "solution": "J.K. Rowling is the author of the Harry Potter series."
    },
    {
        "question": "Which element has the atomic number 1?",
        "options": ["Oxygen", "Hydrogen", "Carbon", "Nitrogen"],
        "answer": "B",
        "solution": "The element with atomic number 1 is Hydrogen."
    },
    {
        "question": "Which country is known as the Land of the Rising Sun?",
        "options": ["China", "Japan", "South Korea", "India"],
        "answer": "B",
        "solution": "Japan is known as the Land of the Rising Sun."
    }
];

let currentQuestion = 0;
let answers = {};
let reviewFlags = {};
let visitedFlags = {};
let timerInterval;

function startExam() {
    document.getElementById("instructions-screen").style.display = "none";
    document.getElementById("exam-screen").style.display = "block";
    loadQuestion();
    startTimer(900); // 15 minutes
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question-text").innerText = question.question;
    document.getElementById("optionA").innerText = question.options[0];
    document.getElementById("optionB").innerText = question.options[1];
    document.getElementById("optionC").innerText = question.options[2];
    document.getElementById("optionD").innerText = question.options[3];

    const savedAnswer = answers[currentQuestion];
    document.querySelectorAll('input[name="option"]').forEach(input => {
        input.checked = input.value === savedAnswer;
    });

    if (!answers[currentQuestion] && !reviewFlags[currentQuestion]) {
        visitedFlags[currentQuestion] = true;
    }

    document.getElementById("question-nav").innerHTML = questions.map((_, index) =>
        `<button onclick="jumpToQuestion(${index})" id="nav-btn-${index}">${index + 1}</button>`
    ).join(" ");
    updateNavButtonColors();
}

function saveAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        answers[currentQuestion] = selected.value;
        delete reviewFlags[currentQuestion];
        delete visitedFlags[currentQuestion];
        document.getElementById(`nav-btn-${currentQuestion}`).classList.add("answered");
    }
    updateNavButtonColors();
}

function markForReview() {
    reviewFlags[currentQuestion] = !reviewFlags[currentQuestion];
    updateNavButtonColors();
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function jumpToQuestion(index) {
    saveAnswer();
    currentQuestion = index;
    loadQuestion();
}

function startTimer(seconds) {
    timerInterval = setInterval(() => {
        seconds--;
        document.getElementById("time").innerText = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
        if (seconds <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

function submitExam() {
    clearInterval(timerInterval);

    // Calculate the score
    let correctAnswers = 0;
    questions.forEach((q, i) => {
        if (answers[i] === q.answer) {
            correctAnswers++;
        }
    });

    const score = (correctAnswers / questions.length) * 100;
    const results = questions.map((q, i) => {
        const userAnswer = answers[i] || "No answer";
        const correct = userAnswer === q.answer;
        return `
            <div class="result-item">
                <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer} (${correct ? "Correct" : "Incorrect"})</p>
                <p><strong>Correct Answer:</strong> ${q.options[q.answer.charCodeAt(0) - 65]}</p>
                <p><strong>Solution:</strong> ${q.solution}</p>
            </div>
        `;
    }).join("");

    // Show results modal with score
    document.getElementById("results").innerHTML = `
        <h3>Your Score: ${score}%</h3>
        <p>Correct Answers: ${correctAnswers} out of ${questions.length}</p>
        <hr>
        ${results}
    `;
    document.getElementById("results-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("results-modal").style.display = "none";
}

function updateNavButtonColors() {
    questions.forEach((_, index) => {
        const btn = document.getElementById(`nav-btn-${index}`);
        if (answers[index]) btn.className = "answered";
        else if (reviewFlags[index]) btn.className = "review";
        else if (visitedFlags[index]) btn.className = "visited";
        else btn.className = "";
    });
}
