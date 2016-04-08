(function() {
  'use strict';
  angular
    .module('app')
    .controller('editCtrl', ['$scope','$routeParams', 'API', 'TitleService', editCtrl]);

  function editCtrl($scope, $routeParams, API, TitleService) {
    API.id($routeParams.slug)
        .then(function(data){
          $scope.editEvent = data.data;
          TitleService.setTitle('DoCSoc | Edit Event');
        })
  };
})();
