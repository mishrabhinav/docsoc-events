(function() {
  angular
    .module('app')
    .directive('ngEventVertical', ngEvent);

  function ngEvent() {
    return {
      restrict: 'E',
      scope: {
        event: '='
      },
      templateUrl: 'ngLayouts/ngVertical' 
    }
  }
})();
