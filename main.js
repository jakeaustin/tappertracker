$(document).ready(function() {

  $('#clicker').hide();
  $('#finish-review').hide();
  $('#countdown').hide();

/////////////////////////////////////////////////////////////////////
  // have some animation play on home screen --------- no timeout, repeat...
  // self-invoking function to perform animation?

  initializeFigures();
  //run animation
//////////////////////////////////////////////////////////////////////

  $('#start-button').click(runDemo);

  $('#finish-review').click(rollBackIti);
       //run animation

});
