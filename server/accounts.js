Accounts.onCreateUser(function(options, user) {
  user.intercomHash = IntercomHash(user, '9t5EGblqIOZSTuB9LPwwdkCN6VpC1PcJdrqgjAGJ');

  if (options.profile)
    user.profile = options.profile;

  return user;
});