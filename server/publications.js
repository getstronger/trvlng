Meteor.publish('events', function(options) {
  return Events.find({}, options);
});

Meteor.publish('singleEvent', function(id) {
  return id && Events.find(id);
});


Meteor.publish('comments', function(eventID) {
  return Comments.find({eventID: eventID});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('users', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('currentUser', function() {
  return Meteor.users.find(this.userId, {fields: {createdAt: 1, intercomHash: 1}});
});