const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { rejects } = require('assert');

const axios = require('axios');

const app = express();

const session = require('express-session');

const utf8 = require('utf8');

const jwt = require('jsonwebtoken');

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
  saveUninitialized: false,  //  Don't save empty value if there's no value
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Cookie wil expire after 1 day
  }
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
    url: 'http://localhost:5000/api/Parent/GetLoginConfirmation',
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
    console.log(response.data);
    let userInfo = response.data;


    //let authenticatedMessage = response.data;
    //let responseMessage = { Confirmed: response.data.Confirmed };

    //  Token instance
    //TODO: change secret to .env variable
    const token = jwt.sign({}, "secret", {
      expiresIn: 300, // 5 Min
    })
    res.json({
      authorized: true,
      token: token,
      result: userInfo // User information from server (just need username and id)
    }).status(status).end(/*JSON.stringify(responseMessage)*/);

    //  End the request with bool, if the user is in the database 
    //  and the password and username match

  })
});



const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];//Grab token
  if (!token) {
    res.send("Need a token, gib pls UwU");
  }
  else {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({ authorized: false, message: "Failed to authenticate" });
      }
      else {
        //  New variable userId, create a new one
        req.userId = decoded.id;
      }
    })
  }
}

app.get('/is-auth', verifyJWT, (req, res) => {
  res.send("you are authenticated!");
});


app.post('/add-child', (req, res) => {
  //  Axios request to webapi
  let status = 200;

  let reqData = JSON.parse(req.headers.data)
  //console.log(reqData);
  //console.log("Child name decoded: " + utf8.decode(reqData.childName))
  //console.log("Child name encoded: " + reqData.childName)

  //  Send login request to webapi
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/GetAddChildConfirmation',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      //  Send the recived  user data to the webapi
      'parentId': reqData.parentId,
      'childName': reqData.childName,
      'childAge': reqData.childAge,
    }
  }).catch((err) => {
    status = 400;
    console.log(err)
    //console.log("Can't connect to webapi")

  }).then((response) => {
    console.log("Response from web api:");
    //console.log(response);


    //let authenticatedMessage = response.data;
    let responseMessage = response.data;

    //  End the request with bool, if the user is in the database 
    //  and the password and username match
    res.status(status).end(JSON.stringify(responseMessage));
  })
})

app.get('/get-children-for-parent', (req, res) => {
  let reqData = JSON.parse(req.headers.data)

  //  Get the children from the webapi
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/GetChildrenForParent',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      parentId: reqData
    }
  }).catch(err => console.log(err))
    .then((response) => {
      //  Send children to client
      console.log("Sending children to client...")
      console.log(response.data);
      res.status(200).end(JSON.stringify(response.data))
    })

});


app.get('/delete-child', (req, res) => {
  let reqData = JSON.parse(req.headers.data)
  console.log("child id: " + reqData.childId);
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/GetDeleteChild',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      childId: reqData.childId
    }
  }).catch(err => console.log(err))
    .then((response) => {
      //  Send children to client
      console.log("Deleting child...")
      console.log(response.data);
      res.status(200).end(JSON.stringify(response.data))
    })
})
