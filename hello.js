PlayersList = new
  Mongo.Collection(
  'players'
);
/*
PlayersList.remove({});
var names = ['karoly', 'nicola', 'fede', 'umbe', 'daniel', 'lorenzo'];
names.forEach(function(name){
  PlayersList.insert({
    name: name,
    score: 0
  });
});
*/
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);


  Template.leaderboard.helpers({
    counter: function () {
      return Session.get('counter');
    },

    player: function () {
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },

    selectedClass: function () {
      var pid = this._id;
      var selPid = Session.get('selectedPlayer');
      return pid==selPid ? "selected" : '';
    },

    showSelectedPlayer: function () {
      var selPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selPlayer);
    }
  });

  Template.leaderboard.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
      console.log(PlayersList.find().fetch());
    },

    'click .player': function () {
      var playerId = this._id;
      Session.set('selectedPlayer',playerId);
    },

    'click .increment': function () {
      var selPlayer = Session.get('selectedPlayer');
      PlayersList.update(selPlayer, { $inc: {score: 5 } } );
    },

    'click .decrement': function () {
      var selPlayer = Session.get('selectedPlayer');
      PlayersList.update(selPlayer, { $inc: {score: -5 } } );
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}