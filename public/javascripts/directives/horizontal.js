(function() {
  angular
    .module('app')
    .directive('ngEventHorizontal', ngEvent);

  function ngEvent() {
    return {
      restrict: 'E',
      scope: {
        event: '='
      },
      templateUrl: 'ngLayouts/ngHorizontal' 
    }
  }
})();
