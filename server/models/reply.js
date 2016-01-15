var db = require('../config.js'),
    User = require('./user.js'),
    Post = require('./post.js');

var Reply = db.Model.extend({
  tableName: 'replies',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  post: function() {
    return this.belongsTo(Post, 'post_id');
  }
});

module.exports = Reply;
