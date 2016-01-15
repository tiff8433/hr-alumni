var express = require('express'),
    util = require('../../config/utils.js'),
    post = require('./post.controller.js'),
    reply = require('./reply.controller');

var apiRouter = express.Router();

apiRouter.get('/posts', util.checkUser, post.getAllPosts);
apiRouter.get('/post/read/:id', util.checkUser, post.getPost);
apiRouter.get('/post/replies/:id', reply.getReplies);
apiRouter.get('/category/:category', util.checkUser);

apiRouter.post('/post/replies/:id', reply.postReply);
apiRouter.put('/post/replies/:id/thumb', reply.thumbUpReply);
apiRouter.post('/post/create', util.checkUser, post.createPost);
apiRouter.put('/post/read/:id/upvote', util.checkUser);

module.exports = apiRouter;
