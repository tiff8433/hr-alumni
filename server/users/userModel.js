var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  contact: {
    firstName: {type: String,required: true, unique: true},
    lastName:  {type: String,required: true, unique: true},
    githubName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    location: {type: String, required: true}
  },

  // about: {
  //   summary: {type: String},
  //   status: {type: String}
  // },

  // experience: {
  //   companies: [{type: String}],
  //   languages: [{type: String}]
  // },

  links: {
    blog: {type: String},
    // website: {type: String},
    linkedin: {type: String},
    // github: {type: String}
  }
  // ,

  // projects: {
  //   urls: [{type: String}]
  // }

});



module.exports = mongoose.model('users', UserSchema);

//https://www.npmjs.com/package/mongoose-type-url
