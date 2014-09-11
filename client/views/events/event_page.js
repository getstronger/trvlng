Template.eventPage.helpers({
  eventScenes: function(){
    var getScenes = Scenes.find( { _id: { $in: this.scene } } ).fetch(); //find all scenes that are present in the current document's scene array
    return getScenes;
  },
  eventAttendees: function(){
    return 'poop';
  }
});
