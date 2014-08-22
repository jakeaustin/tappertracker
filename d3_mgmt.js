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

  var xGrid = itiContainer.select('#scroll-iti').append('g');

  for(var j=-7; j<85; j++) {
    xGrid.append('line')
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .attr('x1', xAxisScale(j))
    .attr('y1', yAxisScale(0))
    .attr('x2', xAxisScale(j))
    .attr('y2', yAxisScale(1600));
  }

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

  var yGrid = itiContainer.select('#scroll-iti').append('g');

  for(var k=0; k<16; k+=2) {
    yGrid.append('line')
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .attr('x1', xAxisScale(-7))
    .attr('y1', yAxisScale(k*100))
    .attr('x2', xAxisScale(85))
    .attr('y2', yAxisScale(k*100));
  }

  var meanIti = yGrid.append('line')
  .attr('id', 'mean-iti-line')
  .attr('stroke', 'green')
  .attr('stroke-width', 3)
  .attr('x1', xAxisScale(-7))
  .attr('y1', yAxisScale(800))
  .attr('x2', xAxisScale(85))
  .attr('y2', yAxisScale(800));

  var rpContainer = d3.select("#svg-rp")
  .attr("height", 300)
  .attr("width", 300);

  var circle = rpContainer.append("circle")
  .attr('id', 'rpCircle')
  .attr("cx", 150)
  .attr("cy", 150)
  .attr("r", 100)
  .attr('fill', 'grey');

  var center = rpContainer.append("circle")
  .attr('cx', 150)
  .attr('cy', 150)
  .attr('r', 5)
  .attr('fill', 'yellow');

  var score = rpContainer.append('g')
  .attr('transform', 'translate(125, 50)')
  .append('text')
  .attr('id', 'rpScore')
  .text('Score');

  var onBeat = rpContainer.append('g')
  .attr('transform', 'translate(230, 155)')
  .append('text')
  .text('On Beat');

  var offBeat = rpContainer.append('g')
  .attr('transform', 'translate(10, 155)')
  .append('text')
  .text('Off Beat');

};

var scrollIti = function() {
  d3.select('#scroll-iti')
  .transition()
  .duration(52000)
  .attr("transform", "translate(-2500, 0)")
  .ease('linear');
};

var rollBackIti = function() {
  d3.select('#scroll-iti')
  .transition()
  .duration(2000)
  .attr("transform", "translate(0, 0)")
  .ease('linear');

  $('#finish-review').attr("disabled","disabled");
  $('#finish-review').hide();
  $('#start-button').attr("disabled", "disabled").show();

  setTimeout(function() {
    d3.selectAll('#scroll-iti circle').remove();
    d3.selectAll('#scroll-iti .dataLine').remove();

    d3.select('#mean-iti-line')
    .transition()
    .attr('transform', 'translate(0,'+yAxisScale(1650)+')')
    .duration(200);

    $('#start-button').attr("disabled", false);
  }, 2000);
};

var removeRpPoint = function(x) {
  d3.select('.rp-line:last-child').remove();
  if (x > 1) {
    setTimeout(removeRpPoint, 10, [x-1]);
  }
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
    .attr('class', 'dataLine')
    .attr('stroke', 'blue')
    .attr('stroke-width', 4)
    .attr("x1", oldX)
    .attr("y1", oldY)
    .attr("x2", itiX)
    .attr("y2", itiY)
    .duration(1000);
  }

  // //ITI D3 PLOT
  if (resps.length != 1) {
    d3.select('#scroll-iti').append("circle")
    .attr("cx", itiX)
    .attr("cy", itiY)
    .attr("r", 2);
  }

  //Update Mean ITI X axis
  if (resps.length > 1) {
    var sum = 0;
    for(var i=1; i<resps.length; i++) {
      sum += (resps[i] - resps[i-1]);
    }
    var mean = sum/resps.length;
    var scaledMean = yAxisScale(mean) - yAxisScale(800);

    var meanLine = d3.select('#mean-iti-line')
    .transition()
    .attr('transform', 'translate(0,'+scaledMean+')')
    .duration(200);
  }
};

var plotRpPoint = function(refs, aTap) {
  var svgCircle = d3.select('#rpCircle');
  var r = parseInt(svgCircle.attr('r'));
  var x1 = 150;
  var y1 = 150;

  var diff = refs[Math.round(aTap/800)] - aTap;

  var angle = diff*360/800;
  var plotY = 0;
  var plotX = 0;

  if (angle >= -90 && angle <= 90) {
    plotY = Math.sin(angle*Math.PI/180)*r;
    plotX = Math.cos(angle*Math.PI/180)*r;
  }
  else if (angle > 90) {
    plotY = Math.cos((angle-90)*Math.PI/180)*r;
    plotX = -Math.sin((angle-90)*Math.PI/180)*r;
  }
  else if (angle < -90) {
    plotY = -Math.cos((angle+90)*Math.PI/180)*r;
    plotX = Math.sin((angle+90)*Math.PI/180)*r;
  }

  d3.select('.rp-line:last-child')
  .transition()
  .attr('stroke', 'yellow')
  .attr('stroke-width', 1)
  .duration(800);

  d3.select('#svg-rp').append('line')
  .transition()
  .attr('class', 'rp-line')
  .attr('stroke', 'red')
  .attr('stroke-width', 2)
  .attr('x1', x1)
  .attr('y1', y1)
  .attr('x2', plotX + x1)
  .attr('y2', plotY + y1)
  .duration(400);

  return angle;
};

updateStdRpVal = function(angles) {
  var sum = 0;
  for(var i=0; i<angles.length; i++) {
    sum += angles[i];
  }
  var meanAng = sum / angles.length;

  sum = 0;
  for(var j=0; j<angles.length; j++) {
    sum += Math.pow((angles[j] - meanAng), 2);
  }
  var meanDiff = sum / angles.length;
  var stdDev = Math.sqrt(meanDiff);

  d3.select('#rpScore')
  .text(Math.round(stdDev) + ' ms');
};
