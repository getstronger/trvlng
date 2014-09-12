//{
//    "kadira": {
//        "appId": "suBBiwc8tyKn7W87P",
//        "appSecret" : "8a5c7031-c19f-45c7-9196-b09efac033ad"
//    }
//}

Meteor.startup(function() {
    Kadira.connect('suBBiwc8tyKn7W87P', '8a5c7031-c19f-45c7-9196-b09efac033ad');
});