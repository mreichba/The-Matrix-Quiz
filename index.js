'use strict';

/*Stores our questions, answers, and correct answers as objects and sets the score and question number to 0 */

const STORE = {
  score: 0,
  questionNumber: 0,
  questions: [
    {//Q1
      question: 'What is Keanu Reave\'s cyber alter-ego in The Matrix movies?',
      answers: [
        'Trinity',
        'Neo',
        'Mr. Anderson',
        'Morpheus'
      ],
      rightAnswer: 'Neo'
    },
    {//Q2
      question: 'Which colored pill does Neo take to go "down the rabbit hole"?',
      answers: [
        'Blue',
        'Red',
        'Yellow',
        'Green'
      ],
      rightAnswer: 'Red'
    },
    {//Q3
      question: 'Who rescues Neo from the Matrix in the first movie?',
      answers: [
        'Cypher',
        'Trinity',
        'Morpheus',
        'Mr. Anderson'
      ],
      rightAnswer: 'Morpheus'
    },
    {//Q4
      question: 'Where does the last of the natural born human population on earth live?',
      answers: [
        'Babylon',
        'Zion',
        'Crete',
        'L.A.'
      ],
      rightAnswer: 'Zion'
    },
    {//Q5
      question: 'Who is "The One"?',
      answers: [
        'Trinity',
        'Morpheus',
        'The Oracle',
        'Neo'
      ],
      rightAnswer: 'Neo'
    }]
};

function addMainContent() {
  let mainContent = `<section aria-live = "polite" class="startQuiz box"></section>
<section aria-live = "polite" class="questionBox box altBox"></section>
<section aria-live = "polite" class="response box altBox"></section>
<section aria-live = "polite" heading = "final page" class="final box altBox"></section>`;
  $('main').html(mainContent);
}

//Begins the quiz
function startQuiz() {
  $('.altBox, .counters').removeClass('showBlock').addClass('hide');
  homePage();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').removeClass('showBlock').addClass('hide');
    $('.questionBox, .counters').removeClass('hide').addClass('showBlock');
    $('.questionNumber').text(1);
    $('.questionBox').html(renderQuestion());
  });
}
//Renders home page
function homePage() {
  let home = `<img src="quiz-pics/enter-the-matrix.jpg" alt="Enter the Matrix logo" class="images">
 <button type="button" class="startButton button">Enter the Matrix Quiz</button>`;
  $('.startQuiz').html(home);
}

//Renders question and score count
function createCounter() {
  let showCounter = `
  <ul aria-live = "polite" class = "record">
    <li>Question: <span class = "questionNumber">0</span>/5 </li>
    <li>Score: <span class="score">0</span></li>
  </ul>`;
  $('.counters').html(showCounter);
}

//Render question
function renderQuestion() {
  if (STORE.questionNumber < STORE.questions.length) {
    return createQuestion(STORE.questionNumber);
  } else {
    $('.questionBox').addClass('hide');
    finalFeedBack();
    $('.questionNumber').text(5);
  }
}

//Creates a form for each question
function createQuestion() {
  let questionString = '';
  STORE.questions[STORE.questionNumber].answers.forEach(function (answerValue, answerIndex) {
    questionString += `
    <label class="sentence" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
    </label>`;
  });

  let formMaker = `
  <form action="#" id="quizForm">
    <fieldset>
      <legend aria-live = "polite" class="questionText">${STORE.questions[STORE.questionNumber].question}</legend>
      ${questionString}
    </fieldset>
    <button type= 'submit' class= 'submitButton button'>Submit</button>
  </form>`;

  return formMaker;
}

//Submits answer
function submitAnswer() {
  $('body').on('submit', '#quizForm', function (event) {
    event.preventDefault();
    $('.questionBox').removeClass('showBlock').addClass('hide');
    $('.response').addClass('showBlock');
    let choice = $('input:checked');
    let answer = choice.val();
    let correct = STORE.questions[STORE.questionNumber].rightAnswer;
    answer === correct ? rightAnswer() : wrongAnswer();
  });
}

//Updates score by 1
function updateScore() {
  STORE.score++;
  $('.score').text(STORE.score);
}

//Feedback for if the answer selected is the right answer
function rightAnswer() {
  $('.response').html(
    `<h2 aria-live = "polite"> You answered correctly! </h2> <img src="quiz-pics/right-answer.jpg" alt= "Neo Triumphant" width="200px" height="auto">
    <button type = "button" class= "nextButton button"> Next Question</button>`
  );
  updateScore();
}

//Feedback for if the answer selected is the wrong answer
function wrongAnswer() {
  $('.response').html(
    `<h2 aria-live="polite"> You answered incorrectly! </h2> <img src="quiz-pics/wrong-answer.jpg" alt= "Upset Enemies" width="200px">
  <p class="sentence">It's actually:</p>
  <p class="sentence">${STORE.questions[STORE.questionNumber].rightAnswer}</p>
  <button type = "button" class= "nextButton button"> Next Question</button>`
  );
}

//Generates the next question
function nextQuestion() {
  $('.biggerSquare').on('click', '.nextButton', function (event) {
    $('.altBox').removeClass('showBlock').addClass('hide');
    $('.questionBox').removeClass('hide').addClass('showBlock');
    updateQuestionNumber();
    $('.questionBox form').replaceWith(renderQuestion());
  });
}

//Updates question number by 1
function updateQuestionNumber() {
  STORE.questionNumber++;
  $('.questionNumber').text(STORE.questionNumber + 1);
}

//Feedback on final score of the quiz
function finalFeedBack() {
  $('.questionBox').removeClass('showBlock').addClass('hide');
  $('.final').removeClass('hide').addClass('showBlock');
  let array;
  const awesome = [
    'You did awesome!',
    'quiz-pics/awesome-feedback-matrix.jpg',
    'close-up-shot-of-Neo',
    'You are one with the Matrix!'
  ];
  const bad = [
    'You didnt do too well!',
    'quiz-pics/bad-feedback-matrix.jpg',
    'System-Failure-sign',
    'You need to brush up on your Matrix knowledge to be chosen.'
  ];
  STORE.score >= 4 ? array = awesome : array = bad;
  return $('.final').html(
    `<h2 aria-live= "polite"> ${array[0]}</h2>
    <img src="${array[1]}" alt=${array[2]}" class= "finalImages">
    <p aria-live="polite" class="sentence">${array[3]}</p>
    <h2 aria-live="polite"> You got ${STORE.score} / 5! </h2>
    <button  type="submit" class="restartButton button">Enter The Matrix again</button>`
  );
}

//Resets question and answer counter
function resetStats() {
  STORE.score = 0;
  STORE.questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//Restart quiz
function restartQuiz() {
  $('.biggerSquare').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.final, .counters').removeClass('showBlock').addClass('hide');
    $('.startQuiz').removeClass('hide').addClass('showBlock');
  });
}

//Runs the functions
function makeQuiz() {
  addMainContent();
  createCounter();
  startQuiz();
  renderQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);