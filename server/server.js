var port = process.env.PORT || 3000;
var express = require('express');
var app = express();

app.listen(3000, function() {
  console.log('Server started on port: ' + port);
});