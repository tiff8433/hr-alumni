var User = require('../../models/user'),
    Post = require('../../models/post'),
    Reply = require('../../models/Reply');

module.exports = {

  getReplies: function(req, res) {
    var postId = req.params.id;

    Reply.forge({ post: postId })
         .fetch()
         .then(function(replies) {
           if (!replies.length) {
             res.status(404);
           } else {
             res.json(replies);
           }
         });
  },

  postReply: function(req, res) {
    var postId = req.params.id;

    Reply.forge().fetch().then(function)
  },
};