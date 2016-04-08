(function() {
  'use strict';
  angular
    .module('app')
    .factory('TitleService', [function(){
      var title = 'DocSoc | Events';
  
      return {
        title: function() {
          return title;
        },
        setTitle: function(newTitle) {
          title = newTitle;
        }
      }
    }])
    .service('API', ['$http', function($http){
    
      var endpoint = '/api/events/';
      var postConfig = {
                         headers : {
                           'Content-Type': 'application/json'
                         }
                       }
    
      this.all = function() {
        return $http.get(endpoint);
      }
    
      this.id = function(slug) {
        return $http.get(endpoint + slug);
      }
    
      this.delete = function(slug) {
        if(confirm('Delete Event: ' + slug +'?')) {
          return $http.delete(endpoint + slug);
        }
      }
    
      this.start = function(slug) {
        return $http.post(endpoint + slug + '/state',
                          {"signUpOpen": true},
                          postConfig);
      }
    
      this.end = function(slug) {
        return $http.post(endpoint + slug + '/state',
                          {"signUpOpen": false},
                          postConfig);
      }
    }]);
})();
