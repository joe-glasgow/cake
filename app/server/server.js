// server is node express
const express = require('express');
// app is express server
const app = express();
// port
const port = 3200;
// Expiry Headers
const maxAge = {
    maxAge: "1d"
};
// static path to web folder
app.use(express.static('dist', maxAge));
// images fonts etc
app.use(express.static('dist/web', maxAge));
// simple routes
require('./routes')(app);

// non https
app.listen(port);
// show app running
console.log(`listening on port ${port}`);