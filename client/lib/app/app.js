angular.module('predictster', [])

.controller('addPrediction', function($scope, $http) {
  
  $scope.prediction = {};
  
  $scope.submitPrediction = function() {
    $http({
      method: 'POST',
      url: '/api/predictions',
      data: $scope.prediction  
    }).then(window.location.reload());
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
  
  $scope.expand = function(prediction) {
    console.log('expand');
    console.log(prediction);
    if (!prediction.show) {
      prediction.show = true;
    } else {
      prediction.show = false;
    }
  };
  
  $scope.updateStatus = function(status, prediction) {    
    var data = {
      id: prediction.id,
      status: status
    };
    
    $http({
      method: 'POST',
      url: '/api/prediction-status',
      data: data
    }).then(window.location.reload());
  };
  
})

.controller('signUp', function($scope, $http) {
  $scope.credentials = {};
  
  $scope.submitCredentials = function() {
    $http({
      method: 'POST',
      url: '/api/sign-up',
      data: $scope.credentials
    }).success(
      function() {
        $scope.credentials = {};
        window.location.pathname = '/';
      }
    );
  };
  
})

.controller('signIn', function($scope, $http, $location) {
  $scope.credentials = {};
  
  $scope.submitCredentials = function() {
    $http({
      method: 'POST',
      url: '/api/sign-in',
      data: $scope.credentials
    }).success(
      function() {
        $scope.credentials = {};
        window.location.pathname = '/';
      }
    );
  };
});
  
