/*logic.js*/
/*Alexander Corley*/

function loadData() {
  shuffled = Boolean(getCookie("shuffled"));
  currentTest = Number(getCookie("currentTest"));
  tests = getCookie("tests").split("|");
  points = Number(getCookie("points"));
}

/**
 * load the points into the results page
 */
function loadResults() {
  var score = document.getElementById("results");
  var motiv = document.getElementById("motivation");
  score.innerHTML = getCookie("points") + "/3";
  switch (Number(getCookie("points"))) {
    case 0: motiv.innerHTML = "God Damn!!!";
    case 1: motiv.innerHTML = "Damn";
    case 2: motiv.innerHTML = "OK";
    case 3: motiv.innerHTML = "Good Job";
  }
}

//have the tests been shuffled
var shuffled = false;

/**
 * I use this structure in order to add more tests and choose from the pool randomly
 * tests have the same name as their associated pages. just concat ".html" on the end to access the page
**/
var tests = [
  "test1",
  "test2",
  "test3",
  "test4"
];

/**
 * I dont know that the answers are yet but i will know once i actually make the tests
 * correctAnswers[tests[0]] has the answer for tests[0] i dont know if this sort of hash table works but i think it does.
 * since we are storing the answers as strings then we can have both string answers and number answers
**/
var correctAnswers = {};

/**
 * initialize the correctAnswers object with the correct key value pairs. 
**/
correctAnswers[tests[0]] = "-616";
correctAnswers[tests[1]] = "11";
correctAnswers[tests[2]] = "57";
correctAnswers[tests[3]] = "71978";

//the current test that the user is taking
var currentTest = 0;

//counts the correct answers that the user has entered
var points = 0;

/**
 * Shuffles array in place.
 * @param {Array} The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

/**
 * choose three random tests from the list above and store them for later use
**/
function start() {
  shuffle(tests);
  setCookie("tests", tests.join("|"), 1);
  setCookie("currentTest", "0", 1);
  setCookie("points", "0", 1);
  setCookie("shuffled", "false", 1);
  window.location = tests[0].concat(".html");
}

/**
 * check the input test for correctness
**/
function check() {
  var giveUpButton = document.getElementById("GiveUp");
  var submitButton = document.getElementById("Submit");
  var inputField = document.getElementById("input");
  var inputValue = inputField.value;
  var inputMessage = document.getElementById("inputmessage");
  if (correctAnswers[tests[currentTest]] == inputValue) {
    giveUpButton.setAttribute("disabled", "");
    submitButton.removeAttribute("disabled");
    inputField.classList.remove("incorrect");
    inputField.classList.add("correct");
    inputMessage.innerHTML = "Good job. That is the right answer."
  } else {
    submitButton.setAttribute("disabled", "");
    giveUpButton.removeAttribute("disabled");
    inputField.classList.remove("correct");
    inputField.classList.add("incorrect");
    inputMessage.innerHTML = "That isn't the correct answer.";
    if (inputValue == "") {
      inputMessage.innerHTML = "<br>";
    }
  }
}

/**
 * move to the next test page
**/
function nextPage() {
  currentTest++;
  var inputValue = document.getElementById("input").value;
  if (correctAnswers[tests[currentTest-1]] == inputValue) {
    points++;
  } else if (inputValue == "") {
    window.alert("you have not entered an answer yet.\nare you sure you want to move on?")
  }
  if (currentTest == 3) {
    setCookie("points", points, 1);
    window.location = "results.html";
  } else {
    setCookie("points", points, 1)
    setCookie("shuffled", ((shuffled)? "true": "false"), 1);
    setCookie("currentTest", currentTest, 1);
    window.location = tests[currentTest].concat(".html");
  }
}

//taken from W3Schools
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";path=/";
}

//taken from W3Schools
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}
