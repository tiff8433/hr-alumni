var express = require('express'),
    util = require('../../config/utils.js'),
    post = require('./post.controller.js'),
    category = require('./category.controller'),
    reply = require('./reply.controller'),
    heart = require('./heart.controller');

var apiRouter = express.Router();

apiRouter.get('/posts', util.checkUser, post.getAllPosts);
apiRouter.get('/post/read/:id', util.checkUser, post.getPost);
apiRouter.post('/post/create', util.checkUser, post.createPost);
apiRouter.put('/post/read/upvote/:id', util.checkUser, post.upVote);

apiRouter.get('/post/replies/:id', util.checkUser, reply.getReplies);
apiRouter.get('/category/:category', util.checkUser, category.getPostsByCategory);
apiRouter.post('/post/replies/:id', util.checkUser, reply.postReply);
apiRouter.put('/post/replies/thumb/:id', util.checkUser, reply.thumbUpReply);

apiRouter.get('/category/:category', util.checkUser);

apiRouter.get('/posts/hearts', util.checkUser, heart.getHearts);


module.exports = apiRouter;
