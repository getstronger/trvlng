// add details to each scene at server startup

//if (Meteor.isServer) {
//  Meteor.startup(function () {
//    var currentScenes = Scenes.find({name: {$exists: false}});
//    var defaultScenes = ['leather', 'cosplay', 'bear', 'daddy', 'circuit boy', 'twink', 'gym rat', 'geek', 'fetish', 'general gay'];
//    var count = 0;
//    currentScenes.forEach(function (scene) {
//      Scenes.update(scene._id, {
//        $set: {
//          name: defaultScenes[count],
//          image: "http://placehold.it/300x300",
//          description: "This scene is named" + " " + defaultScenes[count]
//        }
//      }, function(error, result){
//            console.log(error + " " + result);
//          }
//      );
//      count += 1;
//    })
//  })
//}