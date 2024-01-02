document.addEventListener("DOMContentLoaded", function () {
    // HTML elements
    const startBtn = document.getElementById("start");
    const timerElement = document.getElementById("time");
    const questionTitle = document.getElementById("question-title");
    const choicesContainer = document.getElementById("choices");
    const feedbackElement = document.getElementById("feedback");
    const initialsInput = document.getElementById("initials");
    const submitBtn = document.getElementById("submit");
    const endScreen = document.getElementById("end-screen");
    const finalScoreElement = document.getElementById("final-score");
  
    // Variables to keep track of the quiz state
    let currentQuestionIndex = 0;
    let time = 60; 
    let timerInterval;
    let score = 0;
  
    // Function to start the quiz
    function startQuiz() {
      startBtn.style.display = "none";
      document.getElementById("start-screen").classList.add("hide");
      document.getElementById("questions").classList.remove("hide");
      timerInterval = setInterval(updateTimer, 1000);
      displayQuestion();
    }
  
    // This is to display a question
    function displayQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
  
      if (currentQuestion) {
        questionTitle.textContent = currentQuestion.question;
        choicesContainer.innerHTML = "";
  
        // Buttons for choices
        currentQuestion.choices.forEach((choice, index) => {
          const button = document.createElement("button");
          button.textContent = choice;
          button.addEventListener("click", () => checkAnswer(index));
          choicesContainer.appendChild(button);
        });
      } else {
        endQuiz();
      }
    }
  
    // This function is to check the players answer
    function checkAnswer(choiceIndex) {
      const currentQuestion = questions[currentQuestionIndex];
  
      // This is to check if the chosen answer is correct
      if (currentQuestion.correctAnswerIndex === choiceIndex) {
        feedbackElement.textContent = "Correct!";
        score += 10;
      } else {
        feedbackElement.textContent = "Incorrect!";
        time -= 10;
      }
  
      // This will present feedback then move to the next question
      feedbackElement.classList.remove("hide");
      setTimeout(() => {
        feedbackElement.classList.add("hide");
        currentQuestionIndex++;
        displayQuestion();
      }, 1000);
    }
  
    // This function will update the timer
    function updateTimer() {
      timerElement.textContent = time;
  
      // This will end the quiz when time runs out
      if (time <= 0) {
        endQuiz();
      } else {
        time--;
      }
    }
  
    // This function is to end the quiz
    function endQuiz() {
      clearInterval(timerInterval);
      document.getElementById("questions").classList.add("hide");
      endScreen.classList.remove("hide");
      finalScoreElement.textContent = score;
    }
  
    // This will save high scores
    function saveHighScore() {
      const initials = initialsInput.value.trim();
  
      if (initials !== "") {
        // This will obtain the existing high scores or initialize an empty array
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        // Create a new score object
        const newScore = { initials, score };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        // Redirect to the high scores page
        window.location.href = "highscores.html";
      }
    }
  
    // Event listeners for button clicks
    startBtn.addEventListener("click", startQuiz);
    submitBtn.addEventListener("click", saveHighScore);
  });
  