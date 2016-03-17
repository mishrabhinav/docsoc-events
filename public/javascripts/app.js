var eventsApp = angular.module('eventsApp', []);

eventsApp.controller('eventsCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.events = [];

  $http.get('/api/events')
    .success(function(data){
      $scope.events = data;
    })
}]);
