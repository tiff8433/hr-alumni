var express = require('express'),
    util = require('../../config/utils.js'),
    post = require('./post.controller.js'),
    reply = require('./reply.controller');

var apiRouter = express.Router();

apiRouter.get('/posts', post.getAllPosts);
apiRouter.get('/post/read/:id', post.getPost);
apiRouter.post('/post/create', post.createPost);
apiRouter.put('/post/read/upvote/:id', post.upVote);

apiRouter.get('/post/replies/:id', reply.getReplies);
apiRouter.put('/post/replies/:id/thumb');

apiRouter.get('/category/:category');


apiRouter.post('/post/replies/:id', reply.postReply);
apiRouter.put('/post/replies/:id/thumb', reply.thumbUpReply);
apiRouter.post('/post/create', util.checkUser, post.createPost);
apiRouter.put('/post/read/:id/upvote', util.checkUser);


module.exports = apiRouter;
