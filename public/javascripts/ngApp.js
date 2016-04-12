(function() {
  'use strict';
  
  angular
    .module('app', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', router])
    .controller('MainController', ['$scope', 'TitleService', title]);
  
  function router($routeProvider, $locationProvider) {
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
  }
  
  function title($scope, TitleService) {
    $scope.TitleService = TitleService;
  }
})();

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

(function() {
  'use strict';
  angular
    .module('app')
    .factory('API', ['$http', API]);
             
  function API($http) {
    var endpoint = '/api/events/';
    var postConfig = {headers : {'Content-Type': 'application/json'}}
  
    var factory = {
      all     : all,
      id      : id,
      remove  : remove,
      start   : start,
      end     : end
    };

    return factory;
 
    function all() {
      return $http.get(endpoint);
    }
  
    function id(slug) {
      return $http.get(endpoint + slug);
    }
  
    function remove(slug) {
      if(confirm('Delete Event: ' + slug +'?')) {
        return $http.delete(endpoint + slug);
      }
    }
  
    function start(slug) {
      return $http.post(endpoint + slug + '/state',
                        {"signUpOpen": true},
                        postConfig);
    }
  
    function end(slug) {
      return $http.post(endpoint + slug + '/state',
                        {"signUpOpen": false},
                        postConfig);
    }
  };
})();

(function() {
  'use strict';
  angular
    .module('app')
    .factory('TitleService', TitleService);

  function TitleService() {
    var factory = {
      title    : title,
      setTitle : setTitle
    };

    return factory;

    var _title = 'DocSoc | Events';
  
    function title() {
      return _title;
    }
    
    function setTitle(newTitle) {
      _title = newTitle;
    }
  };
})();
 

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
