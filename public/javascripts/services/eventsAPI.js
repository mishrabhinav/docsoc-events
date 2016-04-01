app.factory('api', ['$http', function($http){
  var factory = {};

  factory.all = function() {
    return $http.get('/api/events')
             .then(function(data){
               return data.data;
             })
  }

  return factory;
}])
