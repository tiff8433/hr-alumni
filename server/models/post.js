var db = require('../config.js'),
    Category = require('./category.js'),
    User = require('./user.js');

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
