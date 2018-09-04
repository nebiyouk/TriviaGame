$(document).ready(function () {
    // ----------------------------TRIVIA GAME----------------------------

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "Who has the most wins as a head coach in the NFL?",
        answer: ["George Halas", "Tom Landry", "Curly Lambeau", "Don Shula"],
        correct: "3",
        image: ("assets/images/donshula.jpg")
    }, {
        question: "Who is the last non-quarterback to win NFL MVP?",
        answer: ["Shaun Alexander", "Adrian Peterson", "Ray Lewis", "LaDainian Tomlinson"],
        correct: "1",
        image: ("assets//images/AdrianPeterson.png")
    }, {
        question: "Which of these teams was NOT an original NFL team that moved over to the AFC?",
        answer: ["Raiders", "Steelers", "Colts", "Browns"],
        correct: "0",
        image: ("assets//images/Raiders.png")
    }, {
        question: "Which state has produced more pro football Hall of Famers than any other state ?",
        answer: ["California", "Ohio", "Pennsylvania", "Texas"],
        correct: "2",
        image: ("assets//images/Pennsylvania.jpg")
    }, {
        question: "Who holds the record for the longest field goal in NFL history? ",
        answer: ["Tom Dempsey", "Jason Elam", "Matt Prater", "Sebastian Janikowski"],
        correct: "2",
        image: ("assets/images/MattPrater.jpg")
    }, {
        question: "What team hired the NFL's first professional cheerleading squad, in 1972 ?",
        answer: ["Philadelphia Eagles", "Dallas Cowboys", "New Orleans Saints", "New England Patriots"],
        correct: "1",
        image: ("assets//images/dallas-cowboys-cheerleaders.jpg")
    }, {
        question: "How many Superbowl rings do the Dallas Cowboys have ?",
        answer: ["5", "6", "3","1"],
        correct: "0",
        image: ("assets//images/Rings.gif")
    }, {
        question: "Which team won Super Bowl XLIII in the 2008 season ?",
        answer: ["New York Jiants", "Arizona Cardinals", "Pittsburgh Steelers", "indianapolis colts"],
        correct: "2",
        image: ("assets//images/Pittsburgh-Steelers.jpg")
    }];

    // ------------- FUNCTION DECLARATIONS ----------------------------


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; //stops the timer
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE').css({
                'color': '#FF0000'
            });
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
            'color': '#FF0000'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#FF0000'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#FF0000'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});