$(document).ready(function() {

  // Variables used for the standard 'beat' and user response
  var refs = [];
  var resps = [];

  $('#userResponse').hide();
  $('#countdown').hide();


/////////////////////////////////////////////////////////////////////
  // have some animation play on home screen --------- no timeout, repeat...
  // self-invoking function to perform animation?

  var itiContainer = d3.select('#svg-iti')
  .attr("height", '100%')
  .attr("width", '100%');
  // Need
  // 1) cartesian plane
  // 2) x and y scale (x changes based on resp.length, y on resp.min & resp.max)
  // 3) x and y axes (tap # and time in ms)

  var rpContainer = d3.select("#svg-rp")
  .attr("height", '100%')
  .attr("width", '100%');

  var circle = rpContainer.append("circle")
  .attr("cx", '50%')
  .attr("cy", '50%')
  .attr("r", '30%');
    // Need
    // 1) plot line function (takes in angle)
//////////////////////////////////////////////////////////////////////

  $('#start-button').click(runDemo);

});

var runDemo = function() {
  // Hide options section, replace with "tap here" button
  $('#options').hide();
  $('#userResponse').show();

  // use modeSelect to hide SVG charts if 'challenge'
  var modeSelect = $('input[name="mode"]').val();

  // use difficultySelect to determine which audio to serve
  var difficultySelect = $('input[name="difficulty"]').val();

  refs = [];
  var startTime = Date.now();
  refs.push(startTime);
  // 60 beats in audio files, will create reference array based on current time
  // , number of beats, and beat period (800ms)
  for(var i=0; i<60; i++) {
    refs.push(startTime + (800 * i));
  }
  // refs is now an array of the expected beat times

  // 1) countdown timer to audio serve
  counter();

  // 2) serve audio
  //    - ajax get request to get audio file
  //    - append audio tag to body with src = response, autoplay = true
  //    - include track tag to get currentTime, duration etc
  // WHILE currentTime < duration
  //    3) track user responses, store into resps
  //      --> what do about skipped taps? Rapid taps?
  //        --> if ITI < 600 DISREGARD TAP TIME
  //        --> if ITI > 1000 AWARD PERFECT TAP
  //        --> OR DO NOTHING!
  //    4) do math with user response
  //  *****
  //  4.5) update SVG charts
  //  *****
  // currentTime >= duration
  //  5) end of audio --> STOP tracking, enter 'review' mode
  //    --> some way to interact with figures
  //    --> 'click here' changed to 'done' (hide/shows, play animation)

  debugger;
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
  }
};

// doesn't delay on each number in countdown
var loop = function(timer, n) {
  timer.html(n);
  if (n > 0) {
    n--;
    setTimeout(function() { callLoop(timer, n);} , 1000);
  }
};

