angular.module('predictster', [])

.controller('getPrediction', function($scope, $http) {
  
  $scope.prediction = {};
  
  $scope.submitPrediction = function() {
    console.log($scope.prediction);
    
    $http({
      method: 'POST',
      url: '/api/predictions',
      data: $scope.prediction  
    });
    
  };

});