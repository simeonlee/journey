var express = require('express');

var app = express();

//configure server with middleware.
require('./config/middleware.js')(app, express);

//configure server with routing.
require('./config/routes.js')(app, express);

//start listening to requests on port 3000.
app.listen(3000, () => {
  console.log('Listening on Port: 3000');
};

module.exports = app;