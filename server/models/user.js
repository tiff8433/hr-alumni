var db = require('../config.js'),
    Post = require('./post.js'),
    Reply = require('./reply.js');


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
