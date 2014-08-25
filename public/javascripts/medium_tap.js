var tapTrack = tapTrack || {};

(function mediumTapIIFE(app){

  var _actualResponses = [],
      _anglesA = [],
      _anglesB = [],
      initialize = function(){
        _actualResponses = [];
        _anglesA = [];
        _anglesB = [];
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
        if (angle > -90 && angle < 90) {
          _anglesA.push(angle);
        }
        else {
          if (angle > 0) {
            _anglesB.push(angle);
          }
          else {
            _anglesB.push(-angle);
          }
        }
      },
      updateScore = function(){
        var scoreA = calcScore(_anglesA, 0);
        var scoreB = calcScore(_anglesB, 180);
        if (medAnglesA.length === medAnglesB.length) {
          d3.select('#rpScore')
            .text(((scoreA + scoreB)/2).toFixed(2));
        }
      },
      calcMean = function(){
        var sum = 0;
        for(var i=1; i< _actualResponses.length; i++) {
          sum += (_actualResponses[i] - _actualResponses[i-1]);
        }
        return  sum/_actualResponses.length;
      };

  app.SlowTap ={
    init: initialize,
    add: addResponse,
    lastDiff: lastDiff,
    addAngle: addAngle,
    numResponses: numResponses,
    updateScore: updateScore,
    calcMean: calcMean
  };

})(tapTrack);
