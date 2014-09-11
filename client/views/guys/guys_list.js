Template.guysList.helpers({
  guys: function() {
    return Meteor.users.find().fetch();
  }
});