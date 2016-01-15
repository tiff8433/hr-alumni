var express = require('express'),
    util = require('../../config/utils.js'),
    post = require('./post.controller.js');

var apiRouter = express.Router();

apiRouter.get('/posts', util.checkUser, post.getAllPosts);
apiRouter.get('/post/read/:id', util.checkUser, post.getPost);
apiRouter.get('/post/replies/:id', util.checkUser);
apiRouter.get('/category/:category', util.checkUser);
apiRouter.post('/post/create', util.checkUser, post.createPost);
apiRouter.post('/post/replies/:id', util.checkUser);
apiRouter.put('/post/read/:id/upvote', util.checkUser);
apiRouter.put('/post/replies/:id/thumb', util.checkUser);

module.exports = apiRouter;
