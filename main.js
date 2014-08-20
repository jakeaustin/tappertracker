$(document).ready(function() {

    // Variables used for the standard 'beat' and user response
    var refs = [];
    var resps = [];

    $('#clicker').hide();
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

   // height = 300px
   // width is a percentage....

   //Create the Scale we will use for the Axis
   var xAxisScale = d3.scale.linear()
   .domain([0, 50000])
   .range([0, 800]);

   var yAxisScale = d3.scale.linear()
   .domain([0, 1600])
   .range([0, 400]);

  //Create the Axis
  var xAxis = d3.svg.axis()
  .scale(xAxisScale);

  var yAxis = d3.svg.axis()
  .scale(yAxisScale)
  .orient('left');

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = itiContainer.append("g")
  .attr("class", "axis")
  .attr("width", 200)
  .attr("height", 10)
  .append("g")
  .attr("transform", "translate(0,10)")
  .call(xAxis);
  var yAxisGroup = itiContainer.append("g")
  .attr("class", "axis")
  .attr("width", 20)
  .attr("height", 400)
  .append("g")
  .attr("transform", "translate(0,400)")
  .call(yAxis);


  //////////////////////////////////////////////////////////////////////

  $('#start-button').click(runDemo);

});

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

  // WHILE currentTime < duration (isPlaying)
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

// doesn't delay on each number in countdown
var loop = function(timer, n) {
  timer.html(n);
  if (n > 0) {
    n--;
    setTimeout(function() { callLoop(timer, n);} , 800);
  }
};

