$(document).ready(function () {

 ///////audio
 //    $("#audio")[0].play();
  //////////////placing cards
var card_limit=18;
var first_front_card=false;
var front_card_counter = 1;
var level = 1;


    place_cards();


function place_cards () {
    for(var j=0; j<card_limit; j++) {
       var card = $("<div>",{
           class: "card col-lg-2 col-md-2 col-sm-2 col-xs-2"
       });
        var front = pick_front_card();
        var back = $("<div>",{
            class: "back"
        });
        card.append( front, back);
        // card.append( back, front);
        $(".game_area").append(card);
    }//for j
    ///stats row
    var row4= $("<div>",{
        class: "status_container col-lg-12 row col-md-12",
        id : "row4"
    });
    var span1 = $('<span class="col-lg-4 col-md-4 col-sm-4 col-xs-4 level game_played"><span class="lab">Games Played : </span><span class="value"></span> </span>');
    var span2 = '<span class="col-lg-4 col-md-4 col-sm-4 col-xs-4 score attempts"> <span class="lab">Attempts : </span><span class="value"></span> </span>';
    var span3 = '<span class="col-lg-4 col-md-4 col-sm-4 col-xs-4 accuracy"> <span class="lab">Accuracy : </span><span class="value"></span> </span>';
    row4.append(span1, span2, span3);
    $(".game_area").append(row4);
    first_front_card=false;
}

function pick_front_card () {
    if (front_card_counter == 7) {
        first_front_card = !first_front_card;
        front_card_counter = 1;
    }
    if (!first_front_card) {
        var front=$("<div>",{
            class: "front"
        });
        first_front_card = true;
        front_card_counter ++;
        return front;
    }else {
        var front1=$("<div>",{
            class: "front front1"
        });
        first_front_card = false;
        front_card_counter ++;
        return front1;
    }
}
//////////finished cards placement
    ///Global variables
    var first_card_clicked=null;
    var second_card_clicked=null;
    var total_possible_matches=card_limit/2;
    var match_counter= 0;
    var again = true;
    var h_and_b_difference = 60;
////click functionality
    $(".card").on("click",$(this),card_clicked);
    ///card_clicked
    function card_clicked() {
        var toggled = $(this).hasClass("flipcard");
        if (again && !toggled) {
            $(this).toggleClass('flipcard');
            if (first_card_clicked == null) {
                first_card_clicked = $(this);
                // console.log("first_card_clicked: ", first_card_clicked);
                return;
            } else {
                attempts+=1;
                count_accuracy();
                display_stats();
                second_card_clicked = $(this);
                // console.log("first: ", first_card_clicked.find(".front + div"), "second: ", second_card_clicked.find(".front+div"));
                if (first_card_clicked.find(".back").attr("class") == second_card_clicked.find(".back").attr("class")) {
                    // console.log("they are the same");
                    cool_matches();
                    h_and_b_difference -= 6;
                    match_counter++;
                    count_accuracy();
                    display_stats();
                    first_card_clicked = null;
                    second_card_clicked = null;
                    random_place();
                    if (match_counter == total_possible_matches) {
                        $(".game_area").hide();
                        $("#win").css("transform","scale(1)");
                        $("#harry").hide();
                        $("#ball").hide();

                    } else {
                        return;
                    }//see if the game is over
                    //check if the same, if not:
                } else if (first_card_clicked != second_card_clicked) {
                    // console.log("they are not equal");
                    cool_false_match();
                    again = false;
                    setTimeout(function () {
                        first_card_clicked.toggleClass('flipcard');
                        second_card_clicked.toggleClass('flipcard');
                        ///reset both card clicked
                        first_card_clicked = null;
                        second_card_clicked = null;
                        again= true;
                    }, 1000);
                }
            }//if the second card is clicked
        }
        display_stats();
    }

////card flip
    function flipCard(){
        $(this).toggleClass('flipcard');
    }

////stats
    var matches = 0;
    var attempts = 0;
    var accuracy = 0;
    var games_played = 0;
///////////accuracy
   function count_accuracy() {
       if (attempts == 0) {
           accuracy = 0;
       } else {
           accuracy = Math.floor((match_counter / attempts) * 100);
       }
       // console.log("accuracy: ", accuracy);
   }
    //////finished accuracy

///display stats
    function display_stats() {
        $(".game_played .value").text(games_played);
        $(".attempts .value").text(attempts);
        $(".accuracy .value").text(accuracy +" %");
    }
    display_stats();
///reset stats
    function reset_stats() {
        matches = 0;
        match_counter= 0;
        attempts = 0;
        accuracy = 0;
        display_stats();
    }

///reset button

    $(".reset").click(function reset () {
        games_played+=1;
        reset_stats();
        first_card_clicked=null;
        second_card_clicked=null;
        total_possible_matches=9;
        match_counter= 0;
        again = true;
        $( ".game_area" ).empty();
        $(".game_area").show();
        place_cards();
        // $(".card").attr("class","card col-lg-2 col-md-2 col-sm-2 col-xs-2");
        $("#win").css("transform","scale(0)");
        random_pic();
        $("#harry").show().css({"transform":"rotate3D(0,1,0,0deg)","left": "80%","top": "2%" });
        $("#ball").show().css({"top": "80%","left": "2%"});
        h_and_b_difference = 60;
        $(".card").on("click",$(this),card_clicked);
        display_stats();
    });

/*************************************************
    animation
 ***************************************************/
///////////////harry moving
    function random_place() {
        var x_b = Math.round(Math.random()*90);
        var x=x_b+"%";
        var y_b = Math.round(Math.random()*90);
        var y=y_b+"%";
        var x_h= x_b - h_and_b_difference;
        var y_h = y_b - h_and_b_difference;
        if(x_h>100 || x_h<0){
            x_h = -x_h;
        }
        if(y_h>100 || y_h<0){
            y_h = -y_h;
        }
        // console.log("x of ball",x_b);
        // console.log("y of ball",y_b);
        // console.log("x of harry",x_h);
        // console.log("y of harry",y_h);
        var x_for_harry = x_h+"%";
        var y_for_harry = y_h+"%";
        $("#ball").css({"top":y,"left":x});
        $("#harry").css({"top":y_for_harry,"left":x_for_harry});
        if(x_b>x_h){
            // console.log("yes");
            $("#harry").css("transform","rotate3D(0,1,0,180deg)");
        }else {
            // console.log("no");
            $("#harry").css("transform","rotate3D(0,1,0,0deg)");
        }

    }
    /////////changes on false matches
    function cool_false_match () {
        if(first_card_clicked.find(".back").hasClass("back6") && second_card_clicked.find(".back").hasClass("back5") || first_card_clicked.find(".back").hasClass("back5") && second_card_clicked.find(".back").hasClass("back6")) {
            $(".card").find(".front").addClass("ron");
            setTimeout(function () {
                $(".card").find(".front").removeClass('ron');
            },4000);
        }
    }//cool_false_match
    ///vold match
    function cool_matches() {
        // console.log("second card clicked class: ", second_card_clicked.find(".back").hasClass("back9"));
        if(second_card_clicked.find(".back").hasClass("back9")) {
            $("#fullPage").css({"background":"url('images/vold1_background.gif') no-repeat","background-size":"cover"});
            setTimeout(function () {
                $("#fullPage").css({"background":"url('images/new background.png') no-repeat","background-size":"cover"});
            },4000);
        }//dombeldor
        else if (second_card_clicked.find(".back").hasClass("back2")) {
           $(".card").toggleClass('flipcard');
            setTimeout(function () {
                $(".card").toggleClass('flipcard');
            },2000);
        }///herminy
        else if (second_card_clicked.find(".back").hasClass("back6")) {
            var first  = first_card_clicked;
            var second = second_card_clicked;
            first.addClass('herminy');
            second.addClass('herminy');
            setTimeout(function () {
                first.removeClass('herminy');
                second.removeClass('herminy');
            }, 3000);
        }
        ///harry
        else if (second_card_clicked.find(".back").hasClass("back1")) {
            var first_harry = first_card_clicked;
            var second_harry = second_card_clicked;
            first_harry.find(".back").hide();
            second_harry.find(".back").hide();
            setTimeout(function () {
                first_harry.find(".back").show();
                second_harry.find(".back").show();
            }, 5000);
        }
    }//cool matches
    
    function cool_notmatch () {
        
    }
/////////adding classes or better said pairs dynamically
    random_pic();


    //////////function which picks random classes to have different places for images each time
    function random_pic () {
        var card=$(".card");
        var num_of_cards = card.length;
        var pics = ["back1", "back2", "back3", "back4", "back5", "back6", "back7", "back8", "back9"];
        var num_of_pairs = card_limit/2;
        pics = pics.splice(0,num_of_pairs);
        pics=pics.concat(pics);
        for (var j=0;j<num_of_cards;j++){
            var random_picker_number = Math.floor(Math.random()*pics.length);
            var separated_pic=pics.splice(random_picker_number,1);
            $(card[j]).find(".back").addClass(separated_pic[0]);
        }
    }//random_pics


});//ready