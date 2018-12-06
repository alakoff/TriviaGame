//Declare the game object
var game = {

    //Game variables
    wins: 0,
    losses: 0,
    unanswered:0,
    qTimer:0,
    response:'',
    qInterval:0,
    qNum:'',

    //Question arrays
    // q1: ["What year was 1980?","1980","1981","1982","1983","1980"],
    // q2: ["What year was 1981?","1980","1981","1982","1983","1981"],
    // q3: ["What year was 1982?","1980","1981","1982","1983","1982"],
    // q4: ["What year was 1983?","1980","1981","1982","1983","1983"],

    //Question numbers
    qArray: [["What year was 1980?","1980","1981","1982","1983","1980"],["What year was 1981?","1980","1981","1982","1983","1981"]],


    //Timer function
    timer: function() {

        //Decrease question timer by one second
        game.qTimer--;

        //Show the number in the timer
        $(".timer").html("<h4>" + "Time Remaining :" + game.qTimer + "</h4>");

        if (game.response !== ''){
            console.log("timer stopped line 27");
            clearInterval(game.qInterval);
            game.qloop();
        }

        if (game.qTimer === 0) {
            console.log("timer stopped line 32");
            game.qTimer=0;
            game.unanswered++;
            clearInterval(game.qInterval);
            game.qloop();
        }
    },

    checkResponse: function(answer,response) {
        console.log(answer,response);
    },


    qloop: function() {
        game.qnum = 0;
        while (game.qnum < game.qArray.length){
            if (game.qInterval===0) {
                game.questions(game.qnum);
                game.qnum++;
            }
        }
    },


    questions: function(i) {

        //Set 10 seconds per question
        game.qTimer = 10;

        console.log(game.qArray);
        console.log(i);

        //Update question and possible answers
        $(".question").text(game.qArray[i][0]);
        // console.log(game.qArray[i]);
        $(".a1").text(game.qArray[i][1]);
        $(".a2").text(game.qArray[i][2]);
        $(".a3").text(game.qArray[i][3]);
        $(".a4").text(game.qArray[i][4]);
        var answer = game.qArray[i][5];


        //Start question timer function to run every second
        game.qInterval = setInterval(game.timer, 1000);

        //Get user's question response
        $(".answers").on("click", function() {
            game.response = $(this).text();
            console.log(game.response);
        });

        //If the user responds, get response
        //check the response vs answer
        if (game.response!==''){
            game.checkResponse(answer,game.response);
        }
    },

    //Play game function
    play: function() {

        //Show questions and answers display
        $(".qa").css("display","block");

        //Move home page display to the left
        $(".home").animate({
            "marginLeft":"-=150px",
            "marginRight":"20px",
        });

        //Start questions loop
        game.qloop();

    }

} //End of game object declaration


//Main program block
$(document).ready(function() {
    $(".btn").click(game.play);
});
