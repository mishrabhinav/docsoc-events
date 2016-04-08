(function() {
  'use strict';
  angular
    .module('app')
    .controller('eventsCtrl', ['$scope', '$location', 'API', eventsCtrl]);

  function eventsCtrl($scope, $location, API) {
    $scope.updateEvents = function() {
       API.all()
       .then(function(data){
         $scope.events = data.data;
       });
    };

    $scope.updateEvents();

    $scope.signUp = function (slug) {
      $location.url('/events/' + slug + '/signup');
      $scope.updateEvents();
    };

    $scope.startEvent = function (slug) {
      API.start(slug)
         .then(function(data){
           console.log(slug + ' started.');
         })
      $scope.updateEvents();
    };

    $scope.endEvent = function (slug) {
      API.end(slug)
         .then(function(data){
           console.log(slug + ' ended.');
         })
      $scope.updateEvents();
    };

    $scope.editEvent = function (slug) {
      $location.url('/events/' + slug + '/edit');
      $scope.updateEvents();
    };

    $scope.deleteEvent = function (slug) {
      API.remove(slug)
         .then(function(data){})
         .catch(function(err){
           console.log(err);
         })
      $scope.updateEvents();
    };
  };
})();
