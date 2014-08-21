 // scales public so that run_demo can use them for plotting points
 //Create the Scale we will use for the Axis
 var xAxisScale = d3.scale.linear()
 .domain([-7, 85])
 .range([0, 3500]);

  var yAxisScale = d3.scale.linear()
  .domain([1600, 0])
  .range([10, 270]);

var initializeFigures = function() {
  var itiContainer = d3.select('#svg-iti')
  .attr("height", '100%')
  .attr("width", '90%');

  //tick values for x axis
  var tickVals = [-7, -6, -5, -4, -3, -2, -1, 0];
  for(var i=1; i<85; i++) {
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
  .attr('id', 'rpCircle')
  .attr("cx", '50%')
  .attr("cy", '50%')
  .attr("r", '30%');

  var center = rpContainer.append("circle")
  .attr('cx', '50%')
  .attr('cy', '50%')
  .attr('r', '1%')
  .attr('fill', 'yellow');

};

var scrollIti = function() {
  d3.select('#scroll-iti')
  .transition()
  .duration(52000)
  .attr("transform", "translate(-2500, 0)")
  .ease('linear');
};

var plotItiPoint = function(thisTap, resps) {
  var itiX = xAxisScale((thisTap / 800) + 1);
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
  if (resps.length != 1)
  d3.select('#scroll-iti').append("circle")
  .attr("cx", itiX)
  .attr("cy", itiY)
  .attr("r", 2);
};

var plotRpPoint = function(refs, aTap) {
  debugger;
    //seems like a bad selector.....
  var svgCircle = d3.select('#rpCircle');
  var r = parseInt(svgCircle.attr('r'));
  var x1 = window.innerWidth * 72.5 / 100;
  var y1 = 150;

  var diff = refs[Math.round(aTap/800)] - aTap;
  var angle = diff*360/800;

  var plotY = Math.cos(angle)*r;
  var plotX = Math.sin(angle)*r;

  svgCircle.append('line')
  .transition()
  .attr('stroke', 'red')
  .attr('stroke-width', 3)
  .attr('x1', x1)
  .attr('y1', y1)
  .attr('x2', plotX + x1)
  .attr('y2', plotY + y1)
  .duration(1000);

//debugger;
};
