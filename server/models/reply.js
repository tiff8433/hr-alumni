var db = require('../config/config.js'),
    User = require('./index').User,
    Post = require('./index').Post;

var Reply = db.Model.extend({
  tableName: 'replies',
  hasTimestamps: true,
  post: function() {
    return this.belongsTo(Post, 'post_id');
  },
  user: function() {
    return this.belongsTo(User, 'user_id');
  }
});

module.exports = Reply;
