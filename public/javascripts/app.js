var eventsApp = angular.module('eventsApp', []);

eventsApp.controller('eventsCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.events = [];

  $http.get('/api/events')
    .then(function(data){
      $scope.events = data.data;
    });

  $scope.updateEvents = function() {
    $http.get('/api/events')
      .then(function(data){
        $scope.events = data.data;
      })
  };

  $scope.signUp = function (slug) {
    window.location.href='/events/' + slug + '/signup';
    $scope.updateEvents();
  };

  $scope.startEvent = function (slug) {
    $scope.updateEvents();
  };

  $scope.editEvent = function (slug) {
    window.location.href='/events/' + slug + '/edit';
    $scope.updateEvents();
  };

  $scope.deleteEvent = function (slug) {
    $scope.updateEvents();
  };
}]);
