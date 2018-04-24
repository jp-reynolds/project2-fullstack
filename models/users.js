const express      = require('express')
const bcrypt       = require('bcrypt');
const mongoose     = require('mongoose'),
      Schema       = mongoose.Schema;

const UserSchema = new Schema ({
    email: {
      type: String,
      default: ""
    },
    passwordDigest: {
      type: String,
      default: ""
    }
});

// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (email, password, callback) {
  var UserModel = this;

  bcrypt.genSalt(function (err, salt) {
    console.log('salt: ', salt); 
    bcrypt.hash(password, salt, function (err, hash) {
      UserModel.create({
          email: email,
          passwordDigest: hash
      }, callback);
    });
  });
};


// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordDigest);
};


// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
  this.findOne({email: email}, function (err, foundUser) {
    console.log('founduser ' + foundUser);
    if (!foundUser) {
      console.log('No user with email ' + email);
      callback("Error: no user found", null);  
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};


var User = mongoose.model('User', UserSchema);
module.exports = User;
