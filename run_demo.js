var runDemo = function() {
  // Hide options section, replace with "tap here" button
  $('#start-button').hide();
  $('#clicker').show().attr("disabled", true);

  // use modeSelect to hide SVG charts if 'challenge'
  var modeSelect = $('input[name="mode"]:checked').val();

  // use difficultySelect to determine which audio to serve
  var difficultySelect = $('input[name="difficulty"]:checked').val();

  refs = [];
  var startTime = Date.now();
  refs.push(startTime);

  // 60 beats in audio files, will create reference array based on current time
  // , number of beats, and beat period (800ms)
  for(var i=0; i<60; i++) {
    refs.push(startTime + (800 * i));
  }
  // refs is now an array of the expected beat times

  // 1) countdown timer to audio serve and button activation
  counter();

  // 2) serve audio
  audioServe(difficultySelect);

  var playing = false;
  $('#trackPlayer').on('playing', function() {
   playing = true;
   // disable button/link
  });

  scrollIti();

  // WHILE currentTime < duration (isPlaying)
  //    3) track user responses, store into resps
  //    4) do math with user response
  //  *****
  //  4.5) update SVG charts
  //    -- add new data point at (x, y)
  //    -- add new line at whatever angle
  //  *****
  // currentTime >= duration
  //  5) end of audio --> STOP tracking, enter 'review' mode
  //    --> some way to interact with figures

  $('#trackPlayer').on('ended', function() {
   playing = false;
   // enable button/link
   $('#finish-review').show();
   $('#clicker').hide();
  });
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

