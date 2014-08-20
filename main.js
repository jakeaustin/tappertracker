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

  $('#finish-review').click(function() {
    d3.select('#scroll-iti')
    .transition()
    .duration(2000)
    .attr("transform", "translate(0, 0)")
    .ease('linear');

    $('#finish-review').attr("disabled","disabled");
    $('#finish-review').hide();
    $('#start-button').show();
    setTimeout(function() {
      d3.selectAll('#scroll-iti circle').remove();
      d3.selectAll('#scroll-iti line').remove();
    }, 2000);
    //run animation
  });
});
