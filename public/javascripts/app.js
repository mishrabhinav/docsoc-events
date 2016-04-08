angular
  .module('app', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
      when('/', {
        templateUrl: 'partials/events',
        controller: 'eventsCtrl'
      }).
      when('/manage', {
        templateUrl: 'partials/manage',
        controller: 'manageCtrl'
      }).
      when('/post', {
        templateUrl: 'partials/post',
        controller: 'eventsCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login',
        controller: 'eventsCtrl'
      }).
      when('/events/:slug', {
        templateUrl: 'partials/event',
        controller: 'eventCtrl'
      }).
      when('/events/:slug/edit', {
        templateUrl: 'partials/edit',
        controller: 'editCtrl'
      }).
      when('/events/:slug/signup', {
        templateUrl: 'partials/signup',
        controller: 'eventCtrl'
      }).
      otherwise({
        redirectTo: '/'
      })

    $locationProvider.html5Mode(true);
  }])
  .controller('MainController', ['$scope', 'TitleService',function($scope, TitleService){
    $scope.TitleService = TitleService;
  }]);
