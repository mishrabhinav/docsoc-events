(function() {
  'use strict';
  angular
    .module('app')
    .controller('eventCtrl', ['$scope','$routeParams', 'API', 'TitleService', eventCtrl]);

  function eventCtrl($scope, $routeParams, API, TitleService) {
    API.id($routeParams.slug)
        .then(function(data){
          $scope.slugEvent = data.data;
          TitleService.setTitle('DoCSoc | ' + $scope.slugEvent.name);
        })
  };
})();
