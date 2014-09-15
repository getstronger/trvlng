Handlebars.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Handlebars.registerHelper('activeRouteClass', function(/* route names */) {
  var args = Array.prototype.slice.call(arguments, 0);
  args.pop();
  
  var active = _.any(args, function(name) {
    return Router.current() && Router.current().route.name === name
  });
  
  return active && 'active';
});

UI.registerHelper("formatDate", function(datetime, format) {
  return moment(datetime).format(format);
});