Template.eventItem.helpers({
  ownEvent: function() { // Detect if the current user owns this event
    return this.userId == Meteor.userId();
  },
  dateRange: function(){ // Humanize the start and end date of this event
  var startTime = this.startDate;
  var endTime = this.endDate;
  var range = moment(startTime).twix(endTime, {allDay: true});
  return range.format();
  },
  attendClass: function() { // If the user is currently logged in and has not already RSVP-ed, allow them to attend
    var userId = Meteor.userId();
    if (userId && !_.include(this.attending, userId)) {
      return 'btn-primary attendable';
    } else if (userId && _.include(this.attending, userId)){ // User is attending
      return 'attending disabled'
    } else {
      return 'disabled';
    }
  },
  attendText: function() { // If the user is currently logged in and has not already RSVP-ed, allow them to attend
    var userId = Meteor.userId();
    if (userId && !_.include(this.attending, userId)) {
      return 'attend';
    } else if (userId && _.include(this.attending, userId)){
      return 'attending'
    } else {
      return 'attend';
    }
  },
  gradientClass: function(){
    var getRandom = function(min, max) {
      return Math.random() * (max - min) + min;
    };
    gradientId = Math.round(getRandom(1,98));
    return 'bg-gradient-' + gradientId;
  }
});

Template.eventItem.events({ // Allow users to attend current event
  'click .attendable': function(e) {
    e.preventDefault();
    Meteor.call('attend', this._id);
  }
});