Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.startup(function () {
    //AccountsEntry.config({
    //  logo: 'img/trvlng.svg',                  // if set displays logo above sign-in options
    //  privacyUrl: '/privacy-policy',     // if set adds link to privacy policy and 'you agree to ...' on sign-up page
    //  termsUrl: '/terms-of-use',         // if set adds link to terms  'you agree to ...' on sign-up page
    //  homeRoute: '/',                    // mandatory - path to redirect to after sign-out
    //  dashboardRoute: '/events/new',      // mandatory - path to redirect to after successful sign-in
    //  profileRoute: '/profile/' + Meteor.userId(),
    //  passwordSignupFields: 'USERNAME_AND_EMAIL',
    //  showSignupCode: false,
    //  showOtherLoginServices: true      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
    //});
  });

SharrreOptions={
  share: {
    googlePlus: true,
    // facebook: true,
    twitter: true
  },
  buttons: {
    googlePlus: {size: 'tall', annotation:'bubble'},
    // facebook: {layout: 'box_count'},
    twitter: {
      count: 'vertical',
      via: 'TRVLNG'
    }
  },
  enableHover: false,
  enableCounter: false,
  enableTracking: true
};