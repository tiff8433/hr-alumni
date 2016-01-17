var db = require('../config/config.js');

var Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  category: function() {
    return this.belongsTo(Category, 'category_id');
  },
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  heart: function() {
    return this.hasMany(Heart);
  }
});

var Category = db.Model.extend({
  tableName: 'categories',
  post: function() {
    return this.hasMany(Post);
  },
  heart: function() {
    return this.hasMany(Heart);
  }
});

var User = db.Model.extend({
  tableName: 'users',
  post: function() {
    return this.hasMany(Post);
  },
  reply: function() {
    return this.hasMany(Reply);
  },
  heart: function() {
    return this.hasMany(Heart);
  }
});

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

var Heart = db.Model.extend({
  tableName: 'hearts',
  post: function() {
    return this.belongsTo(Post, 'post_id');
  },
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  category: function() {
    return this.belongsTo(Category, 'cat_id');
  }
})

module.exports = {
  Category: Category,
  Post: Post,
  Reply: Reply,
  User: User,
  Heart: Heart
};
