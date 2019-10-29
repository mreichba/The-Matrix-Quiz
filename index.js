'use strict';

//stores our questions, options, and answers as objects
const STORE = [
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
    answers:[
      'Trinity',
      'Morpheus',
      'The Oracle',
      'Neo'
    ],
    rightAnswer: 'Neo'
  },
];

//sets the score and question number to 0
let score = 0;
let questionNumber = 0;

//begins the quiz
function startQuiz () {
  homePage();
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    createCounter();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(renderQuestion());
  });
}
//Renders home page
function homePage() {
  let home = `<img src="quiz-pics/enter-the-matrix.jpg" alt="Enter the Matrix logo" class="images">
 <button type="button" class="startButton button">Enter the Matrix Quiz</button>.appendTo('.startQuiz')`;
  $(home).appendTo('.startQuiz');
}

//Renders question and score count
function createCounter () {
  let showCounter = `
  <ul aria-live = "polite" class = "record">
    <li>Question: <span class = "questionNumber">0</span>/5 </li>
    <li>Score: <span class="score">0</span></li>
  </ul>`;
  $(showCounter).appendTo('.counters');
}

//Render question
function renderQuestion () {
  // questionNumber <= STORE.length ? createQuestion(questionNumber) :  $('.questionBox').hide(); 
  // finalFeedBack();   
  // $('.questionNumber').text(5);
  
  if (questionNumber < STORE.length) {
    return createQuestion(questionNumber);
  } else {
    $('.questionBox').hide(); 
    finalFeedBack();
    $('.questionNumber').text(5);
  }
}

//creates a form for each question
function createQuestion (questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend aria-live = "new question" class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`);

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sentence" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type= 'submit' class= 'submitButton button'>Submit</button>`).appendTo(fieldSelector);
  return formMaker;
}

//Submit answer
function submitAnswer () {
  $('.biggerSquare').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let choice = $('input:checked');
    let answer = choice.val();
    let correct = STORE[questionNumber].rightAnswer;
    answer === correct ? rightAnswer() : wrongAnswer();
  });
}

//updates score by 1
function updateScore () {
  score++;
  $('.score').text(score);
}

//feedback for if the answer selected is the right answer
function rightAnswer () {
  $('.response').html(
    `<h3 aria-live = "polite"> You answered correctly! </h3> <img src="quiz-pics/right-answer.jpeg" alt= "Neo Triumphant" width="200px">
    <button type = "button" class= "nextButton button"> Next Question</button>`
  );
  updateScore();
}

//feedback for if the answer selected is the wrong answer
function wrongAnswer () { 
  $('.response').html(
    `<h3 aria-live="polite"> You answered incorrectly! </h3> <img src="quiz-pics/wrong-answer.jpg" alt= "Upset Enemies" width="200px">
  <p class="sentence">It's actually:</p>
  <p class="sentence">${STORE[questionNumber].rightAnswer}</p>
  <button type = "button" class= "nextButton button"> Next Question</button>`
  );
}

//generates the next question
function nextQuestion () {
  $('.biggerSquare').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(renderQuestion());
  });
}

//updates question number by 1
function updateQuestionNumber () {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//feedback on final score of the quiz
function finalFeedBack () {
  $('.final').show();
  let array; 
  const awesome = [
    'You did awesome!',
    'quiz-pics/awesome-feedback-matrix.jpg',
    'close up shot of Neo',
    'You are one with the Matrix!'
  ];
  const bad = [
    'You didnt do too well!',
    'quiz-pics/bad-feedback-matrix.jpg',
    'System Failure sign',
    'You need to brush up on your Matrix knowledge to be chosen.'
  ];
  score >= 4 ? array = awesome : array = bad;
  return $('.final').html(
    `<h3 aria-live= "polite"> ${array[0]}</h3>
    <img src="${array[1]}" alt=${array[2]}" class= "finalImages">
    <p aria-live="polite" class="sentence">${array[3]}</p>
    <h3 aria-live="polite"> You got ${score} / 5! </h3>
    <button  type="submit" class="restartButton button">Enter The Matrix again</button>`
  );
}

//resets question and answer counter
function resetStats () {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//restart quiz
function restartQuiz() {
  $('.biggerSquare').on('click', '.restartButton', function (event) {
    event.preventDefault();     
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();   
  });
}

//runs the functions
function makeQuiz () {
  startQuiz();
  renderQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);