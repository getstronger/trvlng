Events = new Meteor.Collection('events');
Events.attachSchema(Schemas.Event);

Events.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Events.deny({
  update: function(userId, post, fieldNames) {
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
      throw new Meteor.Error(401, "You need to login to post new stories");
    
    // ensure the post has a title
    if (!eventAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');
    
    // check that there are no previous posts with the same link
    if (eventAttributes.url && eventWithSameLink) {
      throw new Meteor.Error(302, 
        'This link has already been posted', 
        eventWithSameLink._id);
    }
    
    // pick out the whitelisted keys
    var event = _.extend(_.pick(eventAttributes, 'url', 'title', 'message'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [], votes: 0
    });
    
    var eventId = Events.insert(event);
    
    return eventId;
  },
  attend: function(EventId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to attend");
    
    Events.update({
      _id: eventId, 
      attendees: {$ne: user._id}
    }, {
      $addToSet: {attendees: user._id},
      $inc: {travelers: 1}
    });
  }

})