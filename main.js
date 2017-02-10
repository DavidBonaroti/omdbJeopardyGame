$(function () {
  var score = 0;
  $(".questions div").on('click',function(){
      $("#maybe").remove();
      $(".prompt").append("<div id='maybe'><div id='question'></div><input id='input' type='text'><button id = 'button' type='submit'>Submit Answer</button></div>");
      var thisForm = this;
      var titles = ['batman','big','drive', 'hook', 'the matrix', 'the rock', 'he got game', 'fight club', 'the warriors', 'superbad', 'chinatown', 'back to the future', 'goodfellas', 'alien', 'pulp fiction', 'fargo', 'the master', 'there will be blood', 'jurassic park',
      'wall street', 'predator', 'die hard', 'true lies'];
      var title = titles[Math.floor(Math.random() * titles.length)];
      $.ajax({
        type: 'GET',
        url: "http://www.omdbapi.com/?t="+title+"&plot=short&r=json",
        success: function(data) {
          console.log("data", data);
          var title = data.Title;
          var year = data.Year;
          var plot = data.Plot;
          var actor = data.Actors;
          var director = data.Director;
          var mainActorArray = actor.split(",");
          var mainActor = mainActorArray[0];
          if($(thisForm).attr('id') == 'plot1') {
            $("#question").html("Movie Plot: " + plot);
          } else if ($(thisForm).attr('id') == 'actor1') {
            $("#question").html("Actors: " + actor);
          } else if ($(thisForm).attr('id') == 'director1') {
            $("#question").html("Director: " + director + "</br>" + "Year: " + year);
          }
          $("#button").on('click', function(){
            var answer = $("#input").val();
            var answerLower = answer.toLowerCase();
            var titleLower = title.toLowerCase();
            if(answerLower == titleLower) {
              $("#question").html("You are correct! You must not have a lot of hobbies...Why don't you try going outside every once in a while? Please select another category");
              var points = ($(thisForm).attr('value'));
              score += Number(points);
              $("#score").html(score);
            } else {
              var titleUpper = title.toUpperCase();
              $("#question").html("Wrong, sir! Wrong! The correct title was " + titleUpper + ". There it is! Black and white, clear as crystal! You guessed the wrong answer, so you get nothing! You lose! Good day, sir! ......... Now please select another category so that the game can continue!");
              var minusPoints = ($(thisForm).attr('value'));
              score -= Number(minusPoints);
              $("#score").html(score);
            }
            $("#input").val("");
            if (score >= 2000){
              $(".subjects div").remove();
              $(".questions").remove();
              $("#question").remove();
              $("#input").remove();
              $("#button").remove();
              $(".subjects").append("<div id='playAgain'>Congratulations! You've won OMDB Jeopardy. Would you like to play again? Please select from the option below.</div>");
              $(".subjects").append("<button id='pushPlay' type='submit'>Play Again!</button>");
              $("#pushPlay").on('click',function(){
                location.reload();
              });
            } else if (score <= -1000){
              $(".subjects div").remove();
              $(".questions").remove();
              $("#question").remove();
              $("#input").remove();
              $("#button").remove();
              $(".subjects").append("<div id='playAgain'>Congratulations! You lost! You are worthless! Try paying attention to the movie next time. Want to try again?</div>");
              $(".subjects").append("<button id='pushPlay' type='submit'>Play Again!</button>");
              $("#pushPlay").on('click',function(){
                location.reload();
              });
            }
          });
        }
      });
  });
});
