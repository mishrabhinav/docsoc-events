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
    $http.get('/api/events/' + slug +'/start')
      .then(function(data){
        console.log(slug + ' started.');
      })
    $scope.updateEvents();
  };

  $scope.editEvent = function (slug) {
    window.location.href='/events/' + slug + '/edit';
    $scope.updateEvents();
  };

  $scope.deleteEvent = function (slug) {
    if(confirm("Delete the Event?")) {
      $http.delete('/api/events/' + slug)
        .then(function(data){})
        .catch(function(err){
          console.log(err);
        })
    }
    $scope.updateEvents();
  };
}]);
