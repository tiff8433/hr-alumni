var express = require('express'),
    util = require('../../config/utils.js');

var apiRouter = express.Router();

apiRouter.get('/posts', util.checkUser);
apiRouter.get('/post/read/:id', util.checkUser);
apiRouter.get('/post/replies/:id', util.checkUser);
apiRouter.get('/category/:category', util.checkUser);
apiRouter.post('/post/create', util.checkUser);
apiRouter.post('/post/replies/:id', util.checkUser);
apiRouter.put('/post/read/:id/upvote', util.checkUser);
apiRouter.put('/post/replies/:id/thumb', util.checkUser);

module.exports = apiRouter;
