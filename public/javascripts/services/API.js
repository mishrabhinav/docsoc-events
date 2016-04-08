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
