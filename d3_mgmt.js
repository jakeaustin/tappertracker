 // scales public so that run_demo can use them for plotting points
 //Create the Scale we will use for the Axis
 var xAxisScale = d3.scale.linear()
 .domain([1, 72])
 .range([0, 2500]);

  var yAxisScale = d3.scale.linear()
  .domain([1600, 0])
  .range([10, 270]);

var initializeFigures = function() {
  var itiContainer = d3.select('#svg-iti')
  .attr("height", '100%')
  .attr("width", '90%');

  //tick values for x axis
  var tickVals = [];
  for(var i=1; i<71; i++) {
    tickVals.push(i);
  }


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


  var yAxis = d3.svg.axis()
  .scale(yAxisScale)
  .orient('left')
  .ticks(8);

  var yAxisGroup = itiContainer.append('g')
  .attr('class', 'y axis')
  .attr('width', 10)
  .attr('height', 300)
  .attr('transform', 'translate(50,0)')
  .call(yAxis);

  var rpContainer = d3.select("#svg-rp")
  .attr("height", '100%')
  .attr("width", '100%');

  var circle = rpContainer.append("circle")
  .attr("cx", '50%')
  .attr("cy", '50%')
  .attr("r", '30%');

};

var scrollIti = function() {
  d3.select('#scroll-iti')
  .transition()
  .duration(48000)
  .attr("transform", "translate(-1800, 0)")
  .ease('linear');
};

var plotItiPoint = function(thisTap, resps) {
  var itiX = xAxisScale((thisTap / 800) + 6);
  var itiY = yAxisScale(resps[resps.length-1] - resps[resps.length-2]);

  // draw line connecting plot point to previous point
  if (resps.length > 2) {
    var oldX = d3.select('#scroll-iti circle:last-child').attr('cx');
    var oldY = d3.select('#scroll-iti circle:last-child').attr('cy');

    d3.select('#scroll-iti').append("line")
    .transition()
    .attr('stroke', 'blue')
    .attr('stroke-width', 4)
    .attr("x1", oldX)
    .attr("y1", oldY)
    .attr("x2", itiX)
    .attr("y2", itiY)
    .duration(1000);
  }

  // //ITI D3 PLOT
  d3.select('#scroll-iti').append("circle")
  .attr("cx", itiX)
  .attr("cy", itiY)
  .attr("r", 6);
};
