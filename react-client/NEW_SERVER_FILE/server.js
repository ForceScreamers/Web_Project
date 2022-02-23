const express = require('express');

const express = require("path");

const app = express();

// Check environment variable
const PORT = /*process.env.PORT ||*/ 5001;

//  Middleware
app.use(express.static(path.join(___dirname, "..", "build")));
app.use(express.static("public"));

//  Listen on a port
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
});