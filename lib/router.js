Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('currentUser'),
      Meteor.subscribe('notifications')
    ];
  }
});

EventsListController = RouteController.extend({
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.eventsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('events', this.findOptions());
  },
  events: function() {
    return Events.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.events().count() === this.limit();
    return {
      events: this.events(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewEventsListController = EventsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newEvents.path({eventsLimit: this.limit() + this.increment});
  }
});

BestEventsListController = EventsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestEvents.path({eventsLimit: this.limit() + this.increment});
  }
});

//FilterEventsListController = EventsListController.extend({
//  // sort: {votes: -1, submitted: -1, _id: -1},
//  nextPath: function() {
//    return Router.routes.filterEvents.path({eventsLimit: this.limit() + this.increment});
//  }
//});

// Create Routes

Router.route('/', {
  name: 'eventsList',
  controller: 'NewEventsListController',
  action: function () {
    this.render();
  }
});

Router.route('/events/new/:eventsLimit?', {
  controller: 'NewEventsListController',
  action: function () {
    this.render();
  }
});

Router.route('events/best/:eventsLimit?', {
  controller: 'BestEventsListController',
  action: function () {
    this.render();
  }
});

//Router.route('/events/filter/', {
//  template: 'filterEvents',
//  controller: 'FilterEventsListController',
//  action: function () {
//    this.render();
//  }
//});


Router.route('/event/:_id', {
  name: 'eventPage',
  onBeforeAction: function () {
    $('#main').css('position', 'relative').css('left', '100%');
    this.next();
  },
  onAfterAction: function () {
    $('#main').velocity({ left: 0 }, 250, "swing");
  },
  waitOn: function() {
    return [
      Meteor.subscribe('singleEvent', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Events.findOne(this.params._id); }
});

Router.route('/event/:_id/edit', {
  name: 'eventEdit',
  waitOn: function() {
    return Meteor.subscribe('singleEvent', this.params._id);
  },
  data: function() { return Events.findOne(this.params._id); }
});

Router.route('/submit/event', {
  name: 'eventSubmit',
  progress: {enabled: false}
});

Router.route('/profile/:_id/edit', {
  name: 'editProfile',
  onBeforeAction: function () {
    //AccountsEntry.signInRequired(this);
    this.next();
  },
  waitOn: function() {
    return [
      Meteor.subscribe('users', this.params._id),
    ];
  },
  data: function() { return Meteor.users.findOne(this.params._id);}
});

Router.route('/profile/:_id', {
  name: 'userProfile',
  onBeforeAction: function () {
    //AccountsEntry.signInRequired(this);
    this.next();
  },
  waitOn: function() {
    return [
      Meteor.subscribe('users', this.params._id),
    ];
  },
  data: function() { return Meteor.user()}
});

Router.route('/guys', {
  name: 'guysList',
  template: 'guysList',
  onBeforeAction: function () {
    // Require authentication to view guys
    //AccountsEntry.signInRequired(this);
    this.next();
  }
});

Router.route('/chats', {
  name: 'chatsList',
  template: 'chatsList',
  onBeforeAction: function () {
    // Require authentication to view guys
    //AccountsEntry.signInRequired(this);
    this.next();
  }
});

Router.route('/chat/', {
  name: 'chatPage',
  template: 'chatPage',
  onBeforeAction: function () {
    // Require authentication to view guys
    //AccountsEntry.signInRequired(this);
    this.next();
  }
});

Router.route('/subscribe', {
    name: 'newsletterSubscribe'
    //onBeforeAction: function () {
    //    // Require authentication to view guys
    //    AccountsEntry.signInRequired(this);
    //}
});
Router.route('/signin', {
  name: 'signin'
});


var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
};

//Router.onBeforeAction(function() {
//  if (! Meteor.userId()) {
//    this.render('login');
//  } else {
//    this.next();
//  }
//});

//Router.onBeforeAction('loading');
//Router.onBeforeAction(requireLogin, {only: 'eventSubmit'});
//Router.onBeforeAction(function() { clearErrors() });
