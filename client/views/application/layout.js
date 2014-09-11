Template.layout.helpers({
  soStatus: function () {
    Session.setDefault('soStatus', 'so--is-closed');
    return Session.get('soStatus');
  }
});

Template.layout.events({
    'click .so-menu-toggle': function(evt, tpl){ // open slide-out-left menu
      Session.set('soStatus', 'so-l--is-open');
    },
    'click .so-search-toggle': function(evt, tpl){ // open slide-out-right menu
      Session.set('soStatus', 'so-r--is-open');
    },
    'click .so-content-overlay': function(evt, tpl){
      Session.set('soStatus', 'so--is-closed');
    }
});

// Template.header.events({ 
//   'onDocumentKeyUp': function(evt, tpl) { // close the menu when the user hits esc
//     if(evt.keyCode === 27) {
//       close();
//     }
//   },
//   'onDocumentClick':  function(evt, tpl) { // when user clicks page cover, close menu
//       if(evt.target === cover) {
//         deactivate();
//       }
//     }

// });