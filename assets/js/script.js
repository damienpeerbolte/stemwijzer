const introScreen = document.getElementById('startPage');
const quizScreen = document.getElementById('quizPage');
const quizTitle = document.getElementById('questionTitle');
const question = document.getElementById('question');

var index = 0;

function startPage() {
    quizPage.style.display = "none";
    introScreen.style.display = "block";
}

function toQuiz() {
    introScreen.style.display = "none";
    quizPage.style.display = "block";
    quizTitle.innerHTML = index+1 + ". " + subjects[index].title;
    question.innerHTML = subjects[index].statement;
}

function nextQuestion() {
    if(index == 6) {
        console.log("Done");
    } else {
        index++;
        quizTitle.innerHTML = index+1 + ". " + subjects[index].title;
        question.innerHTML = subjects[index].statement;
    }
}
