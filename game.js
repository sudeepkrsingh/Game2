// Timer
//document.querySelector('button').addEventListener('click',  clearInterval(timerInterval),resetGame(),setInterval(startTimer,1000))
var countDownTime = Number(localStorage.getItem("Notime"));
// function startGuessTimer() {
//  document.querySelector('.guessSubmit').disabled = false;
// document.querySelector('.guessField').disabled = false;


var timerInterval = setInterval(startTimer, 1000);
// function timerInterval() { setInterval(startTimer, 1000) };
function startTimer() {

    countDownTime--
    document.querySelector(".timer").textContent = countDownTime + "s ";
    if (countDownTime == 0) {
        clearInterval(timerInterval);
        lastResult.textContent = '!Game Over!';
        lowOrHi.textContent = '';
        setGameOver();
    }
}

//}




// End of Timer Code
// Setting 
let setting = document.querySelector('#setting');
setting.style.backgroundColor = '#0f1c24';
setting.style.borderTopLeftRadius = "50px";
setting.style.borderTopRightRadius = "50px";
setting.style.position = 'absolute';
setting.style.top = '10px';
setting.style.left = '0px';
setting.style.right = '0px';
setting.style.margin = " auto";
document.querySelector('#setting-img').style.zIndex = '2';
document.querySelector('#setting-img').addEventListener('click', toggleSetting);

// Toggle Setting 
function toggleSetting() {
    if (setting.style.display == 'none') {
        setting.style.display = 'block';
        setting.style.width = 'fit-content';
        document.querySelector('#setting-img').title = 'Close Setting';
        document.querySelector('#setting-img').style.transform = "rotate(270deg)"
        setting.style.transition = "2s";
        setting.style.animation = "slidein 1s 1";
    }
    else {
        setting.style.display = 'none';
        document.querySelector('#setting-img').title = 'Show Setting';
        document.querySelector('#setting-img').style.transform = "rotate(360deg)"
        setting.style.transition = "2s";
    }
}
let guessTimer = document.querySelector('.timer');

// Apply Changes
function applyChanges() {
    if (Number(document.querySelector('#NOT').value) === 0 || Number(document.querySelector('#CRNR').value) === 0) {
        alert('Please Provide the both number of turns & system random number range before applying this setting')
    } else {
        clearInterval(timerInterval);
        document.querySelector(".timer").textContent = '00:00';
       // localStorage.removeItem("Notime");
        localStorage.setItem("Noturn", document.querySelector('#NOT').value);
        localStorage.setItem("Norange", document.querySelector('#CRNR').value);
        localStorage.setItem("Notime", document.querySelector('select').value);
        document.querySelector('#gameRule').textContent = "We have selected a random number between 1 and " + Number(localStorage.getItem("Norange")) + " See if you can guess it in " + Number(localStorage.getItem("Noturn")) + "  turns or fewer. We'll tell you if your guess was too high or too low."
        window.alert('Successfully Applied \nFeel free to guess a number');
        document.querySelector('#NOT').value = " ";
        document.querySelector('#CRNR').value = " ";
        resetGame();
        // clearInterval(timerInterval);
        // document.querySelector(".timer").textContent = '00:00';
        //document.querySelector('.guessSubmit').disabled = true;
       // document.querySelector('.guessField').disabled = true;
        // setInterval(startTimer, 1000);
        document.querySelector(".timer").textContent = '00:00';
        setInterval(startTimer, 1000);


    }
}



let randomNumber = Math.floor(Math.random() * Number(localStorage.getItem("Norange"))) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessTurn = document.querySelector('#UserGuessedTurns');
let user_result_table = document.querySelector('#user_result_table');
let hint = document.querySelector('.hint');
let guessCount = 1;
let resetButton;

// Guess
function checkGuess() {
    const userGuess = Number(guessField.value);
    showhint()
    if (userGuess === 0) {
        window.alert("Please Guess a Number! \n\nSelect number other than 0!")
    } else {
        if (guessCount === 1) {
            guesses.textContent = 'Recent guesses: ';
        }
        guesses.textContent += userGuess + ' ';
        if (userGuess === randomNumber) {
            lastResult.textContent = 'Congratulation! You got it right!';
            lastResult.style.color = 'green';
            lowOrHi.textContent = ' ';
            guessTurn.textContent = guessCount;
            var userName = prompt("Enter Your Name");
            var table = document.getElementById("user_result_table");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.textContent = userName;
            cell2.textContent = "ERROR!";
            cell3.textContent = guessCount;
            setGameOver();
        } else if (guessCount === Number(localStorage.getItem("Noturn"))) {
            lastResult.textContent = '!Game Over!';
            lowOrHi.textContent = '';
            setGameOver();
        } else {
            lastResult.textContent = "Wrong!";
            lastResult.style.color = 'red';
            if (randomNumber % 2 == 0) {
                hint.textContent = "The number is even!"
                hint.style.color = 'yellow';
            } else if (randomNumber % 3 == 0) {
                hint.textContent = "The number is divisible by 3!"
                hint.style.color = 'yellow';
            } else if (randomNumber % 5 == 0) {
                hint.textContent = "The number is divisible by 5!"
                hint.style.color = 'yellow';
            } else if (randomNumber % 7 == 0) {
                hint.textContent = "The number is divisible by 7!"
                hint.style.color = 'yellow';
            }
            if (userGuess < randomNumber) {
                lowOrHi.textContent = 'Last guess was too low!';
            } else if (userGuess > randomNumber) {
                lowOrHi.textContent = 'Last guess was too high!';
            }
        }
        guessCount++;
        guessField.value = '';
        guessField.focus();
    }
}
guessSubmit.addEventListener('click', checkGuess);
// Game Over Function
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start Guessing Again!';
    document.body.appendChild(resetButton);
    resetButton.style.padding = "10px";
    resetButton.style.borderRadius = "100px";
    resetButton.style.backgroundColor = "cornflowerblue";
    resetButton.style.color = "white";
    resetButton.style.fontSize = "15px";
    resetButton.style.border = "none";
    resetButton.addEventListener('click', resetGame);
    gameAns = document.createElement('p');
    gameAns.textContent = 'Correct Number: ' + randomNumber;
    document.body.appendChild(gameAns);
    gameAns.style.padding = "10px";
    gameAns.style.borderRadius = "100px";
    gameAns.style.backgroundColor = "green";
    gameAns.style.color = "white";
    gameAns.style.fontSize = "15px";
    gameAns.style.border = "none";
    countDownTime = Number(localStorage.getItem("Notime"));
    clearInterval(timerInterval);
}
// Reset Game
function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
    gameAns.parentNode.removeChild(gameAns);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    randomNumber = Math.floor(Math.random() * Number(localStorage.getItem("Norange"))) + 1;
    countDownTime = Number(localStorage.getItem("Notime"));
    clearInterval(timerInterval);
    setInterval(startTimer, 1000);
}
// Hint
function showhint() {
    if (document.querySelector('#showHint').checked == false) {
        hint.style.display = "none";
    } else {
        hint.style.display = "block";
    }
}



