var db = require("./models");
// var Place = require("./models/places");
// var User = require("./models/users");

var samplePlaces = [{
	city: 'Denver',
	country: 'USA'
 	},
 	{
	city: 'Rio',
	country: 'Brazil'
 	},
 	{
 	city: 'Rome',
	country: 'Italy'
 	}
];

var sampleUser = {
	email: 'rockchalk',
	passwordDigest: 'rockchalk',
	place: {
		placeDoc: samplePlaces
	}
};


db.Place.remove({}, function(err, places){

  db.Place.create(samplePlaces, function(err, places){
    if (err) { return console.log('ERROR', err); }
    console.log("all places: ", places);
    console.log("created", places.length, " places");
    process.exit();
  });

});

db.User.create(sampleUser, function(err, user){
	if (err) { return console.log('ERROR', err); }
		console.log("all users: ", user);
		console.log("created", user.length, " user");
		process.exit();
});