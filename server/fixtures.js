// Fixture data 
if (Events.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var bradId = Meteor.users.insert({
    profile: { name: 'Brad Strong' }
  });
  
  var brad = Meteor.users.findOne(bradId);

  var anthonyID = Meteor.users.insert({
    profile: { name: 'Anthony Reisinger' }
  });

  var anthony = Meteor.users.findOne(anthonyID);


// Manually create Events

  Events.insert({
    title: 'Brad\'s Event',
    userId: brad._id,
    author: brad.profile.name,
    url: 'http://bradstrong.com',
    submitted: now - 10 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0
  });

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: anthony._id,
    author: anthony.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    submitted: now - 7 * 3600 * 1000,
    commentsCount: 2
  });

  Comments.insert({
    postId: telescopeId,
    userId: brad._id,
    author: brad.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: anthony._id,
    author: anthony.profile.name,
    submitted: now - 3 * 3600 * 1000,
    body: 'You sure can Tom!'
  });

  Posts.insert({
    title: 'Meteor',
    userId: brad._id,
    author: brad.profile.name,
    url: 'http://meteor.com',
    submitted: now - 10 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0
  });

  Posts.insert({
    title: 'The Meteor Book',
    userId: brad._id,
    author: brad.profile.name,
    url: 'http://themeteorbook.com',
    submitted: now - 12 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: anthony.profile.name,
      userId: anthony._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: now - i * 3600 * 1000,
      commentsCount: 0,
      upvoters: [], votes: 0
    });
  }

  for (var i = 0; i < 10; i++) {
    Events.insert({
      title: 'Test event #' + i,
      author: anthony.profile.name,
      userId: anthony._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: now - i * 3600 * 1000,
      commentsCount: 0,
      upvoters: [], votes: 0
    });
  }

}