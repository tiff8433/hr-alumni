var Post = require('../../models').Post,
    User = require('../../models').User,
    Category = require('../../models').Category;

module.exports = {
  getAllPosts: function(req, res) {
    var username = req.user.username;
    var user_name = req.user.displayName;
    // save userid to req object
    User.forge({username: username})
      .fetch().then(function(found) {
        if (found) {
          req.user.user_id = found.get('id');
        } else {
          User.forge({username: username, full_name: user_name})
            .save()
            .then(function(user) {
              req.user.user_id = user.get('id');
            });
        }
      }).then(function() {
          Post.forge().fetchAll({
            withRelated: ['user', 'category']
          })
            .then(function(found) {
              if (found) {
                var response = found.map(function(post) {
                  return {
                    id: post.get('id'),
                    title: post.get('title'),
                    replies: post.get('replies'),
                    hearts: post.get('hearts'),
                    category: post.related('category').get('category'),
                    userId: post.get('user_id'),
                    user: post.related('user').get('full_name'),
                    posted: post.get('created_at')
                  };
                });
                res.json(response);
              }
            })
            .catch(function(err) {
              console.error(err);
              res.sendStatus(400);
            });
          })
        .catch(function(err) {
          console.error(err);
          res.sendStatus(401);
        });
  },
  createPost: function(req, res) {
    var title = req.body.title,
        content = req.body.content,
        categoryName = req.body.category,
        user_name = req.user.displayName,
        userId = req.user.user_id;

        // search for category id
        Category.forge({category: categoryName})
          .fetch().then(function(category) {
            if (category) {
              post = new Post({
                title: title,
                content: content,
                hearts: 0,
                category_id: category.get('id'),
                user_id: userId
              }).save().then(function(post) {
                res.json(post);
              });
            } else {
              new Category({ category: categoryName })
                .save().then(function(category){
                  post = new Post({
                    title: title,
                    content: content,
                    hearts: 0,
                    category_id: category.get('id'),
                    user_id: userId
                  }).save().then(function(newPost) {
                    res.json(newPost);
                  });
                });
            }
          })
          .catch(function(err) {
            console.error(err);
            res.sendStatus(400);
          });
  },
  getPost: function(req, res) {
    var postId = req.params.id;
    Post.forge({id: postId}).fetch()
      .then(function(found) {
        if (found) {
          res.json({content: found.get('content')});
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(400);
      });
  },
  upVote: function(req, res) {
    var postId = req.params.id;

    Post.forge({id: postId}).fetch()
      .then(function(post) {
        if (post) {
          var count = post.get('hearts');
          post.set('hearts', count+1);
          console.log(post.get('hearts'));
          post.save();
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(400);
      });
  }
};
