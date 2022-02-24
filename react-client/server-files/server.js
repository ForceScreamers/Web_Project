const express = require("express");

const path = require("path");

const app = express();

// Check environment variable
const PORT = /*process.env.PORT ||*/ 5001;

//  Middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

//  Listen on a port
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
});