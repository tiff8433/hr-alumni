var mongoose = require('mongoose');
require('mongoose-type-url');

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

  experience: {
    companies: [{type: String}],
    languages: [{type: String}]
  },

  links: {
    blog: {type: mongoose.SchemaTypes.Url},
    website: {type: mongoose.SchemaTypes.Url}
  },

  projects: {
    urls: [{type: mongoose.SchemaTypes.Url}]
  }

});



module.exports = mongoose.model('users', UserSchema);

//https://www.npmjs.com/package/mongoose-type-url