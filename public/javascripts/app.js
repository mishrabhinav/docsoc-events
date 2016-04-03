var app = angular.module('app', ['ngRoute']);

// Routing
app.config(function($routeProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'events',
      controller: 'eventsCtrl'
    }).
    when('/manage', {
      templateUrl: 'manage',
      controller: 'eventsCtrl'
    }).
    when('/post', {
      templateUrl: 'post',
      controller: 'eventsCtrl'
    }).
    when('/login', {
      templateUrl: 'login',
      controller: 'eventsCtrl'
    })
})
// Declare Angular Constants here.
