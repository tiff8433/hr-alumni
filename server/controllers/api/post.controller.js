var Post = require('../../models').Post,
    User = require('../../models').User,
    Category = require('../../models').Category;

module.exports = {
  getAllPosts: function(req, res) {
    var username = req.user.username;
    // save userid to req object
    User.forge({username: username, require: true})
      .fetch().then(function(found) {
        if (found) {
          req.user.user_id = found.get('id');
        }
      }).then(function() {
          Post.forge({require: true}).fetchAll()
            .then(function(found) {
              if (found) {
                res.json(found);
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
        categoryName = req.body.categoryName,
        userId = req.user.user_id;

    Post.forge({title: name}).fetch()
      .then(function(found) {
        if (found) {
          res.json({
            success: 'false',
            reason: 'name of post already exists'
          });
        }
        // search for category id
        Category.forge({category: categoryName, require: true})
          .fetch().then(function(found) {
            if (found) {
              var post = new Post({
                title: name,
                content: content,
                hearts: 0,
                category_id: found.get('id'),
                user_id: userId
              });

              post.save().then(function(newPost) {
                res.json(newPost);
              });
            }
          })
          .catch(function(err) {
            console.error(err);
            res.sendStatus(400);
          });
      });
  },
  getPost: function(req, res) {
    var postId = req.params[0];
    Post.forge({id: postId, require: true}).fetch()
      .then(function(found) {
        if (found) {
          res.json(found);
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(400);
      });
  },
  upVote: function(req, res) {
    var postId = req.params[0];
    Post.forge({id: postId, require: true}).fetch()
      .then(function(found) {
        if (found) {
          found.save({
            hearts: found.get('hearts')++
          }, {patch: true}).then(function(found) {
            res.sendStatus(200);
          });
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(400);
      });
  }
};
