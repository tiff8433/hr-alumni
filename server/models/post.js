var db = require('../config/config.js');
    Category = require('./index').Category,
    User = require('./index').User;

var Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  category: function() {
    return this.belongsTo(Category, 'category_id');
  },
  user: function() {
    return this.belongsTo(User, 'user_id');
  }
});

module.exports = Post;
