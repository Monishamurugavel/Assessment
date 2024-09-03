document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Grab the input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation example
    if (username && email && password) {
        alert('Form submitted successfully!');
        // Here you would normally handle form submission
        // e.g., send data to the server or local storage
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('forgotPassword').addEventListener('click', function() {
    alert('Password recovery options will be available soon.');
    // Implement password recovery logic here
});

document.getElementById('createAccount').addEventListener('click', function() {
    alert('Account creation options will be available soon.');
    // Implement account creation logic here
});
document.getElementById('runDiagnostic').addEventListener('click', async function() {
    const feedback = document.getElementById('feedback');
    feedback.textContent = 'Running diagnostics...';

    try {
        // Run internet speed test
        const internetSpeed = await testInternetSpeed();

        // Check for camera access
        const cameraAccessible = await checkCameraAccess();

        // Check for microphone access
        const microphoneAccessible = await checkMicrophoneAccess();

        // Provide feedback based on the checks
        feedback.innerHTML = `
            <p><strong>Internet Speed:</strong> ${internetSpeed} Mbps</p>
            <p><strong>Camera:</strong> ${cameraAccessible ? 'Accessible' : 'Not Accessible'}</p>
            <p><strong>Microphone:</strong> ${microphoneAccessible ? 'Accessible' : 'Not Accessible'}</p>
        `;
    } catch (error) {
        feedback.textContent = 'An error occurred while running diagnostics.';
    }
});

// Function to test internet speed (placeholder implementation)
async function testInternetSpeed() {
    // This is a placeholder for an actual speed test implementation.
    // You can integrate with a speed test API or service.
    return new Promise((resolve) => {
        setTimeout(() => resolve('10'), 1000); // Example: returning 10 Mbps
    });
}

// Function to check for camera access
async function checkCameraAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        return false;
    }
}

// Function to check for microphone access
async function checkMicrophoneAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        return false;
    }
}
document.getElementById('startAssessment').addEventListener('click', function() {
    // Redirect to the assessment page or start the assessment
    alert('Starting the assessment...');
    // You might redirect to another page or trigger the assessment start logic here
    // window.location.href = 'assessment.html'; // Example redirection
});

document.getElementById('printInstructions').addEventListener('click', function() {
    window.print(); // Opens the print dialog for printing the page
});

document.getElementById('downloadInstructions').addEventListener('click', function() {
    // Create a downloadable file with instructions
    const instructionsText = `
        Assessment Guidelines and Rules

        Introduction:
        Please review the following guidelines and rules before starting the assessment:

        Guidelines:
        - Ensure you have a stable internet connection.
        - Read each question carefully before answering.
        - Manage your time effectively.
        - Follow all instructions provided during the assessment.

        Rules:
        - No external help or resources are allowed.
        - Cheating or plagiarism will result in disqualification.
        - Complete the assessment within the allotted time.
    `;
    
    const blob = new Blob([instructionsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Assessment_Instructions.txt';
    a.click();
    URL.revokeObjectURL(url);
});
document.getElementById('proceedButton').addEventListener('click', function() {
    // Simulate the activation of the AI proctoring system
    alert('The proctoring system is now starting. Please wait while we check your environment.');

    // Here you would typically start the proctoring system, 
    // possibly redirecting the user to a new page or initiating a check.

    // Example of redirecting to another page
    // window.location.href = 'proctoring_in_progress.html'; // Redirect to a new page
});
const questions = [
    { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
    { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], answer: 'Paris' },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let timerInterval;

function loadQuestion(index) {
    const question = questions[index];
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <fieldset>
            <legend>${question.question}</legend>
            ${question.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${option}" required>
                    ${option}
                </label><br>
            `).join('')}
        </fieldset>
    `;

    document.getElementById('prevButton').disabled = index === 0;
    document.getElementById('nextButton').disabled = index === questions.length - 1;
}

function startTimer(duration) {
    const timer = document.getElementById('timer');
    let timeLeft = duration;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            // Handle time expiration (e.g., auto-submit form)
            document.getElementById('assessmentForm').submit();
        }

        timeLeft -= 1;
    }, 1000);
}

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

document.getElementById('assessmentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    // Collect answers and process them here
    alert('Assessment submitted!');
});

window.onload = () => {
    loadQuestion(currentQuestionIndex);
    startTimer(1200); // Set timer for 20 minutes (1200 seconds)
};
document.addEventListener('DOMContentLoaded', function() {
    // Simulate the status of camera and microphone
    const cameraStatus = document.getElementById('cameraStatus');
    const microphoneStatus = document.getElementById('microphoneStatus');

    // Simulated status update function (replace with real status in production)
    function updateStatus() {
        // Simulate a real-time status update (in a real scenario, connect with actual monitoring services)
        setTimeout(() => {
            cameraStatus.querySelector('.status-text').textContent = 'Camera Active';
            microphoneStatus.querySelector('.status-text').textContent = 'Microphone Active';
        }, 1000);

        // Example of simulating status change
        setTimeout(() => {
            cameraStatus.querySelector('.status-text').textContent = 'Camera Inactive';
            microphoneStatus.querySelector('.status-text').textContent = 'Microphone Inactive';
        }, 5000);
    }

    // Start status updates
    updateStatus();
});
const questions = [
    { id: 1, text: 'What is your name?' },
    { id: 2, text: 'Describe your experience with the subject.' },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
const answers = {};

function loadQuestion(index) {
    const question = questions[index];
    const questionContent = document.getElementById('questionContent');
    
    if (!question) {
        questionContent.innerHTML = '<p>No more questions.</p>';
        return;
    }

    questionContent.innerHTML = `
        <label for="question${question.id}">${question.text}</label>
        <textarea id="question${question.id}" name="question${question.id}" rows="4" placeholder="Your response here"></textarea>
    `;

    document.getElementById('saveButton').disabled = !document.getElementById('question${questions[index].id}');
}

document.getElementById('saveButton').addEventListener('click', function() {
    const answer = document.querySelector('textarea').value;
    if (answer.trim() !== '') {
        answers[questions[currentQuestionIndex].id] = answer;
        alert('Response saved!');
    } else {
        alert('Please enter a response before saving.');
    }
});

document.getElementById('skipButton').addEventListener('click', function() {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
});

window.onload = () => {
    loadQuestion(currentQuestionIndex);
};
const answers = {
    1: 'John Doe',
    2: 'I have 5 years of experience in the subject.',
    // Populate with actual answers in a real scenario
};

function displayAnswers() {
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = Object.entries(answers).map(([questionId, answer]) => `
        <div class="answer">
            <strong>Question ${questionId}:</strong>
            <p>${answer}</p>
        </div>
    `).join('');
}

document.getElementById('reviewButton').addEventListener('click', () => {
    displayAnswers();
    document.getElementById('submitButton').style.display = 'inline-block';
});

document.getElementById('submitButton').addEventListener('click', () => {
    // Simulate form submission
    alert('Assessment submitted successfully!');
    // In a real scenario, you would submit the answers to the server here
    // Example: 
    // fetch('/submit', { method: 'POST', body: JSON.stringify(answers) })
    //     .then(response => response.json())
    //     .then(data => console.log('Success:', data))
    //     .catch((error) => console.error('Error:', error));
});

window.onload = () => {
    displayAnswers(); // Optionally display answers on page load
    document.getElementById('submitButton').style.display = 'none'; // Hide submit button initially
};
const submittedAnswers = {
    1: 'John Doe',
    2: 'I have 5 years of experience in the subject.',
    // Populate with actual submitted answers in a real scenario
};

const feedback = "Great job on the assessment. Your answers were well-structured and clear.";

function displayReview() {
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = `
        <div class="answers">
            <h2>Submitted Answers</h2>
            ${Object.entries(submittedAnswers).map(([questionId, answer]) => `
                <div class="answer">
                    <strong>Question ${questionId}:</strong>
                    <p>${answer}</p>
                </div>
            `).join('')}
        </div>
        <div class="feedback">
            <h2>Feedback</h2>
            <p>${feedback}</p>
        </div>
    `;
}

document.getElementById('printButton').addEventListener('click', () => {
    window.print();
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const content = document.querySelector('.review-container').innerHTML;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submission_results.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

window.onload = () => {
    displayReview();
};
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Dummy login validation
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "educator" && password === "password123") {
        // Hide login form and show dashboard
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert('Invalid username or password.');
    }
});
document.getElementById('questionType').addEventListener('change', function() {
    const selectedType = this.value;
    const multipleChoiceSection = document.getElementById('multipleChoiceOptions');
    const shortAnswerSection = document.getElementById('shortAnswerSection');
    const codingChallengeSection = document.getElementById('codingChallengeSection');

    // Hide all sections initially
    multipleChoiceSection.style.display = 'none';
    shortAnswerSection.style.display = 'none';
    codingChallengeSection.style.display = 'none';

    // Display the relevant section based on selected question type
    if (selectedType === 'multipleChoice') {
        multipleChoiceSection.style.display = 'block';
    } else if (selectedType === 'shortAnswer') {
        shortAnswerSection.style.display = 'block';
    } else if (selectedType === 'codingChallenge') {
        codingChallengeSection.style.display = 'block';
    }
});

document.getElementById('assessmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const questionType = document.getElementById('questionType').value;
    const questionText = document.getElementById('questionText').value;

    let assessmentData = {
        type: questionType,
        question: questionText
    };

    if (questionType === 'multipleChoice') {
        const options = [];
        for (let i = 1; i <= 4; i++) {
            options.push(document.querySelector(`input[name="option${i}"]`).value);
        }
        const correctOption = document.getElementById('correctOption').value;
        assessmentData.options = options;
        assessmentData.correctOption = correctOption;
    } else if (questionType === 'shortAnswer') {
        const correctAnswer = document.getElementById('correctAnswer').value;
        assessmentData.correctAnswer = correctAnswer;
    } else if (questionType === 'codingChallenge') {
        const codingInstructions = document.getElementById('codingInstructions').value;
        const exampleSolution = document.getElementById('exampleSolution').value;
        assessmentData.codingInstructions = codingInstructions;
        assessmentData.exampleSolution = exampleSolution;
    }

    console.log('Assessment Data:', assessmentData);
    alert('Assessment saved/uploaded successfully!');
});




