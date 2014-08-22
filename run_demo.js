var runDemo = function() {
  // Hide start button, replace with "tap here" button
  // (disabled for countdown)
  $('#start-button').hide();
  $('#clicker').show().attr("disabled", true);

  // Variables used for the standard 'beat' and user response
  var refs = [];
  var resps = [];
  var angles = [];

  // use modeSelect to hide SVG charts if 'challenge'
  var modeSelect = $('input[name="mode"]:checked').val();

  // use difficultySelect to determine which audio to serve
  var difficultySelect = $('input[name="difficulty"]:checked').val();

  // 60 beats in audio files, will create reference array based on current time
  // , number of beats, and beat period (800ms)
  for(var i=0; i<70; i++) {
    refs.push(800 * i);
  }
  // refs is now an array of the expected beat times

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
    resps.push(thisTap);

    //perform d3 to add new data point, animate line
    plotItiPoint(thisTap, resps);

    angles.push(plotRpPoint(refs, thisTap));
    //perform d3 to add new RP data line, animate
    //RP D3 LINE
    updateStdRpVal(angles);
  });

  //end of audio stimulus, end user input
  $('#trackPlayer').on('ended', function() {
   playing = false;
   demoOver(resps.length);
   debugger;
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

