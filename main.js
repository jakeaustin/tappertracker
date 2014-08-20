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
  //run animation
//////////////////////////////////////////////////////////////////////

  $('#start-button').click(runDemo);

  $('#finish-review').click(function() {
    d3.select('#scroll-iti')
    .attr('transform', 'translate(0, 0)');
    $('#finish-review').attr("disabled","disabled");
    $('#finish-review').hide();
    $('#start-button').show();
    refs = [];
    resps = [];
    //run animation
  });
});
