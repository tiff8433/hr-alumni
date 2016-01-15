var Post = require('../../models').Post;

module.exports = {
  getAllPosts: function(req, res) {
    new Post.fetchAll({require: true}).then(function(found) {
      if (found) {
        res.json(found);
      }
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(400);
    });
  },
  createPost: function(req, res) {
    var title = req.body.title,
        content = req.body.content,
        categoryId = req.body.categoryId,
        userId = req.body.userId;

    new Post.fetch({title: name}).fetch()
      .then(function(found) {
        if (found) {
          res.json({
            success: 'false',
            reason: 'name of post already exists'
          });
        }

        var post = new Post({
          title: name,
          content: content,
          hearts: 0,
          category_id: categoryId,
          user_id: userId
        });

        post.save().then(function(newPost) {
          res.json(newPost);
        });
      });
  },
  getPost: function(req, res) {
    var postId = req.params[0];
    new Post({id: postId, require: true}).fetch()
      .then(function(found) {
        if (found) {
          res.json(found);
        }
      })
      .catch(function(err) {
        console.error(err);
        res.send(400);
      });
  }
};
