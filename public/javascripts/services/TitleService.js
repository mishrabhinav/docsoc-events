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
 
