angular.module('predictster', [])

.controller('addPrediction', function($scope, $http) {
  
  $scope.prediction = {};
  
  $scope.submitPrediction = function() {
    $http({
      method: 'POST',
      url: '/api/predictions',
      data: $scope.prediction  
    });
  };

})

.controller('displayPredictions', function($scope, $http) {
  
  $scope.allPredictions = [];
  
  $scope.fetchPredictions = function() {
    $http({
      method: 'GET',
      url: '/api/all-predictions'
    }).then(function(response) {
      console.log(response.data);
      $scope.allPredictions = response.data;
    });
  };
  
  $scope.init = function() {
    $scope.fetchPredictions();
  };
  
  $scope.init();
  
});
