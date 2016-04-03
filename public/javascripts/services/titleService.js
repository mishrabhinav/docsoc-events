app.factory('TitleService', [function(){
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
