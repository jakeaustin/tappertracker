var runDemo = function() {
  // Hide start button, replace with "tap here" button
  // (disabled for countdown)
  $('#start-button').hide();
  $('#clicker').show().attr("disabled", true);

  // // Variables used for the standard 'beat' and user response
  // var resps = [];

  // //for 'slow' tapping challenge
  // var sloAngles = [];

  // //for 'medium' tapping
  // var medAnglesA = [];
  // var medAnglesB = [];

  // //for 'fast' tapping
  // var fasAnglesA = [];
  // var fasAnglesB = [];
  // var fasAnglesC = [];
  // var fasAnglesD = [];

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

  // use difficultySelect to determine which audio to serve
  var difficultySelect = $('input[name="difficulty"]:checked').val();

  // 1) countdown timer to audio serve and button activation
  counter();

  // 2) serve audio
  audioServe(difficultySelect);

  // not actually using playing yet....
  var playing = false;
  $('#trackPlayer').on('playing', function() {
    playing = true;
    // disable button/link
  });

  //animate svg-iti container at the pace of the beat
  scrollIti();

  //listen for user taps, save relative tap time in resps
  var startTime = Date.now();
  $('#clicker').click(function(event) {
    event.preventDefault();

    //add this tap to the list of user inputs
    var thisTap = Date.now() - startTime;
    speedTapObj.add(thisTap);

    //perform d3 to add new ITI data point, animate line
    plotItiPoint(thisTap,speedTapObj);

    //perform d3 to plot new RP line, update 'score'
    //default to 'slow' (800ms)
    var angle = plotRpPoint(tapTrack.expectedResponses, thisTap);

    //calculate score based on play speed
    // if (speedSelect === 'medium') {
    //   if (angle > -90 && angle < 90) {
    //     medAnglesA.push(angle);
    //   }
    //   else {
    //     if (angle > 0) {
    //       medAnglesB.push(angle);
    //     }
    //     else {
    //       medAnglesB.push(-angle);
    //     }
    //   }
    //   //require an equal number of taps in each group
    //   if (medAnglesA.length === medAnglesB.length) {
    //     updateScoreMed(medAnglesA, medAnglesB);
    //   }
    // }
    // else if (speedSelect === 'fast') {
    //   if (angle > -45 && angle < 45) {
    //     fasAnglesA.push(angle);
    //   }
    //   else if (angle < -45 && angle > -135) {
    //     fasAnglesB.push(angle);
    //   }
    //   else if (angle > 45 && angle < 135) {
    //     fasAnglesC.push(angle);
    //   }
    //   else {
    //     if (angle > 0) {
    //       fasAnglesD.push(angle);
    //     }
    //     else {
    //       fasAnglesD.push(-angle);
    //     }
    //   }
    //   //require an equal number of taps in each group
    //   if (fasAnglesA.length === fasAnglesB.length &&
    //       fasAnglesB.length === fasAnglesC.length &&
    //       fasAnglesC.length === fasAnglesD.length) {
    //     updateScoreFas(fasAnglesA, fasAnglesB, fasAnglesC, fasAnglesD);
    //   }
    // }
    // else {
    //   // sloAngles.push(plotRpPoint(tapTrack.expectedResponses, thisTap));
    //   speedTapObj.addAngle(angle);
    //   speedTapObj.updateScore();
    // }
    speedTapObj.addAngle(angle);
    speedTapObj.updateScore();

  });

  //end of audio stimulus, end user input
  $('#trackPlayer').on('ended', function() {
    playing = false;
    demoOver(resps.length);
  });
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

var audioServe = function(track) {
  if (track === 'regular') {
    $('#trackPlayer').attr('src',
                           'https://s3.amazonaws.com/TapperTrackerTracks/Metronome_aud.wav');
  }
  else {
    $('#trackPlayer').attr('src',
                           'https://s3.amazonaws.com/TapperTrackerTracks/SM_aud_1.wav');
  }
};
