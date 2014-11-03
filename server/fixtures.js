if (Meteor.isServer) {
    Meteor.startup(function () {


// Fixture Data Users
        if (Meteor.users.find().count() === 0) {

            // Date.prototype.yyyymmdd = function() {
            //  var yyyy = this.getFullYear().toString();
            //  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
            //  var dd  = this.getDate().toString();
            //  return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
            // };

            // d = new Date();
            // d.yyyymmdd();

            // var today = new Date();
            // var yr = today.getFullYear();
            // var now = new Date().getDate();


            // create users for Da Boyz

            // Brad
            var bradId = Meteor.users.insert({
                username: "bradstrong",
                createdAt: new Date(),
                emails: [{
                    address: "bradcstrong@gmail.com",
                    verified: true
                }],
                profile: {
                  name: 'Brad Strong',
                  nameGiven: 'Brad',
                  nameSurname: 'Strong'
                }
            });
            var brad = Meteor.users.findOne(bradId);
            Accounts.setPassword(brad._id, 'Trvlng11');

            // Anthony
            var anthonyId = Meteor.users.insert({
                username: "anthonyreisinger",
                createdAt: new Date(),
                profile: {name: 'Anthony Reisinger'}
            });
            var anthony = Meteor.users.findOne(anthonyId);

            // Ryan
            var ryanId = Meteor.users.insert({
                username: "ryanluff",
                createdAt: new Date(),
                profile: {name: 'Ryan Luff'}
            });
            var ryan = Meteor.users.findOne(ryanId);

            // Mike
            var mikeId = Meteor.users.insert({
                username: "michaelsmith",
                createdAt: new Date(),
                profile: {name: 'Michael Smith'}
            });
            var mike = Meteor.users.findOne(mikeId);

            // Jon
            var jonId = Meteor.users.insert({
                username: "jonathanallen",
                createdAt: new Date(),
                profile: {name: 'Jonathan Allen'}
            });
            var jon = Meteor.users.findOne(jonId);

            // Chris
            var chrisId = Meteor.users.insert({
                username: "chrisweyant",
                createdAt: new Date(),
                profile: {name: 'Chris Weyant'}
            });
            var chris = Meteor.users.findOne(chrisId);
        }
      // Fixture Data for Scenes

      if (Scenes.find().count() === 0) {
        var defaultScenes = ['leather', 'cosplay', 'bear', 'daddy', 'circuit boy', 'twink', 'gym rat', 'geek', 'fetish', 'general gay'];
        for (var i = 0; i < defaultScenes.length; i++) {
          Scenes.insert({
            name: defaultScenes[i],
            // url: 'http://google.com/?q=test-' + i,
            image: "http://placehold.it/300x300",
            description: "This scene is named" + " " + defaultScenes[i]
          });
        }
      }

// Fixture Data for Badges

      if (Badges.find().count() === 0) {
        var defaultBadges = ['Drag Hag', 'Pup in Training', 'Circuit Queen', 'Muscle Mary', 'Daddy Bear', 'Sir', 'Kweeeen', 'Gaymer', 'Sadomaster'];
        for (var i = 0; i < defaultBadges.length; i++) {
          Badges.insert({
            name: defaultBadges[i],
            // url: 'http://google.com/?q=test-' + i,
            image: "http://placehold.it/300x300",
            description: "This scene is named" + " " + defaultBadges[i]
          });
        }
      }

      // Fixture Data Events
      // Users must be present
      if (Events.find().count() === 0) {
          var sceneIds = Scenes.find({}).fetch();
          var createdByIds = Meteor.users.find({}).fetch();

          var trvlngID = Events.insert({
              createdBy: createdByIds[0]._id,
              name: 'Introducing Telescope',
              description: "This is the description. It is awesome.",
              type: "Festival",
              // customType: "",
              scene: [sceneIds[0]._id],
              free: true,
              // cost: 0,
              organizer: "me",
              status: "scheduled",
              website: 'http://sachagreif.com/introducing-telescope/',
              startDate: new Date(),
              endDate: new Date(),
              recurrance: "one time",
              location: {
                  streetAddress: "9 Columbus Square",
                  neighborhood: "gayborhood",
                  addressLocality: "Philadelphia",
                  addressRegion: "PA",
                  postalCode: "19012"
              },
              social: {
                  facebook: "http://facebook.com/You",
                  twitter: "http://twitter.com/You",
                  googleplus: "http://plus.google.com/You",
                  instagram: "http://instagram.com/you"
                  // hashtag: "you"
              },
              attending: [[createdByIds[0]._id]],
              attendees: 1

          });

          // Comments.insert({
          //   eventId: telescopeId,
          //   userId: anthony._id,
          //   author: anthony.profile.name,
          //   submitted: now - 5 * 3600 * 1000,
          //   body: 'Interesting project Sacha, can I get involved?'
          // });

          // Comments.insert({
          //   eventId: telescopeId,
          //   userId: jon._id,
          //   author: jon.profile.name,
          //   submitted: now - 3 * 3600 * 1000,
          //   body: 'You sure can Tom!'
          // });

          // for (var i = 0; i < 10; i++) {
          //   Events.insert({
          //     name: 'Sample Event #' + i,
          //     // createdBy: brad.profile.name,
          //     createdBy: brad._id,
          //     url: 'http://google.com/?q=test-' + i,
          //     submitted: now - i * 3600 * 1000 + 1,
          //     commentsCount: 0,
          //     upvoters: [],
          //     votes: 0
          //   });
          // }
      }

      // Fixture Data Chats
      if (Chats.find().count() === 0) {
        Chats.insert({});
      }



// users: {
//   type: [Object]
// },
// "users.$.id": {
//   // you can use your own type, e.g. SimpleSchema.RegEx.Id, as I am using custom Schema for accounts
//   type: Schemas.Account._id,
//   label: 'Select user',
//   autoform: {
//     options: function() {
//       var options = [];
//       Meteor.users.find().forEach(function(element) {
//         options.push({
//           label: element.username,
//           value: element._id
//         })
//       });
//       return options;
//     }
//   }
// }





    });
}