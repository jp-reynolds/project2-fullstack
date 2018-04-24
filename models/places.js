const express      = require('express')
const bcrypt       = require('bcrypt');
const mongoose     = require('mongoose'),
      Schema       = mongoose.Schema;



const placeSchema = new Schema ({
    city: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    }
});




var Place = mongoose.model('Place', placeSchema);
module.exports = Place;
