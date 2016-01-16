var path = require('path');

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'bulletinBoard',
    charset: 'utf8',
    filename: path.join(__dirname, '/../../sqlite/hr-alumni.sqlite')
  }
});

var bookshelf = require('bookshelf')(knex);

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 20);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('posts').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('posts', function (post) {
      post.increments('id').primary();
      post.string('title', 255);
      post.string('content', 255);
      post.integer('replies');
      post.integer('hearts');
      post.integer('category_id');
      post.integer('user_id');
      post.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('replies').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('replies', function (reply) {
      reply.increments('id').primary();
      reply.string('content', 255);
      reply.integer('post_id');
      reply.integer('user_id');
      reply.integer('thumbs');
      reply.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('categories').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('categories', function (category) {
      category.increments('id').primary();
      category.string('category', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = bookshelf;
