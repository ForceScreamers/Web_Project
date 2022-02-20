const express = require('express');

const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// Check environment variable
const PORT = /*process.env.PORT ||*/ 5001;


//  Listen on a port
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
});