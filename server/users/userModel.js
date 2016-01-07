var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  github: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  location: {
    type: String,
    required: true
  },

  blog: {
    type: String
  },

  website: {
    type: String
  },

  projects: {
    type: [{type: String}]
  }

});



module.exports = mongoose.model('users', UserSchema);
