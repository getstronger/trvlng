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
  template: 'eventsList',
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

FilterEventsListController = EventsListController.extend({
  // sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.filterEvents.path({eventsLimit: this.limit() + this.increment});
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: NewEventsListController
  });
  
  this.route('newEvents', {
    path: '/events/new/:eventsLimit?',
    controller: NewEventsListController
  });
  
  this.route('bestEvents', {
    path: 'events/best/:eventsLimit?',
    controller: BestEventsListController
  });

  this.route('filterEvents', {
    path: '/events/filter/',
    controller: FilterEventsListController
  });


  this.route('eventPage', {
    path: '/event/:_id',
    onBeforeAction: function () {
      $('#main').css('position', 'relative').css('left', '100%');
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

  this.route('eventEdit', {
    path: '/event/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singleEvent', this.params._id);
    },
    data: function() { return Events.findOne(this.params._id); }
  });
  
  this.route('eventSubmit', {
    path: '/submit/event',
    template: 'eventSubmit',
    progress: {enabled: false}
  });

  this.route('profileEdit', {
    path: '/profile/:_id/edit',
    template: 'editProfile',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [
        Meteor.subscribe('users', this.params._id),
      ];
    },
    data: function() { return Meteor.users.findOne(this.params._id);}
  });

  this.route('userProfile', {
    path: '/profile/:_id',
    template: 'userProfile',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [
        Meteor.subscribe('users', this.params._id),
      ];
    },
    data: function() { return Meteor.user()}
  });

  this.route('guys', {
    path: '/guys',
    template: 'guysList',
    onBeforeAction: function () {
      // Require authentication to view guys
      AccountsEntry.signInRequired(this);
    }
  });
    this.route('subscribe', {
        path: '/subscribe',
        template: 'newsletterSubscribe'
        //onBeforeAction: function () {
        //    // Require authentication to view guys
        //    AccountsEntry.signInRequired(this);
        //}
    });
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

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'eventSubmit'});
Router.onBeforeAction(function() { clearErrors() });
