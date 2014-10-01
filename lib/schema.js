Schemas = {};

// User Profile

Schemas.UserProfile = new SimpleSchema({
      pi: { // profile image TODO: integrate fb images
        type: String,
        optional: true
      },
      sentenceChoice1: {
        type: String,
        label: "I am",
        optional: true,
        allowedValues: [
          'single',
          'a krimpet',
          'hangry',
          'totes masc'
        ],
        minCount: 1,
        maxCount: 1,
        autoform: {
          options: "allowed",
          noselect: true,
          capitalize: true
        }
      },
      sentenceChoice2: {
        type: String,
        label: "I am",
        optional: true,
        allowedValues: [
          'a llama',
          'a lover',
          'some furries',
          'my keys'
        ],
        minCount: 1,
        maxCount: 1,
        autoform: {
          options: "allowed",
          noselect: true,
          capitalize: true
        }
      },
      sentenceChoice3: {
        type: String,
        label: "I am",
        optional: true,
        allowedValues: [
          'dance',
          'poop back and forth',
          'marry',
          'devour'
        ],
      minCount: 1,
      maxCount: 1,
      autoform: {
        options: "allowed",
        noselect: true,
        capitalize: true
      }
    },
  sentenceChoice4: {
      type: String,
      label:"I am",
    optional: true,
      allowedValues:
          [
            'forever',
            'all night',
            'in stilettos',
            'all over me'
          ],
      minCount: 1,
      maxCount: 1,
      autoform: {
    options: "allowed",
        noselect: true,
        capitalize: true
      }
  },
  iAm: {
    type: [String],
    label: "I am",
    optional: true,
    allowedValues: function () {
      var sceneNames = [];
      var allScenes = Scenes.find().fetch();
      allScenes.forEach(function (e) {
        sceneNames.push(e._id)
      });
      return sceneNames;
    },
    minCount: 1,
    autoform: {
      options: function () {
        var sceneNames = [];
        var allScenes = Scenes.find().fetch();
        allScenes.forEach(function (e) {
          sceneNames.push({
            label: e.name,
            value: e._id
          })
        });
        return sceneNames;
      },
      radio: true,
      noselect: true,
      capitalize: true
    }
  },
  into: {
    type: [String],
    label: "I am into",
    optional: true,
    allowedValues: function () {
      var sceneNames = [];
      var allScenes = Scenes.find().fetch();
      allScenes.forEach(function (e) {
        sceneNames.push(e._id)
      });
      return sceneNames;
    },
    minCount: 1,
    autoform: {
      options: function () {
        var sceneNames = [];
        var allScenes = Scenes.find().fetch();
        allScenes.forEach(function (e) {
          sceneNames.push({
            label: e.name,
            value: e._id
          })
        });
        return sceneNames;
      },
      radio: true,
      noselect: true,
      capitalize: true
    }
  },
  openTo:{
    type: String,
    label: "I am open to",
    optional: true
  },
  heightFeet:{
    type: Number,
    label: "feet",
    optional: true
  },
  heightInches:{
    type: Number,
    label: "inches",
    optional: true
  },
  height:{
    type: Number,
    label: "height",
    optional: true
  },
  weight:{
    type: Number,
    label: "Weight",
    optional: true
  },
  eyeColor: {
    type: String,
    label: "Eye color",
    optional: true
  },
  hairColor: {
    type: String,
    label: "Hair color",
    optional: true
  },
  bodyType: {
    type: String,
    label: "Body type",
    optional: true
  },
  bodyHair: {
    type: String,
    label: "Body hair",
    optional: true
  },
  about: {
    type: String,
    label: "About",
    optional: true
  },
  profession: {
    type: String,
    label: "What I do",
    optional: true
  },
  residence: {
    type: String,
    label: "Where I live",
    optional: true
  },
  birthday: {
    type: Date,
    label: "Birthday",
    optional: true
  },
  relationshipStatus: {
    type: String,
    label: "Relationship status",
    optional: true
  },
  relationshipPartner: {
    type: [String],
    label: "Partner",
    optional: true
  }

});

// Users

Schemas.User = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  slug: { // TODO: figure out slugify options
    type: String,
    optional: true
  },
  activeChannel: {
    type: String,
    optional: true
  },
  activeChannelWhen: {
    type: String,
    optional: true
  },
  chatColor: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  deviceUUIDs: {
    type: [String],
    optional: true
  },
  mobilePushId: {
    type: String,
    optional: true
  },
  lastLocation: {
    type: Object
  },
  'lastLocation.locationType': {
    type: String,
    optional: true
  },
  'lastLocation.coordinates': {
    type: String,
    optional: true
  },
  'lastLocation.accuracy': {
    type: String,
    optional: true
  },
  lastLocationWhen: {
    type: String,
    optional: true
  },
  notificationCount: {
    type: String,
    optional: true
  },
  emails: {
    type: [Object]
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  profile: { // public and modifiable
    type: Schemas.UserProfile
  },
  data: { // public but not modifiable
    type: Object,
    optional: true,
    blackbox: true
  },
  votes: { // used for votes only
    type: Object,
    optional: true,
    blackbox: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

// Badges

Schemas.Badge = new SimpleSchema({
  name: {
    type: String,
    label: "badge name",
    max: 100
  },
  image: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  description: {
    type: String,
    label: "badge description",
    max: 100
  }
});

// Scenes

Schemas.Scene = new SimpleSchema({
  name: {
    type: String,
    label: "scene name",
    max: 100
  },
  image: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  description: {
    type: String,
    label: "scene description",
    max: 100
  }
});

// Location

Schemas.Location = new SimpleSchema({

  venue: {
    type: String,
    label: "Venu Name",
    max: 100,
    optional: true,
    autoform: {
      placeholder: "Awesome party place"
    }
  },
  streetAddress: {
    type: String,
    label: "Street address",
    max: 100,
    optional: true,
    autoform: {
      placeholder: "9 Columbus Avenue"
    }
  },
  neighborhood: {
    type: String,
    label: "Neighborhood",
    max: 100,
    optional: true,
    autoform: {
      placeholder: "South End"
    }
  },
  addressLocality: {
    type: String,
    label: "City",
    max: 50,
    autoform: {
      placeholder: "Boston"
    }
  },
  addressRegion: {
    type: String,
    label: "state",
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/,
    autoform: {
      placeholder: "MA"
    }
  },
  postalCode: {
    type: String,
    label: "Zip code",
    regEx: /^[0-9]{5}$/,
    optional: true,
    autoform: {
      placeholder: "12345"
    }
  }
});

// Event

Schemas.Event = new SimpleSchema({
  createdBy: { // user who created the event
    type: String,
    label: "User who created the event",
    max: 250,
    denyUpdate: true,
    autoValue: function () {
        return this.userId;
    }
  },
  name: { // name of event
    type: String,
    label: "Name of the event",
    max: 50
  },
  description: {
    type: String,
    label: "description",
    max: 1000
  },
  type: { //TODO: create eventType sub schema
    type: String,
    label: "Wheat type of event is this?",
    allowedValues: ["Party", "Festival", "Political", "Educational", "Other"],
    minCount: 1,
    maxCount: 3,
    autoform: {
      options: "allowed"
    }
  },
  customType: {
    type: String,
    optional: true,
    // Required for "Other" type; otherwise should not be set
    custom: function () {
      var type = this.field('type');
      if (type.isSet) {
        if (type.value === "Other" && (!this.isSet || this.operator === "$unset")) {
          return "required";
        } else if (type.value !== "Other" && this.isSet && this.operator !== "$unset") {
          this.unset();
        }
      }
    }
  },
  scene: {
    type: [String],
    label: "Event scene",
    allowedValues: function () {
      var sceneNames = [];
      var allScenes = Scenes.find().fetch();
      allScenes.forEach(function (e) {
        sceneNames.push(e._id)
      });
      return sceneNames;
    },
    minCount: 1,
    autoform: {
      options: function () {
        var sceneNames = [];
        var allScenes = Scenes.find().fetch();
        allScenes.forEach(function (e) {
          sceneNames.push({
            label: e.name,
            value: e._id
          })
        });
        return sceneNames;
      },
      radio: true,
      noselect: true,
      capitalize: true
    }
  },
  free: {
    type: Boolean,
    label: "Is this event free to attend?",
    autoform: {
      radio: true,
      trueLabel: "Yes",
      falseLable: "No",
      value: true
    }
  },
  cost: {
    type: Number,
    label: "How much does this event cost to attend?",
    optional: true,
    custom: function () {
      var free = this.field('free');
      if (free.isSet) {
        if (free.value === false && (!this.isSet || this.operator === "$unset")) {
          return "required";
        } else if (free.value === true && this.isSet && this.operator !== "$unset") {
          this.unset();
        }
      }
    }
  },
  organizer: {
    type: String,
    label: "Who is organizing this event?"
  },
  status: {
    type: String,
    label: "What is the status of the event?",
    allowedValues: ['planning', 'scheduled', 'postponed', 'canceled'],
    minCount: 1,
    maxCount: 1,
    autoform: {
      options: "allowed",
      radio: true,
      noselect: true,
      capitalize: true
    }
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  startDate: {
    type: Date,
    label: "When does this event start?"
  },
  endDate: {
    type: Date,
    label: "When does this event end?"
  },
  recurrance: {
    type: String,
    label: "Is this a one time or recurring event?"
  },
  location: {
    type: Schemas.Location
  },
  social: {
    type: Object
  },
  "social.facebook": {
    type: String,
    label: "facebook",
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
    autoform: {
      placeholder: "facebook.com/You"
    }
  },
  "social.twitter": {
    type: String,
    label: "twitter",
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
    autoform: {
      placeholder: "twitter.com/You"
    }
  },
  "social.googleplus": {
    type: String,
    label: "googleplus",
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
    autoform: {
      placeholder: "plus.google.com/You"
    }
  },
  "social.instagram": {
    type: String,
    label: "instagram",
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
    autoform: {
      placeholder: "instagram.com/You"
    }
  },
  "social.hashtag": {
    type: String,
    label: "hashtags",
    optional: true,
    regEx: /#([^#]+)[\s,;]*/g,
    autoform: {
      placeholder: "#HashTagFollowMe"
    }
  },
  attending: {
    type: [String],
    autoValue: function () {
      var attendingValues = [];
      attendingValues[0] = this.userId;
      return attendingValues;
    }
  },
  attendees: {
    type: Number,
    autoValue: function () {
      return 1;
    }
  }

});


SimpleSchema.debug = true;

/*

 Event: {
 attendees: [],
 doorTime: "date",
 endDate: "date",
 eventStatus: "",
 location{
 streetAddress: "",
 addressCountry: "",
 addressLocality: "",
 addressRegion: "",
 postalCode: ""
 },
 superEvent: [],
 subEvent: [],
 scene: []
 }

 User: {
 name: "",,
 email: "",
 password: "",
 birthday: "",
 profile: {
 location: {

 },
 am: [],
 into: [],
 photo: "",
 relationship: [{
 partner: "@user",
 status: ""
 }],
 openTo: [],
 age: 1,
 height: 1,
 weight: 1,
 bodyHair: [],
 Ethnicity: []

 },
 galleries: [],
 preferences: {
 application: {
 privacy: {

 }
 }
 }
 }




 */