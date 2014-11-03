Messages = new Meteor.Collection('messages');
Messages.attachSchema(Schemas.message);

//_id:
//createdAt:
//author: ''
//chat: ''
//sent:
//seenBy: []
//location:
//attachments: []