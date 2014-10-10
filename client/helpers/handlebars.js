UI.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

UI.registerHelper('activeRouteClass', function(/* route names */) {
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

UI.registerHelper("domain", function(url) { // Display the domain of the event's external website
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
});

UI.registerHelper("googleMapsUrl", function(location){
  var gmQueryBaseUrl = "http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=";

  var queryBaseUrl = gmQueryBaseUrl;
  var originalString = location;
  var obj = location;
/* */
  var querifyString = function(obj) {
    var str = '';
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str += obj[p] + ' ';
      }
    }
    str = str.slice(0,-1); //trim final '+' from string
    return str;
  }

  var locationString = querifyString(originalString);
  var regex = /(\s+)/igm;
  var newString = locationString.replace(regex, '+');
  return queryBaseUrl+newString;

});

//http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=undefined9+Columbus+SquaregayborhoodPhiladelphiaPA

/*
 $('#test').html('poop');*/
//updateString(gmQueryBaseUrl, eventLocation);