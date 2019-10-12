function start() {
  $('#js_startButton').on('click',function(event) {
    displayQuestion()
  })
  //starts quiz and renders choices
  
}
function displayQuestionAndScore(){
  //display question number and score
  const html = $(`<ul class="progress">
      <li id="js-answered">Question: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
      <li id="js-score" >Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $(".question-and-score").html(html);
}

function displayChoices() {
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.answers.length; i++)
  {
    $('.js-options').append(`
        <div>
          <input type = "radio" name="choices" id="choice${i+1}" value= "${question.answers[i]}" tabindex ="${i+1}"> 
          <label for="choice${i+1}"> ${question.answers[i]}</label>
           <div class="question-and-score"></div>
         
        </div>
    `);
  }
  
}
function displayQuestion() {
  //show question 
  let question = STORE.questions[STORE.currentQuestion];
  displayQuestionAndScore();
  const quizQuestion = $(`
  <div>
    <form id="js-questions" class="question-form">
      
      <section class="question">
        <div class="row question">
          <div class="column">
            <legend> ${question.question}</legend>
          </div>
        </div>

        <div class="row options">
          <div class="column">
            <div class="js-options"> </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <button type = "submit" id="answer" tabindex="5">Submit</button>
        </div>
      </div>
    </section>
    </form>
    <button type = "button" id="next-question" tabindex="6"> Next >></button>
    <div id="js-response"></div>
  </div>`);
$("main").html(quizQuestion);
displayChoices();
$("#next-question").hide();
}

function showResults() {
  //show results of question
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
          <div class="row">
            <div class="column">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="column">
              <button class="buttons" type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
      </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $("main").html(resultHtml);
}
function endQuestion (){
  //keeps track if we are at the end of the questions 
  $('body').on('click','#next-question', (event) => {
    $('#js-response').empty();
    STORE.currentQuestion === STORE.questions.length?showResults() : displayQuestion();
  });
}
function answerCheck() {
//This will make sure that when the answer is right it will go to the right screen and if not it will go to the wrong answer screen
  $('body').on("submit",'#js-questions', function(event) {
      event.preventDefault();
      let currentQues = STORE.questions[STORE.currentQuestion];
      let selectedOption = $("input:checked").val();
      if (!selectedOption) {
        alert("select an answer");
        return;
      } 
      let id_num = currentQues.answers.findIndex(i => i === selectedOption);
      
    
      $('#js-questions').hide();

      showResponse(selectedOption === currentQues.correctAnswer, currentQues)
      STORE.currentQuestion++;
      $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
      $('#answer').hide();
      $("input[type=radio]").attr('disabled', true);
      
  });
}
function showResponse(isCorrect,currentQues) {
      let id = "#js-response";
      if(isCorrect) {
        STORE.score++; 
        $(`${id}`).append(`That answer is correct<br/>`);
        $(`${id}`).addClass("right");
      }
      else {
        $(`${id}`).append(`Oh no! That's incorrect <br/> The answer is "${currentQues.correctAnswer}"<br/>`);
        $(`${id}`).addClass("wrong");
      }
  $('#next-question').show();
}

 function restartQuiz() {
// This will restart the quiz
  $('body').on('click','#restart', (event) => {
    displayQuestion();
  });
 }

function handleQuizApp() {
  start();
  endQuestion();
  answerCheck();
  restartQuiz();
}

$(handleQuizApp);