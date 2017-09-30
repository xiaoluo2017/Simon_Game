var cnt = 0;
var series = [];
var userSection = false;
var userIndex = 0;
var isStrict = false;
var audio = [];
var isWin = false;

$(document).ready(function() {
  // initial height
  $("#simon-board").css("height", $('#simon-board').outerWidth() + "px");
  $(".pad").css("height", $(".pad").outerWidth() + "px");
  $(".btn-danger").css("height", $(".btn-danger").outerWidth() + "px");
  $(".btn-warning").css("height", $(".btn-warning").outerWidth() + "px");
  $("#start").on("click", function(){ 
    gameReset();
  });

  $("#strict").on("click", function(){ 
    isStrict = !isStrict;
    if (isStrict) {
      $("#strict").addClass("btn-danger");
      $("#strict").removeClass("btn-warning");
    } else {
      $("#strict").addClass("btn-warning");
      $("#strict").removeClass("btn-danger");
    }
  });

  $("#green").on("click", function(){ 
    if (userSection) {
      if (series[userIndex] === 0) {
        userIndex++;
        if (userIndex === series.length) {
          generateSerie();
          if(!isWin) repetition();
        }
      } else {
        userError();
      }
    }
  });

  $("#red").on("click", function(){ 
    if (userSection) {
      if (series[userIndex] === 1) {
        userIndex++;
        if (userIndex === series.length) {
          generateSerie();
          if(!isWin) repetition();
        }
      } else {
        userError();
      }
    }
  });

  $("#yellow").on("click", function(){ 
    if (userSection) {
      if (series[userIndex] === 2) {
        userIndex++;
        if (userIndex === series.length) {
          generateSerie();
          if(!isWin) repetition();
        }
      } else {
        userError();
      }
    }
  });

  $("#blue").on("click", function(){ 
    if (userSection) {
      if (series[userIndex] === 3) {
        userIndex++;
        if (userIndex === series.length) {
          generateSerie();
          if(!isWin) repetition();
        }
      } else {
        userError();
      }
    }
  });
  for (var i = 0; i < 4; i++) {
    audio.push(document.createElement('audio'));
    audio[i].setAttribute('src', i +".mp3");
    audio[i].addEventListener('ended', function() {
      this.play();
    }, false);
  }
});

function userError() {
  userSection = false;
  var alarm = document.createElement('audio');
  alarm.setAttribute('src', "alarm.mp3");
  alarm.addEventListener('ended', function() {
  	this.play();
  }, false);
  playSound(alarm, 0, 1500);

  if (isStrict) {
  	hintBlink("! !");
  	window.setTimeout(function(){
      gameReset();
    }, 1500);
  } else {
    hintBlink("! !");
    window.setTimeout(function(){
      repetition();
    }, 1500);
  }
}

function gameReset() {
  series = [];
  cnt = 0;
  $("#brand").text("Simon");
  $("#result").html('<i class="fa fa-gamepad fa-3x" aria-hidden="true"></i>');
  hintBlink("--");
  gamestart();
}

function hintBlink(content) {
  $("#count").text("");;
  window.setTimeout(function(){
    $("#count").text(content);
  }, 400);
  window.setTimeout(function(){
    $("#count").text("");
  }, 600);
  window.setTimeout(function(){
    $("#count").text(content);
  }, 800);
}

function gamestart() {
  generateSerie();
  window.setTimeout(function(){
    repetition();
  }, 1500);
}

function repetition() {
  userIndex = 0;
  $("#count").text(cnt);
  var timeInterval = 800;
  if (cnt >= 13) {
    timeInterval = 200;
  } else if (cnt >= 9) {
  	timeInterval = 400;
  } else if (cnt >= 5) {
  	timeInterval = 600;
  }
  for (var i = 0; i < series.length; i++) {
  	(function(i) {
  	  console.log(i);
	  window.setTimeout(function(){
		padDisplay(series[i]);
	  }, i * timeInterval * 2 + timeInterval);
	  window.setTimeout(function(){
		padRestore(series[i]);
	  }, i * timeInterval * 2 + timeInterval * 2);
      playSound(audio[series[i]], i * timeInterval * 2 + timeInterval, i * timeInterval * 2 + timeInterval * 2)
	})(i); 
  }
  window.setTimeout(function(){
  	userSection = true;
  }, series.length * timeInterval * 2);
}

function generateSerie() {
  userSection = false;
  cnt++;
  if (cnt === 20) {
	winTheGame();
  }
  var index = Math.floor(Math.random() * 4);
  series.push(index);
}

function winTheGame() {
  isWin = true;
  $("#count").text(cnt);
  $("#brand").text("WIN!");
  $("#result").html('<i class="fa fa-trophy fa-4x" aria-hidden="true" style="color: #ffc107"></i>');
}

function padDisplay(padIndex) {
  if (padIndex === 0) {
    $("#green").css("background-color", "#3cfa67");
  } else if (padIndex === 1) {
    $("#red").css("background-color", "#ff4f67");
  } else if (padIndex === 2) {
    $("#yellow").css("background-color", "#fffa0a");
  } else {
    $("#blue").css("background-color", "#00b8ff");
  }
}

function padRestore(padIndex) {
  if (padIndex === 0) {
    $("#green").css("background-color", " #28a745");
  } else if (padIndex === 1) {
    $("#red").css("background-color", "#aa3545");
  } else if (padIndex === 2) {
    $("#yellow").css("background-color", "#aaa107");
  } else {
    $("#blue").css("background-color", "#007baa");
  }
}

function playSound(audio, start, end) {
  console.log("check");
  window.setTimeout(function(){
    audio.play();
  }, start);
  window.setTimeout(function(){
    audio.pause();
    audio.currentTime = 0;
  }, end);
}
