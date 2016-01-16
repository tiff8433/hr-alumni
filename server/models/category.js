var db = require('../config/config.js'),
    Post = require('./post.js');

var Category = db.Model.extend({
  tableName: 'categories',
  post: function() {
    return this.hasMany(Post);
  }
});

module.exports = Category;
