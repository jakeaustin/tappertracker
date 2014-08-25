var tapTrack = tapTrack || {};

(functions mediumTapIIFE(app){

  var _actualResponses = [],
      initialize = function(){
        _actualResponses = [];
      },
      addResponse = function(tapTime){
        _actualResponses.push(tapTime);
      },
      lastDiff = function(){
        var len = _actualResponses.length;
        return _actualResponses[len -1] = _actualResponses[len -2];
      },
      numResponses = function(){
        return _actualResponses.length;
      };


  app.MediumTap ={
    init: initialize,
    add: addResponse,
    lastDiff: lastDiff
  };

})(tapTrack);
