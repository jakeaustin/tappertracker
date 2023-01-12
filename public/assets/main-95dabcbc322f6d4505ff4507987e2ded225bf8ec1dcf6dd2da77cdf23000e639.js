var tapTrack = tapTrack || {};

$(document).ready(function() {

  $('#runtimeResponse').hide();
  $('#countdown').hide();
  $('#scoreCard').hide();
  $('#scoreReport').empty();
  $('.aboutPage').hide();

  $('.about-button, .aboutPage').click(function() {
    $('.aboutPage').toggle();
  });

  buildScoreBoard();

/////////////////////////////////////////////////////////////////////
  // have some animation play on home screen --------- no timeout, repeat...
  // self-invoking function to perform animation?

  initializeFigures();
  //run animation
//////////////////////////////////////////////////////////////////////

  $('.start-button').attr('disabled', false).click(runDemo);

  $('#finish-review').click(rollBackIti);
       //run animation

});
