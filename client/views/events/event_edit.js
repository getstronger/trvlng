Template.eventEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentEventId = this._id;
    
    var eventProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    Event.update(currentEventId, {$set: eventProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('eventPage', {_id: currentEventId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this event?")) {
      var currentEventId = this._id;
      Event.remove(currentEventId);
      Router.go('home');
    }
  }
});
