var User = require('../../models/user'),
    Post = require('../../models/post'),
    Reply = require('../../models/Reply');

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
        post.save({
          replies: post.get('replies') += 1
        }, { patch: true });
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