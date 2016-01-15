var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'bulletinBoard',
    charset: 'utf8',
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('posts').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('posts', function (post) {
      post.increments('id').primary();
      post.string('title', 255);
      post.string('content', 255);
      post.integer('likes');
      post.integer('category_id');
      post.integer('user_id');
      post.timeStamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('replies').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('replies', function (reply) {
      reply.increments('id').primary();
      reply.string('content', 255);
      reply.integer('post_id');
      reply.integer('user_id');
      reply.timeStamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('categories').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('categories', function (category) {
      category.increments('id').primary();
      category.string('category', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
