var eventsApp = angular.module('eventsApp', []);

eventsApp.controller('eventsCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.events = [];

  $http.get('/api/events')
    .success(function(data){
      $scope.events = data;
    });

  $scope.startSignUp = function (slug) {

  };

  $scope.startEvent = function (slug) {

  };

  $scope.editEvent = function (slug) {
    window.location.href='/events/' + slug + '/edit'; 
  };

  $scope.deleteEvent = function (slug) {

  };
}]);
