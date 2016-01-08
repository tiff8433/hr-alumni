var mongoose = require('mongoose');
require('mongoose-type-url');

var UserSchema = new mongoose.Schema({
  contact: {
    firstName: {type: String,required: true, unique: true},
    lastName:  {type: String,required: true, unique: true},
    githubName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    location: {type: String, required: true}
  },

  about: {
    summary: {type: String},
    status: {type: String}
  },

  experience: {
    companies: [{type: String}],
    languages: [{type: String}]
  },

  links: {
    blog: {type: mongoose.SchemaTypes.Url},
    website: {type: mongoose.SchemaTypes.Url},
    linkedin: {type: mongoose.SchemaTypes.Url},
    github: {type: mongoose.SchemaTypes.Url}
  },

  projects: {
    urls: [{type: mongoose.SchemaTypes.Url}]
  }

});



module.exports = mongoose.model('users', UserSchema);

//https://www.npmjs.com/package/mongoose-type-url
