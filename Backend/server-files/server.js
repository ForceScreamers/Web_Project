const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { rejects } = require('assert');

const axios = require('axios');

const app = express();

const jwt = require('jsonwebtoken');
const { response } = require('express');

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

//!use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// create a GET route
app.get('/backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/register', (req, res) => {
  let reqData = JSON.parse(req.headers.data)

  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/UserRegister',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      //  Send the recived  user data to the webapi
      'username': reqData.username,
      'email': reqData.email,
      'password': reqData.password,
      'userType': reqData.userType,
    }
  })
    .then((apiRegisterResponse) => {


      let registerInfo = {
        registered: apiRegisterResponse.data.Registered,
        userExists: apiRegisterResponse.data.UserExists,
        userType: apiRegisterResponse.data.UserType,
      }
      console.log(registerInfo);

      //  If the user was registered and doesn't exists in the system
      if (registerInfo.registered === true && registerInfo.userExists === false) {

        //  Generate token and add to info
        registerInfo.token = jwt.sign({}, "secret", {
          expiresIn: 300, // 5 Min
        });
      }

      res.end(JSON.stringify(registerInfo));
    })
})

//TODO: change secret to .env variable
//  TODO: FINISH REGISTER AND LOGIN!!!!
app.post('/login', (req, res) => {
  let reqData = JSON.parse(req.headers.data)

  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/UserLogin',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      //  Send the recived  user data to the webapi
      'email': reqData.email,
      'password': reqData.password,
      'userType': reqData.userType,
    }
  })
    .catch(err => console.log(err))
    .then((apiResponse) => {

      //  Extract login info from the api response
      loginInfo = {
        username: apiResponse.data.ParentInfo.Username,
        id: apiResponse.data.ParentInfo.Id,
        children: apiResponse.data.ParentInfo.Children,
        userExists: apiResponse.data.UserExists,

        //  Generate token
        token: jwt.sign({}, "secret", {
          expiresIn: 300, // 5 Min
        })
      }
      console.log(loginInfo)

      res.status(200).end(JSON.stringify(loginInfo))
    })
})

const GetChildren = (parentId) => {
  //  Get the children from the webapi
  return
}

//  TODO: Clear console logs
const verifyJWT = (req, res, next) => {

  const token = req.headers["x-access-token"];//Grab token
  console.log(token);

  if (!token) {
    console.log("2")
    res.send("Need a token, gib pls UwU");
  }
  else {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        console.log("3")

        res.json({ authorized: false, message: "Failed to authenticate" });
      }
      else {
        console.log("4")
        //  New variable userId, create a new one
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get('/is-auth', verifyJWT, (req, res) => {
  console.log("OK")

  res.json({ isAuth: true }).status(200).end();
});

app.post('/add-child', (req, res) => {
  //  Axios request to webapi
  let status = 200;

  let reqData = JSON.parse(req.headers.data)

  //  Send login request to webapi
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/AddChild',
    method: 'POST',
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
    //console.log(response);


    //let authenticatedMessage = response.data;
    let responseMessage = response.data;

    //  End the request with bool, if the user is in the database 
    //  and the password and username match
    res.status(status).end(JSON.stringify(responseMessage));
  })
})

app.get('/get-children-for-parent', (req, res) => {
  let parentId = JSON.parse(req.headers.data)
  console.log(parentId);
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/GetChildren',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      parentId: parentId
    }
  })
    .catch(err => console.log(err))
    .then((response) => {
      console.log(response);
      res.status(200).end(JSON.stringify(response.data))
    })
});

app.get('/get-current-child-name', (req, res) => {
  let reqData = JSON.parse(req.headers.data)

  //  Get the children from the webapi
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/GetCurrentChildName',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      parentId: reqData
    }
  }).catch(err => console.log(err))
    .then((response) => {

      console.log(response.data);
      res.status(200).end(JSON.stringify(response.data))
    })
});

app.get('/delete-child', (req, res) => {
  let reqData = JSON.parse(req.headers.data)
  console.log(`Delete child ${reqData.childId} for parent ${reqData.parentId}`);
  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/DeleteChild',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      childId: reqData.childId,
      parentId: reqData.parentId
    }
  }).catch(err => console.log(err))
    .then((response) => {
      //  Send children to client
      console.log("Deleting child...")
      console.log(response.data);
      res.status(200).end(JSON.stringify(response.data))
    })
})

app.post('/select-child', (req, res) => {
  console.log(req.headers);
  let reqData = JSON.parse(req.headers.data);

  axios({
    hostname: 'localhost',
    port: 5000,
    url: 'http://localhost:5000/api/Parent/SelectChild',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      childId: reqData
    }
  })
    .catch(err => console.log(err))
    .then((response) => {
      console.log(`Switching selected child to ${response.data.IsSelected}`)
      res.status(200).end(JSON.stringify(response.data));
    })
})