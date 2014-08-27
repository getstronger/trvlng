Schemas = {};

Schemas.Location = new SimpleSchema({
  streetAddress: {
    type: String,
    label: "Street address",
    max: 100,
    autoform: {
        placeholder: "9 Columnbus Avenue"
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
    autoform: {
        placeholder: "12345"
    }
  }
});

Schemas.Event = new SimpleSchema({
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
    type: {
        type: String,
        label: "Wheat type of event is this?",
        allowedValues: ["Party", "Festival", "Political", "Educational", "Other"],
        minCount: 1,
        maxCount: 1,
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
        allowedValues: ['leather', 'cosplay', 'bear', 'daddy', 'circuit boy', 'twink', 'gym rat', 'geek', 'fetish', 'general gay'],
        minCount: 1,
        autoform: {
            options: "allowed",
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
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        regEx: /^[0-9]{5}$/,
        autoform: {
            placeholder: "#HashTagFollowMe"
        }
    },
    attending: {
        type: [String]
    },
    attendees: {
        type: Number
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