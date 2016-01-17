var db = require('../config/config.js'),
    Post = require('./index').Post,
    Reply = require('./index').Reply;


var User = db.Model.extend({
  tableName: 'users',
  post: function() {
    return this.hasMany(Post);
  },
  reply: function() {
    return this.hasMany(Reply);
  }
});

module.exports = User;
