var runDemo = function() {
  // Hide start button, replace with "tap here" button
  // (disabled for countdown)
  $('#start-button-group').hide();
  $('#runtimeResponse').show();
  $('#finish-review').hide();
  $('#clicker').attr("disabled", true).show();
  $('#quit').show();

  //speed selection
  var speedMap = {
    "slow": tapTrack.SlowTap,
    "medium": tapTrack.MediumTap,
    "fast": tapTrack.FastTap,
  },
  speed = $(this).attr('data-speed'),
  speedTapObj = speedMap[speed];

  speedTapObj.init();

  // 1) countdown timer to audio serve and button activation
  counter();

  // 2) serve audio
  audioServe();

  //animate svg-iti container at the pace of the beat
  scrollIti();

  //listen for user taps
  var startTime = Date.now();
  $('#clicker').click(function(event) {
    event.preventDefault();

    //add this tap to the list of user inputs
    var thisTap = Date.now() - startTime;
    speedTapObj.add(thisTap);

    //perform d3 to add new ITI data point, animate line
    plotItiPoint(thisTap,speedTapObj);

    //perform d3 to plot new RP line, update 'score'
    var angle = plotRpPoint(tapTrack.expectedResponses, thisTap);
    speedTapObj.addAngle(angle);
    speedTapObj.updateScore();

  });

  //end of audio stimulus, end user input
  $('#trackPlayer').on('ended', function() {
    playing = false;
    var score = $('#rpScore').text();
    updateUserScore(speed, score);
    demoOver(speedTapObj.numResponses());
  });

  // listen for 'quit'
  $('#quit').click(function(event) {
    event.preventDefault();
    demoOver(speedTapObj.numResponses());
    $('#trackPlayer').attr("src", "");
  });

};

var buildScoreBoard = function() {
  $.ajax({
    type: 'get',
    datatype: 'json',
    url: '/leaders',
  }).done(function(data) {
    $('.highScores').append(HandlebarsTemplates.build_leaderboard(data));
  }).fail(function() {
    alert('Something went wroooooong');
  });
};

var updateUserScore = function(speed, score) {
  var dataObj = {user: {}};
  $.ajax({
    type: 'get',
    datatype: 'json',
    url: '/user'
  }).done(function(userData) {
    if (speed === 'slow') {
      dataObj.user = { slow_score: score };
      if (userData.slow_score < score) {
        patchUserScore(dataObj);
      }
    }
    else if (speed === 'medium') {
      dataObj.user = { medium_score: score };
      if (userData.medium_score < score) {
        patchUserScore(dataObj);
      }
    }
    else if (speed === 'fast') {
      dataObj.user = { fast_score: score };
      if (userData.fast_score < score) {
        patchUserScore(dataObj);
      }
    }
  }).fail(function() {
    alert('must be signed in to save high scores!');
  });
};

var patchUserScore = function(dataObj) {
  $.ajax({
    type: 'put',
    datatype: 'json',
    data: dataObj,
    url: '/user'
  }).done(function() {
    alert('New High Score!');
    $('.highScores').empty();
    buildScoreBoard();
  }).fail(function() {
    alert('Error saving new high score');
  });
};

var demoOver = function(numTaps) {
  removeRpPoint(numTaps);
  $('#clicker').hide();
  $('#quit').hide();
  $('#clicker').unbind('click');
  $('#finish-review').attr('disabled', 'disabled').show();
  setTimeout(function() {
    $('#finish-review').attr("disabled", false);
  }, 3000);
};

var counter = function() {
  var timer = $('#countdown');
  timer.show();
  loop(timer, 5);
};

var callLoop = function(timer, n) {
  loop(timer, n);
  if (n<=0) {
    timer.hide();
    $('#clicker').attr("disabled", false);
  }
};

var loop = function(timer, n) {
  timer.html(n);
  if (n >= 0) {
    n--;
    setTimeout(function() { callLoop(timer, n);} , 800);
  }
};

var audioServe = function() {
    $('#trackPlayer').attr('src',
                           'https://s3.amazonaws.com/TapperTrackerTracks/Metronome_aud.wav');
};
