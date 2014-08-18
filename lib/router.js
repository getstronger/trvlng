Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')];
  }
});

EventsListController = RouteController.extend({
  template: 'eventsList',
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.eventsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('events', this.findOptions());
  },
  events: function() {
    return Events.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.events().count() === this.limit();
    var nextPath = this.route.path({eventsLimit: this.limit() + this.increment});
    return {
      events: this.events(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

Router.map(function() {
  this.route('eventPage', {
    path: '/events/:_id',
    waitOn: function(){
      return [
      Meteor.subscribe('singleEvent', this.params._id),
      Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Events.findOne(this.params._id); }
  });

  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function(){
      return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postSubmit', {
    path: '/submit',
    disableProgress: true
  });

this.route('eventsList', {
    path: '/:eventsLimit?',
    controller: EventsListController
  });
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('this.loadingTemplate');
    else
      this.render('accessDenied');
    pause();
  }
};
Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'eventSubmit'});
Router.onBeforeAction(function() { clearErrors();});