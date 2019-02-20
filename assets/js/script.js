const introScreen = document.getElementById('startPage');
const quizScreen = document.getElementById('quizPage');
const quizTitle = document.getElementById('questionTitle');
const question = document.getElementById('question');
const impQuestion = document.getElementById('importantQuestion');
const partiesPage = document.getElementById('chooseParties');
const resultPage = document.getElementById('resultPage');

var answers = [];
var index = 0;
var eens = document.getElementById('agree');
var oneens = document.getElementById('disagree');
var neither = document.getElementById('neither');
var impTitleList = document.getElementById('importantTitles');
var partiesList = document.getElementById('parties');
var finalResult = document.getElementById('result');

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
        "priority": 0,
        "parties": getPartiesWithSameAnswer(value)
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
        // index + 1
        index++;
        showQuestion();
    }
}

function getPartiesWithSameAnswer(value) {
    var result = [];
    var partyList = subjects[index].parties;

    // Check if agreed with the question
    if (value == "Eens") {
        // Convert it to 'pro'
        value = "pro";
        // Check if disagreed with the question
    } else if (value == "Oneens") {
        // Convert it to 'contra'
        value = "contra";
        // Check if not agreed/disagreed with the question
    } else if (value == "Geen van beide") {
        // Convert it to 'ambivalent'
        value = "ambivalent";
    }

    // Loop through partyList
    for (var i = 0; i < partyList.length; i++) {
        if (value == partyList[i].position) {
            // Push the partyList to result
            result.push(partyList[i].name);
        }
    }

    // return the result
    return result;
}

// the page where you choose which parties you want and which you don't want
function toParties() {
    impQuestion.style.display = "none";
    partiesPage.style.display = "block";
    // checkboxes on page
    const checkbox = document.getElementsByClassName('check');
    // loop through all the question titles
    for (var i = 0; i < answers.length; i++) {
        // check all of the title if a checkbox is checked...
        if (checkbox[i].checked == true){
            // ...if yes, set priority on 1...
            answers[i].priority = 1;
        } else {
            // ...if no, set priority on 0
            answers[i].priority = 0;
        }
    }
    // Loop through parties
    for (var i = 0; i < parties.length; i++) {
        // Generate checkboxes + the party names
        partiesList.innerHTML += '<input class="checkParty" type="checkbox"> ' + parties[i].name + '<br />';
    }
}

function calculate() {
    partiesPage.style.display = "none";
    resultPage.style.display = "block";

    var checkedParties = [];
    const checkParty = document.getElementsByClassName('checkParty');
    // Loop through parties
    for (var i = 0; i < parties.length; i++) {
        // Check if there are any checked parties
        if (checkParty[i].checked == true){
            // Push checked parties to array "checkedParties"
            checkedParties.push(parties[i]);

            // Set the last item of checkedParties[checkedParties].score equal to 0
            checkedParties[checkedParties.length-1].score = 0;
        }
    }

    // Loop through answers
    for (var i = 0; i < answers.length; i++) {
        var answer = answers[i];
        // Loop through answer.parties
        for (var z = 0; z < answer.parties.length; z++) {
            var party = answers[i].parties[z];
            // Loop through checkedParties
            for (var r = 0; r < checkedParties.length; r++) {
                var checkedParty = checkedParties[r];
                // Check if checkedParty is equal to party.name
                if (checkedParty.name == party) {
                    // Add 1 to checkedParties.score
                    checkedParty.score++;
                    // Check if answer.priority is equal to 1
                    if (answer.priority == 1) {
                        // Add 1 to checkedParties.score
                        checkedParty.score++;
                    }
                }
            }
        }
    }

    // Sort checkedParties descending
    checkedParties.sort(function(a, b){return b.score - a.score});
    // Loop through checkedParties
    for (var i = 0; i < checkedParties.length; i++) {
        // Put the final party in the finalResult
        finalResult.innerHTML += checkedParties[i].name + " - " + checkedParties[i].score + " Punten" + "<br />";
    }

    console.log(checkedParties);
}

// button to go to previous question
function prevQuestion() {
    // if first question
    if(index == 0) {
        startPage();
    } else {
        // index - 1
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
