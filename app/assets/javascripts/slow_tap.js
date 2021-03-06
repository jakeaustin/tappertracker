var tapTrack = tapTrack || {};

// Generate all expected responses.
(function(app){
  var i = 0;

  app.expectedResponses = [];

  for(i; i< 70; i++){
    app.expectedResponses.push(800 * i);
  }

})(tapTrack);

(function slowTapIIFE(app){

  var _actualResponses = [],
      _angles = [],
      initialize = function(){
        _actualResponses = [];
        _angles = [];
        drawMeanIti(800);
        drawMeanRP([0]);
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
        _angles.push(angle);
      },
      updateScore = function(){
        var score = calcScore(_angles, 0);
        $('#scoreReport').text(score.toFixed(2));
      },
      calcMeanIti = function(){
        var sum = 0;
        for(var i=1; i< _actualResponses.length; i++) {
          sum += (_actualResponses[i] - _actualResponses[i-1]);
        }
        return  sum/_actualResponses.length;
      },
      expectedMeanIti = function() {
        return 800;
      };

  app.SlowTap ={
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
