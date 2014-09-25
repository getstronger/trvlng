//# _id
//# username
//# slug
//# pi - profile image
//# activeChannel
//# activeChannelWhen
//# chatColor
//# createdAt
//# deviceUUIDs []
//# mobilePushId
//# lastLocation
//# # type
//# # coordinates
//# # accuracy
//# lastLocationWhen
//# notificationCount
//# pushChannels [] - the channelIds this user receives push notifications for
//    # localSystemChannels [] - currently joined local system channel ids
//# localChannels [] - the currently joined local channel ids
//# globalChannels [] - the current joined global channel ids
//# openPrivateChannels [] ** TODO: change this to privateChannels to match convention
//# services {}


Meteor.users.attachSchema(Schemas.User);

// Meteor.users.allow({
//   update: function(userId, doc){
//     return isAdminById(userId) || userId == doc._id;
//   },
//   remove: function(userId, doc){
//     return isAdminById(userId) || userId == doc._id;
//   }
// });

//{
//    Ryan: 1380422897
//    Mike: 1066517454
//    Anthony: 9391131
//    jon:
//chris: 507746643
//brad fb:  http://res.cloudinary.com/trvlng/image/facebook/8214216.jpg
//}