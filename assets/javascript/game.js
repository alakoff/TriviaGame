//Declare the game object
var game = {

    //Game variables
    unanswered:0,
    qTime:0,
    dTime:0,
    response:'',
    qInterval:0,
    qNum:0,
    correctCounter:0,
    wrongCounter:0,
    answer:'',

    //Questions array, correct answer is always the last item of each element
    qArray:
        [
        ["Which 1980's US president survived an assassination attempt?","Bill Clinton","Ronald Reagan","George H W Bush","Jimmy Carter","Ronald Reagan"],
        ["In 1989, who had the first of many No 1s songs with Straight Up?","Paul Anka","Bangles","Johnny Cash","Paula Abdul","Paula Abdul"],
        ["Where in the Ukraine was there a nuclear explosion in 1986?","Chernobyl",
        "Odessa","Donetsk","Kiev","Chernobyl"],
        ],

    //Timer function
    qTimer: function() {

        //Decrease question timer by one second
        game.qTime--;

        //Show the number in the timer
        $(".timer").html("<h4>" + "Time Remaining :" + game.qTime + "</h4>");

        if (game.qTime === 0) {
            clearInterval(game.qInterval);
            game.qTime = 0;
            game.unanswered++;
            game.gameOver();
        }
    },


    //Checks for correct or wrong answer
    checkResponse: function() {

        if (game.answer === game.response) {
            game.correctCounter++;
            $(".qmessage").css("background","green").text("You are correct!");
            setTimeout(game.gameOver, 2000);

        } else {
            game.wrongCounter++;
            $(".qmessage").css("background","red").text("You are NOT correct!");
            setTimeout(game.gameOver, 2000);
        }
    },


    //Checks to see if all game questions have been asked
    //Show scores if all questions are done
    gameOver: function() {

        //Add one to question number
        game.qNum++;

        if (game.qNum === game.qArray.length) {
            $(".qmessage").css("background","lightgray");
            $(".qmessage").text("The test has finished");
            game.showScore();
        } else {
            // if (game.qNum < game.qArray.length) {
            game.questions();

        }
    },


    //Shows scoreboard div and enters values for the counters
    showScore: function() {

        //Show scores display with counter information
        $(".scores").css("display","block");
        $(".correct").text("Correct Answers: " + game.correctCounter);
        $(".wrong").text("Wrong Answers: " + game.wrongCounter);
        $(".unanswered").text("Unanswered Questions: " + game.unanswered);

        //If test again button is clicked
        $(".btn-playagain").on("click",function() {
            clearInterval(game.qInterval);
            clearInterval(game.dInterval);
            game.play();
        })

        //If no thanks  button is clicked
        $(".btn-noplay").on("click",function() {

            //Hide scores display
            $(".scores").css("display","none");

            //Hide question display
            $(".qa").css("display","none");
        })
    },


    //Question display and response processing
    questions: function() {

        //Reset question correct or wrong message display
        $(".qmessage").css("background","lightgray");
        $(".qmessage").text("Good Luck !");

        //Set 30 seconds per question
        game.qTime = 30;

        //Update question and possible answers
        $(".question").text(game.qArray[game.qNum][0]);
        $(".a1").text(game.qArray[game.qNum][1]);
        $(".a2").text(game.qArray[game.qNum][2]);
        $(".a3").text(game.qArray[game.qNum][3]);
        $(".a4").text(game.qArray[game.qNum][4]);
        game.answer = game.qArray[game.qNum][5];

        //Start question timer function to run every second
        game.qInterval = setInterval(game.qTimer, 1000);

        },


    //Play game function
    play: function() {

        //Clear any running timers
        clearInterval(game.qInterval);

        //Set game variables back to zero if user clicks on the
        //Test Your 80s Knowledge button or Test Again button
        //after already playing
        game.correctCounter = 0;
        game.wrongCounter = 0;
        game.unanswered = 0;
        game.qTime = 0;
        game.response = '';
        game.qInterval = 0;
        game.qNum = 0;
        game.answer = '';

        //Show questions, qmessage and answers display
        $(".qa").css("display","block");

        //Hide and reset scores section to ensure it's not showing
        $(".correct").text("Correct Answers: " + game.correctCounter);
        $(".wrong").text("Wrong Answers: " + game.wrongCounter);
        $(".unanswered").text("Unanswered Questions: " + game.unanswered);
        $(".scores").css("display","none");

        //Start questions
        game.questions(game.qNum);
    }

} //End of game object declaration


//Main program block
$(document).ready(function() {

    //Start the game
    $(".btn").click(game.play);

    //Get user's question response and check it
    $(".answers").on("click", function() {
        clearInterval(game.qInterval);
        game.response = $(this).text();
        game.checkResponse();
    })
    })
