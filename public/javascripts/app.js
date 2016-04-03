var app = angular.module('app', ['ngRoute']);

// Routing
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'events',
      controller: 'eventsCtrl'
    }).
    when('/manage', {
      templateUrl: 'manage',
      controller: 'manageCtrl'
    }).
    when('/post', {
      templateUrl: 'post',
      controller: 'eventsCtrl'
    }).
    when('/login', {
      templateUrl: 'login',
      controller: 'eventsCtrl'
    }).
    when('/events/:slug', {
      templateUrl: 'event',
      controller: 'eventCtrl'
    }).
    when('/events/:slug/edit', {
      templateUrl: 'edit',
      controller: 'editCtrl'
    }).
    when('/events/:slug/signup', {
      templateUrl: 'signup',
      controller: 'eventCtrl'
    }).
    otherwise({
      redirectTo: '/'
    })

  $locationProvider.html5Mode(true);
}])

app.controller('MainController', ['$scope', 'TitleService',function($scope, TitleService){
  $scope.TitleService = TitleService;
}])

// Declare Angular Constants here.
