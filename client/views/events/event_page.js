Template.eventPage.helpers({
  eventDate: function(){ // Humanize the start and end date of this event
    var stDate = this.startDate;
    var displayDate =  moment(stDate).format('LLL');
    return displayDate;
  }
});