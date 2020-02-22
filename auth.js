const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const users = [
  {id: 1, username: 'admin', password: 'admin', role: 'teacher'},
  {id: 2, username: 'user', password: 'user', role: 'student'}
];

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res
      .status(400)
      .send('You need a username and password');
    return;
  }

  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password
  });

  if(!user) {
    res
      .status(401)
      .send('No user found');
    return;
  }

  const token = jwt.sign({
    sub: user.id,
    username: user.username
  }, 'mysupersecretkey', {expiresIn: '3 hours'});

  res
    .status(200)
    .send({access_token: token});
});

app.get('*', (req, res) => {
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`Auth Server is running on port ${PORT}`);
})