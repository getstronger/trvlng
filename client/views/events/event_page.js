Template.eventPage.helpers({
  comments: function() {
    return Comments.find({eventId: this._id});
  }
});