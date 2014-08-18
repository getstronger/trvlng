Events = new Meteor.Collection('events');

Events.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Events.deny({
  update: function(userId, event, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  event: function(eventAttributes) {
    var user = Meteor.user(),
      eventWithSameLink = Events.findOne({url: eventAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to event new stories");

    // ensure the event has a title
    if (!eventAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    // check that there are no previous events with the same link
    if (eventAttributes.url && eventWithSameLink) {
      throw new Meteor.Error(302, 
        'This link has already been evented', 
        eventWithSameLink._id);
    }

    // pick out the whitelisted keys
    var event = _.extend(_.pick(eventAttributes, 'url', 'title', 'message'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [], 
      votes: 0
    });

    var eventId = Events.insert(event);

    return eventId;
  },
  upvote: function(eventId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    Events.update({
      _id: eventId, 
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});