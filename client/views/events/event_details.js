Template.eventDetails.helpers({
    eventScenes: function(){
        return Scenes.find( { _id: { $in: this.scene }}, {name: 0, image: 0, _id: 1}); //find all scenes that are present in the current document's scene array
    },
    eventAttendees: function() {
      //return Scenes.find( { _id: { $in: this.scene }}, {name: 0, image: 0, _id: 1}); //find all scenes that are present in the current document's scene array

    }
  // guyView: function() { // If the user is currently logged in and has not already RSVP-ed, allow them to attend
  //   var UserId = Meteor.userId();
  //   var EventId = this._id;
  //   var EventAttendees = this.attending;
  //   console.log('Array of attendees =' + ' ' + EventAttendees);
  //   var guysAttending = Meteor.Users.find({_id: { $in: EventAttendees } });
  //   // console.log('poopsnacks' + guysAttending);
  //   // return guysAttending
  //   return Meteor.Users.find({_id: { $in: this.attending } });
  // }
});
// db.users.find({_id: { $in: ['JNHD5i92mkM3nvRmL'] } })
