const express = require('express');
const randomId = require('random-id');
const app = express(),
  bodyParser = require("body-parser");
port = process.env.PORT || 3070;

const authMiddleware = function authMiddleware(req, res, next) {
  const easyAuth = req.header("X-MS-CLIENT-PRINCIPAL"); // only app service can set this header

 if (easyAuth) {
    let bufferObj = Buffer.from(easyAuth, "base64");
    let decodedString = bufferObj.toString("utf8");
    let easyAuthObj = JSON.parse(decodedString);

    let user = {};
    // convert to user object
    var claims = easyAuthObj.claims;
    for (let i = 0; i < claims.length; i++) {
      if (!user[claims[i].typ] && claims[i].typ !== "roles") {
        user[claims[i].typ] = claims[i].val;
      }
    }

    user.roles = claims.filter((c) => c.typ === "roles").reduce((acc, c) => { acc[c.val] = true; return acc; }, {});

    req.user = user;
    console.log(req.user);
    next();
  }
  else {
    var err = new Error('Not authorized!');
    err.status = 401;
    return next(err);
  }
};

const canWriteUsers = function canWriteUsers(req, res, next) {
  console.log("roles", req.user && req.user.roles);

  if (req.user && req.user.roles["User.Write"]) {
    next();
  } else {
    // return unauthorized
    res.status(401).send("Unauthorized");
  }
};

const canReadUsers = function canReadUsers(req, res, next) {
  console.log("roles", req.user && req.user.roles);

  if (req.user && req.user.roles["User.Read"]) {
    next();
  } else {
    // return unauthorized
    res.status(401).send("Unauthorized");
  }
};

// place holder for the data
const users = [
  {
    id: "1",
    firstName: "first1",
    lastName: "last1",
    email: "abc@gmail.com"
  },
  {
    id: "2",
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com"
  },
  {
    id: "3",
    firstName: "first3",
    lastName: "last3",
    email: "abc@gmail.com"
  }
];

app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

app.use(authMiddleware);

app.get('/api/users', canReadUsers, (req, res) => {
  console.log('api/users called!!!!!!!')
  res.json(users);
});

app.get('/api/me', (req, res) => {
  console.log('api/me called!!!!!!!')
  res.json(req.user);
});

app.post('/api/user', canWriteUsers, (req, res) => {
  const user = req.body.user;
  user.id = randomId(10);
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/my-app/dist/index.html');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});