const express      = require('express')
const bodyParser   = require('body-parser');
const morgan       = require('morgan');
const mongoose     = require('mongoose')
const path         = require('path');
const session      = require('express-session');
//const MongoStore   = require('connect-mongo')(session);
const bcrypt       = require('bcrypt');
const app          = express();
const db           = require('./models');
const User         = require('./models/users');
const Place        = require('./models/places');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'SuperSecretCookie',
	cookie: { maxAge: 30 * 60 * 1000 },
	//store: new MongoStore({ url: 'mongodb://JP:mom@ds157599.mlab.com:57599/project2' })
}));

//------------------------------------------------------------------------------

//SHOW SIGN-UP PAGE
app.get('/', function (req, res) {
	res.render('signup');
});

//create new secure user in database
app.post('/users', function (req, res) {
    User.createSecure(req.body.email, req.body.password, function (err, newUser) {
    	res.json(newUser);
    	console.log(newUser);
  	});
});


//SHOW LOGIN PAGE
app.get('/login', function (req, res) {
	res.render('login');
});

//login user to session
app.post('/sessions', function (req, res) {
	User.authenticate(req.body.email, req.body.password, function (err, existingUser) {
		if (err) console.log("error is " + err);
		req.session.userId = existingUser.id;
		res.json(existingUser);
	});
});


//SHOW PROFILE PAGE for user in session
// app.get('/profile', function (req, res) {
// 	User.findOne({_id: req.session.userId}, function (err, currentUser) {
// 		res.render('profile.ejs', {user: currentUser});
// 	});
// });

//gets user data to send to view
app.get('/profile/user', function (req,res) {
  User.findOne({_id: req.session.userId}, function (err, user) {
    if(err) {
      console.log("user error " + err);
      res.sendStatus(500);
    }
    console.log(user);
    res.json(user);
  });
});


//SHOW EDIT PROFILE PAGE
app.get('/editProfile', function (req,res) {
	User.findOne({_id: req.session.userId}, function (err, currentUser) {
		res.render('editProfile', {user: currentUser});
	});
});

app.delete('/user/delete/:id', function (req, res) {
	User.findOneAndRemove({_id: req.params.id}, function (err, userDelete) {
		if (err) {
			console.log("error deleting user");
		} else {
			res.redirect('/');
		}
	});
});

//post new Future Place to user's places
app.put('/profile', function (req,res) {
let newPlace = {city: req.body.city, country: req.body.country};

	User.findOneAndUpdate(
		{_id: req.session.userId},
		{ $push: {'place.placeDoc': newPlace}},
		{new:true},
		function (err, doc) {
			if (err) {
				console.log("can't add new place to user");
			} else {
				res.json(doc);
			}
		}
	);
});

app.put('/userRemovePlace', function (req, res) {

	User.findOneAndUpdate(
		{_id: req.session.userId},
		{ $pull: {'place.placeDoc': {_id: req.body.removedPlace}}},
		{ new: true},
		function (err, updatedPlacesArray) {
			if (err) {
				console.log("can't remove place from user!");
			} else {
				res.json(updatedPlacesArray);
			}
		}
	);
});


app.get('/tripMap/:id', function (req, res) {

	res.render('tripMap', {city: req.params.id});
});



//logout of session
app.get('/logout', function (req, res) {
	req.session.userId = null;
	res.redirect('/login');
});




app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`);
  });
