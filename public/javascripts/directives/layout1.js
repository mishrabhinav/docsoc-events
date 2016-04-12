(function() {
  angular
    .module('app')
    .directive('ngEvent', ngEvent);

  function ngEvent() {
    return {
      restrict: 'E',
      scope: {
        event: '='
      }
      templateUrl: 'ngLayouts/ngLayout1' 
    }
  }
})();
