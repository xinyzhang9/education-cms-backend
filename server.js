const express = require('express');
const bodyParser = require('body-parser');
const expressjwt = require('express-jwt');
const cors = require('cors');

const app = express();
const PORT = process.env.API_PORT || 8888;

app.use(bodyParser.json());
app.use(cors());

const jwtCheck = expressjwt({
  secret: "mysupersecretkey"
});

app.get('/resource', (req, res) => {
  res
    .status(200)
    .send('Public resource, you can see this');
});

app.get('/resource/secret', jwtCheck, (req, res) => {
  res
    .status(200)
    .send('Secret resource, you should be logged in to see this');
})


app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleTimeString();

  res
    .status(200)
    .send(`Server time is ${localTime}.`);
});

app.get('*',(req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}.`);
})