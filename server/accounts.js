Accounts.onCreateUser(function(options, user) {
  user.intercomHash = IntercomHash(user, '9t5EGblqIOZSTuB9LPwwdkCN6VpC1PcJdrqgjAGJ');

  if (options.profile)
    user.profile = options.profile;

  return user;
});

//Meteor.startup(function(){
//    if (Meteor.isServer){
//      Accounts.setPassword('kebQTzYPWaEBN8P9u', 'adminpass22');
//      console.log('The new password for' + ' ' + 'user id:' + ' ' + 'kebQTzYPWaEBN8P9u' + ' ' + 'has been set');
//    }
//  }
//);