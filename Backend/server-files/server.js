const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { rejects } = require('assert');

const axios = require('axios')

const app = express();

const session = require('express-session');

// Check environment variable
const PORT = /*process.env.PORT ||*/ 5001;

//  Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('src'))
app.use(cors())


//  Listen on a port
/*let server =*/ app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
});

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false  //  Don't save empty value if there's no value
}))

//  Routes  //

// create a GET route
app.get('/backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/login', (req, res) => {
  //  Axios request to webapi
  let status = 200;

  let reqData = JSON.parse(req.headers.data)
  console.log(reqData);

  //  Send login request to webapi
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      //  Send the recived  user data to the webapi
      'email': reqData.email,
      'password': reqData.password,
    }
  }).catch((err) => {
    status = 400;
    console.log(err)
    console.log("Can't connect to webapi")

  }).then((response) => {
    console.log("Response from web api:");
    console.log(response.data.Authenticated);


    //let authenticatedMessage = response.data;
    let authenticatedMessage = { Authenticated: true };

    //  End the request with bool, if the user is in the database 
    //  and the password and username match
    res.status(status).end(JSON.stringify(authenticatedMessage));
  })
});



app.post('/Auth', (req, res) => {
  console.log(ids)
  console.log(req.sessionID)

  if (ids.includes(req.sessionID)) {
    console.log("All good");
  }
  else {
    console.log("Not good");
  }
})
