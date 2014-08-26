Template.eventItem.helpers({
  ownEvent: function() { // Detect if the current user owns this event
    return this.userId == Meteor.userId();
  },
  domain: function() { // Display the domain of the event's external website
    var a = document.createElement('a');
    a.href = this.website;
    return a.hostname;
  },
  dateRange: function(){ // Humanize the start and end date of this event
  var startTime = this.startDate;
  var endTime = this.endDate;
  var range = moment(startTime).twix(endTime, {allDay: true});
  return range.format();
  },
  attendedClass: function() { // If the user is currently logged in and has not already RSVP-ed, allow them to attend
    var userId = Meteor.userId();
    if (userId && !_.include(this.attendees, userId)) {
      return 'btn-primary attendable';
    } else {
      return 'disabled';
    }
  }
});

Template.eventItem.events({ // Allow users to attend current event
  'click .attendable': function(e) {
    e.preventDefault();
    Meteor.call('attend', this._id);
  }
});