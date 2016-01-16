var User = require('../../models').User,
    Post = require('../../models').Post,
    Reply = require('../../models').Reply;

module.exports = {

  getReplies: function(req, res) {
    var postId = req.params.id;

    Reply.forge({ post: postId })
      .fetchAll()
      .then(function(replies) {
        res.json(replies);
      });
  },

  postReply: function(req, res) {
    var postId = req.params.id;
    var userId = req.user.user_id;

    Post.forge({ id: postId })
      .fetch()
      .then(function(post) {
        console.log(post);
        var count = post.get('replies');
        post.set('replies', count+1);
        post.save();
      });

    Reply.forge({
      content: req.body.content,
      post_id: postId,
      user_id: userId,
      thumbs: 0
    })
    .save()
    .then(function(reply) {
      console.log(reply, 'postReply model');
      res.sendStatus(201);
    });
  },

  thumbUpReply: function(req, res) {
    var replyId = req.params.id;

    Reply.forge({
      id: replyId
    }).fetch().then(function(reply) {
      reply.save({
        thumbs: reply.get('thumbs') += 1
      }, { patch: true }).then(function(reply) {
        res.sendStatus(201);
      });
    });
  }
};
