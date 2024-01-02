document.addEventListener("DOMContentLoaded", function () {
    // HTML elements
    const highscoresList = document.getElementById("highscores");
    const clearButton = document.getElementById("clear");
  
    // This will display high scores
    function displayHighScores() {
      // Get high scores from local storage, or an empty array if none
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
      // This will clear existing list
      highscoresList.innerHTML = "";
  
      // This will enable the list of high scores to be populated
      highScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
        
        highscoresList.appendChild(listItem);
      });
    }
  
    // This function will clear high scores
    function clearHighScores() {
      // The will remove high scores from a local storage
      localStorage.removeItem("highScores");
  
      
      displayHighScores();
    }
  
    
    displayHighScores();
  
   
    clearButton.addEventListener("click", clearHighScores);
  });
  