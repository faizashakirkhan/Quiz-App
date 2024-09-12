var questions = [
    {
        question :"What is the correct syntax to declare a variable in JavaScript?",
        opt1: "var variableName;",
        opt2: "let variableName;",
        opt3: "const variableName;",
        opt4: "All of the above",
        ans :  "All of the above"
    },
    {
        question :"Which of the following is used to create an object in JavaScript?",
        opt1: "{}",
        opt2: "[]",
        opt3: "()",
        opt4: "< >",
        ans : "{}"
    },
    {
        question :" Which method is used to parse a string to an integer in JavaScript?",
        opt1: "parseInt()",
        opt2: "parseInteger()",
        opt3: "parseNumber()",
        opt4: "parseFloat()",
        ans : "parseInt()"
    },
    {
       question:"Which of the following is a server-side Java Script object?",
       opt1:"Function",
       opt2:"File",
       opt3:"FileUpload",
       opt4:"Date",
       ans:"File"
    },
    {
        question:"Which of the following is correct to write “Hello World” on the web page? ",
        opt1:"System.out.println(“Hello World”)",
        opt2:"print(“Hello World”)",
        opt3:"document.write(“Hello World”)",
        opt4:"Response.write(“Hello World”)",
        ans:"document.write(“Hello World”)"
    },
    {
    
        question:"How does Java Script store dates in objects of Date type?",
        opt1:"The number of days since January 1st, 1900",
        opt2:"The number of seconds since January 1st, 1970",
        opt3:"The number of milliseconds since January 1st, 1970",
        opt4:"The number of picoseconds since January 1st, 1970",
        ans:"The number of milliseconds since January 1st, 1970"
    },
    
    {
        question:"Which of the following is the tainted property of a window object in Java Script?",
        opt1:"Pathname",
        opt2:"Protocol",
        opt3:"Defaultstatus",
        opt4:"Host", 
        ans:"Defaultstatus"
    }
    
]
var index = 0;
var result = 0


var totalTime = 120; // Total quiz time in seconds (e.g., 2 minutes)
var timerInterval;

// Function to start the quiz
function startQuiz() {
    var startButton = document.getElementById("start-button");
    var container = document.getElementById("container");
    var timerDisplay = document.getElementById("timer");
    
    startButton.style.display = "none"; // Hide the start button
    container.style.display = "block";  // Show the quiz container
    timerDisplay.style.display = "block"; // Show the timer

    renderQues(); // Render the first question
    startTimer(); // Start the timer
}

// Function to render questions
function renderQues(){
    var container = document.getElementById("container");
    var option = document.getElementsByName("option");

    for(var i = 0; i < option.length; i++){
        if(option[i].checked){
            if(questions[index-1].ans === option[i].value){
                result++;
            }
        }
    }

    if(!questions[index]){
        calculateResult();
        return;
    }

    container.innerHTML = `
     <p class="question">${index+1})
     ${questions[index].question}</p><hr/>
        <div> <label for="opt1"><input type="radio" name="option" id="opt1" value="${questions[index].opt1}"> 
        ${questions[index].opt1}</label></div>
        <div> <label for="opt2"><input type="radio" name="option" id="opt2" value="${questions[index].opt2}">
        ${questions[index].opt2}</label></div>
        <div> <label for="opt3"><input type="radio" name="option" id="opt3" value="${questions[index].opt3}">
        ${questions[index].opt3}</label></div>
        <div> <label for="opt4"><input type="radio" name="option" id="opt4" value="${questions[index].opt4}">
        ${questions[index].opt4}</label></div>
        <button id="prev" class="mt-2 btn btn-primary" onclick="previousQuestion()">Previous</button>
        <button id="next" class="mt-2 btn btn-success" onclick="nextQuestion()">Next</button> `

    var prevButton = document.getElementById("prev");
    var nextButton = document.getElementById("next");
    
    prevButton.disabled = (index == 0 );
    
    if (index == questions.length - 1) {
        nextButton.innerHTML = "Submit";
    }
}

// Timer function
function startTimer() {
    var timeLeft = totalTime;
    var timeDisplay = document.getElementById("time-left");

    timerInterval = setInterval(function() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timeDisplay.innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            calculateResult(); // Automatically calculate result when time runs out
        }
        timeLeft--;
    }, 1000); // Updates every second
}

// Function to calculate result
function calculateResult() {
    clearInterval(timerInterval); // Stop the timer

    var container = document.getElementById("container");
    var resultContainer = document.getElementById("result-container");
    var score = document.getElementById("score");
    var percentage = ((result/questions.length)*100).toFixed(2); 

    container.style.display = "none"; // Hide quiz container
    resultContainer.style.display = "block"; // Show result container

    if(percentage > 70){
        score.innerHTML = "Congratulations! You passed the test.</br> You attempted " + result + " correct answers out of " + questions.length + " questions. </br> Your score is " + percentage + "%";
    } else {
        score.innerHTML = "Sorry! You failed the test.</br> You attempted " + result + " correct answers out of " + questions.length + " questions. </br> Your score is " + percentage + "%";
        score.style.color = "red";
    }
}
    


// Function to move to the next question
function nextQuestion(){
    index++;
    renderQues();
}

// Function to move to the previous question
function previousQuestion(){
    if(index > 0){
        index--;
        renderQues();
    }


    
}