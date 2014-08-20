$(document).ready(function() {

  // Variables used for the standard 'beat' and user response
  var refs = [];
  var resps = [];

  $('#clicker').hide();
  $('#finish-review').hide();
  $('#countdown').hide();

/////////////////////////////////////////////////////////////////////
  // have some animation play on home screen --------- no timeout, repeat...
  // self-invoking function to perform animation?

  initializeFigures();
//////////////////////////////////////////////////////////////////////

  $('#start-button').click(runDemo);

  $('#finish-review').click(function() {
    d3.select('#scroll-iti')
    .attr('transform', 'translate(0, 0)');

    $('#finish-review').hide();
    $('#start-button').show();
  });
});

var initializeFigures = function() {
  var itiContainer = d3.select('#svg-iti')
  .attr("height", '100%')
  .attr("width", '100%');
  //tick values for x axis
  var tickVals = [];
  for(var i=1; i<71; i++) {
    tickVals.push(i);
  }
 //Create the Scale we will use for the Axis
 var xAxisScale = d3.scale.linear()
 .domain([1, 72])
 .range([0, 2500]);

  //Create the Axis
  var xAxis = d3.svg.axis()
  .scale(xAxisScale)
  .tickValues(tickVals);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = itiContainer.select('#scroll-iti').append("g")
  .attr("class", "x axis")
  .attr("width", 200)
  .attr("height", 10)
  .attr('transform', 'translate(0,275)')
  .call(xAxis);

  var rpContainer = d3.select("#svg-rp")
  .attr("height", '100%')
  .attr("width", '100%');

  var circle = rpContainer.append("circle")
  .attr("cx", '50%')
  .attr("cy", '50%')
  .attr("r", '30%');

};

var runDemo = function() {
  // Hide options section, replace with "tap here" button
  $('#start-button').hide();
  $('#clicker').show();

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

  // 1) countdown timer to audio serve
counter();

  // 2) serve audio
  //    - ajax get request to get audio file
  //    - append audio tag to body with src = response, autoplay = true
  //    - get currentTime, duration etc
  audioServe(difficultySelect);
  var playing = false;
  $('#trackPlayer').on('playing', function() {
   playing = true;
   // disable button/link
 });

  d3.select('#scroll-iti')
  .transition()
  .duration(48000)
  .attr("transform", "translate(-2100, 0)")
  .ease('linear');
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
  // NEED REDIRECT FROM finish-review TO start
  //  6) homescreen animation

  //debugger;
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

var loop = function(timer, n) {
  timer.html(n);
  if ((n > -55) || (n >= 0)) {
    console.log(n);
    n--;
    setTimeout(function() { callLoop(timer, n);} , 800);
  }
};

