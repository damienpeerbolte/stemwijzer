const introScreen = document.getElementById('startPage');
const quizScreen = document.getElementById('quizPage');
const quizTitle = document.getElementById('questionTitle');
const question = document.getElementById('question');
const impQuestion = document.getElementById('importantQuestion');
const partiesPage = document.getElementById('chooseParties');

var answers = [];
var index = 0;
var eens = document.getElementById('agree');
var oneens = document.getElementById('disagree');
var neither = document.getElementById('neither');
var impTitleList = document.getElementById('importantTitles');

// this is basicly the index page
function startPage() {
    quizPage.style.display = "none";
    introScreen.style.display = "block";
}

// this is the page where the questions will be displayed
function toQuiz() {
    introScreen.style.display = "none";
    quizPage.style.display = "block";
    quizTitle.innerHTML = index+1 + ". " + subjects[index].title;
    question.innerHTML = subjects[index].statement;
}

function showQuestion() {
    // remove active class from button
    eens.classList.remove("active");
    neither.classList.remove("active");
    oneens.classList.remove("active");

    // check if the index of the answer isn't undefined
    if(answers[index] != undefined) {
        // check if you agreed with the current cuestion
        if(answers[index].answer == "Eens") {
            eens.classList.add("active");
        }
        // check if you didn't agree but also didn't disagree with the current cuestion
        if(answers[index].answer == "Geen van beide") {
            neither.classList.add("active");
        }
        // check if you disagreed with the current cuestion
        if(answers[index].answer == "Oneens") {
            oneens.classList.add("active");
        }
    }
    // display question index + the current question title
    quizTitle.innerHTML = index+1 + ". " + subjects[index].title;
    // display the current question
    question.innerHTML = subjects[index].statement;
}

function nextQuestion(value) {
    var answer = {
        "title": subjects[index].title,
        "statement": subjects[index].statement,
        "answer": value,
        "priority": 0
    };

    // set the current answer equal to the variable answer
    answers[index] = answer;
    // check if index is greater or equal to the last question from the array
    if(index >= subjects.length-1) {
        quizScreen.style.display = "none";
        impQuestion.style.display = "block";
        impTitleList.innerHTML = "";
        // Loop through titles and display them
        for (var i = 0; i < subjects.length; i++) {
            impTitleList.innerHTML += '<input class="check" type="checkbox"> ' + subjects[i].title + '<br />';
        }
    } else {
        index++;
        showQuestion();
    }
}

// the page where you choose which parties you want and which you don't want
function toParties() {
    impQuestion.style.display = "none";
    partiesPage.style.display = "block";
    const checkbox = document.getElementsByClassName('check');
    for (var i = 0; i < answers.length; i++) {
        if (checkbox[i].checked == true){
            console.log("True");
            answers[i].priority = 1;
        } else {
            console.log("False");
            answers[i].priority = 0;
        }
    }
}

// button to go to previous question
function prevQuestion() {
    // if first question
    if(index == 0) {
        startPage();
    } else {
        index--;
        showQuestion();
    }
}

// button to go back from importantQuestions to the questions
function impBack() {
    impQuestion.style.display = "none";
    quizScreen.style.display = "block";
}

// button to go back from the partiesPage to the
function partBack() {
    partiesPage.style.display = "none";
    impQuestion.style.display = "block";
}
