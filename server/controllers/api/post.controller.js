var Post = require('../../models').Post,
    User = require('../../models').User,
    Category = require('../../models').Category,
    Heart = require('../../models').Heart;

function getAllPosts(req, res) {
  //console.log(req);
  var username = req.user.username;
  var user_name = req.user.displayName;
  var profileUrl = req.user['_json'].avatar_url;

  User.where({username: username})
    .fetch().then(function(found) {
      if (found) {
        // attach user's id to the req.user object so it can be used later
        req.user.user_id = found.get('id');
      } else {
        // create new user and add to database
        User.forge({username: username, full_name: user_name, profileUrl: profileUrl})
          .save()
          .then(function(user) {
            req.user.user_id = user.get('id');
          });
      }
    }).then(function() {
        Post.fetchAll({
          withRelated: ['user', 'category']
        })
          .then(function(found) {
            if (found) {
              // redefine each post to include related user's name
              var response = found.map(function(post) {
                return {
                  id: post.get('id'),
                  title: post.get('title'),
                  replyCount: post.get('replies'),
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
}

function createPost(req, res) {
  var title = req.body.title,
      content = req.body.content,
      categoryName = req.body.category,
      user_name = req.user.displayName,
      userId = req.user.user_id; // we have access to the user's id here because of how we attached it
                                 // to the req.user object on line 14/20

      // look for category where post belongs to
      Category.where({category: categoryName})
        .fetch().then(function(category) {
          if (category) {
            post = new Post({
              title: title,
              content: content,
              hearts: 0,
              replies: 0,
              category_id: category.get('id'),
              user_id: userId
            }).save().then(function(post) {
              res.json(post);
            });
          } else {
            // if category is nonexistent, create it
            Category.forge({ category: categoryName })
              .save().then(function(category){
                post = new Post({
                  title: title,
                  content: content,
                  hearts: 0,
                  replies: 0,
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
}

function getPost(req, res) {
  var postId = req.params.id;
  Post.where({id: postId}).fetch()
    .then(function(found) {
      if (found) {
        res.json({content: found.get('content')});
      }
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(400);
    });
}

function upVote(req, res) {
  var postId = req.params.id;
  var userId = req.user.user_id;

  Post.where({id: postId}).fetch({
    withRelated: ['heart', 'user']
  })
    .then(function(post) {
      if (post) {
        var heartsArray = post.related('heart').models;
        var catId = post.get('category_id');

        // this prevents a user from hearting a post more than once
        for (var i=0; i<heartsArray.length; i++) {
          if (heartsArray[i].get('user_id') === userId) {
            res.sendStatus(304);
            return;
          }
        }

        new Heart({
          post_id: postId,
          user_id: userId,
          cat_id: catId
        }).save();

        var count = post.get('hearts');
        post.set('hearts', count+1);
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

module.exports = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getPost: getPost,
  upVote: upVote
};
