Events = new Meteor.Collection('events');

Events.allow({
  update: ownsDocument,
  remove: ownsDocument
});