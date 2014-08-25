var runDemo = function() {
  // Hide start button, replace with "tap here" button
  // (disabled for countdown)
  $('#start-button').hide();
  $('#clicker').show().attr("disabled", true);

  //speed selection
  var speedMap = {
    "slow": tapTrack.SlowTap,
    "medium": tapTrack.MediumTap,
    "fast": tapTrack.FastTap,
  },
  speedTapObj = speedMap[$('input[name="speed"]:checked').val()];
  speedTapObj.init();

  // use modeSelect to hide SVG charts if 'challenge'
  // var modeSelect = $('input[name="mode"]:checked').val();

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
    var speed = $('input[name="speed"]:checked').val();
    updateUserScore(speed, score);
    demoOver(speedTapObj.numResponses());
  });
};

var updateUserScore = function(speed, score) {
  //if speed === 'slow', get slow-score
  $.ajax({
    type: 'get',
    datatype: 'json',
    url: '/user'
  }).done(function() {debugger;});
  //if speed === 'medium', get medium-score
  //if speed === 'fast', get fast-score

  // var recordScore = $.ajax .........
  // if recordScore > score
  //    $.ajax post .....
};

var demoOver = function(numTaps) {
  removeRpPoint(numTaps);
  $('#clicker').hide();
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
