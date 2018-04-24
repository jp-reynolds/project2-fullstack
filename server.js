const express      = require('express')
const bodyParser   = require('body-parser');
const morgan       = require('morgan');
const mongoose     = require('mongoose')
const path         = require('path');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const bcrypt       = require('bcrypt');
const app          = express();
var   User         = require('./models/users');

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect("mongodb://localhost/project2");
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'SuperSecretCookie',
	cookie: { maxAge: 30 * 60 * 1000 },
	store: new MongoStore({ url: 'mongodb://JP:mom@ds157599.mlab.com:57599/project2' })
}));

//show sign up page
app.get('/signup', function (req, res) {
	res.render('signup');
});

//create new secure user in database
app.post('/users', function (req, res) {
    User.createSecure(req.body.email, req.body.password, function (err, newUser) {
    	res.json(newUser);
    	console.log(newUser);
  	});
});

//login page
app.get('/login', function (req, res) {
	res.render('login');
});

//login user to session
app.post('/sessions', function (req, res) {
	User.authenticate(req.body.email, req.body.password, function (err, existingUser) {
		if (err) console.log("error is " + err)
		req.session.userId = existingUser.id
		res.json(existingUser);
	});
});


//show profile page in user session
app.get('/profile', function (req, res) {
	User.findOne({_id: req.session.userId}, function (err, currentUser) {
		res.render('profile.ejs', {user: currentUser})
	});
});


//logout of session
app.get('/logout', function (req, res) {
	req.session.userId = null;
	res.redirect('/login');
});




app.listen(3000, () => console.log('The Federal Government is listening on port 3000'));

