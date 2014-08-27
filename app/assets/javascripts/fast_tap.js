var tapTrack = tapTrack || {};

(function fastTapIIFE(app){

  var _actualResponses = [],
  _anglesA = [],
  _anglesB = [],
  _anglesC = [],
  _anglesD = [],

  initialize = function(){
    _actualResponses = [];
    _anglesA = [];
    _anglesB = [];
    _anglesC = [];
    _anglesD = [];
    drawMeanIti(200);
    drawMeanRP([0, 90, -90, 180]);
  },
  addResponse = function(tapTime){
    _actualResponses.push(tapTime);
  },
  lastDiff = function(){
    var len = _actualResponses.length;
    var val = _actualResponses[len -1] - _actualResponses[len -2];
    return val;
  },
  numResponses = function(){
    return _actualResponses.length;
  },
  addAngle = function(angle){
    if (angle > -45 && angle < 45) {
      _anglesA.push(angle);
    }
    else if (angle < -45 && angle > -135) {
      _anglesB.push(angle);
    }
    else if (angle > 45 && angle < 135) {
      _anglesC.push(angle);
    }
    else {
      if (angle > 0) {
        _anglesD.push(angle);
      }
      else {
        _anglesD.push(-angle);
      }
    }
  },
  updateScore = function(){
    var scoreA = calcScore(_anglesA, 0);
    var scoreB = calcScore(_anglesB, -90);
    var scoreC = calcScore(_anglesC, 90);
    var scoreD = calcScore(_anglesD, 180);
    if (_anglesA.length === _anglesB.length) {
      d3.select('#rpScore')
      .text(((scoreA + scoreB + scoreC + scoreD)/4).toFixed(2));
    }
  },
  calcMeanIti = function(){
    var sum = 0;
    for(var i=1; i< _actualResponses.length; i++) {
      sum += (_actualResponses[i] - _actualResponses[i-1]);
    }
    return  sum/_actualResponses.length;
  },
  expectedMeanIti = function() {
    return 200;
  };

  app.FastTap ={
    init: initialize,
    add: addResponse,
    lastDiff: lastDiff,
    addAngle: addAngle,
    numResponses: numResponses,
    updateScore: updateScore,
    calcMeanIti: calcMeanIti,
    expectedMeanIti: expectedMeanIti,
  };

})(tapTrack);
