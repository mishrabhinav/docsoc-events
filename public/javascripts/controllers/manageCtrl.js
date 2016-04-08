(function() {
  'use strict';
  angular
    .module('app')
    .controller('manageCtrl', ['$scope', '$window', 'API', 'TitleService', manageCtrl]);

  function manageCtrl($scope, $window, API, TitleService) {

    TitleService.setTitle('DoCSoc | Manage Events');

    $scope.updateEvents = function() {
       API.all()
       .then(function(data){
         $scope.events = data.data;
       });
    };

    $scope.updateEvents();

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
      $window.location.href='/events/' + slug + '/edit';
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
