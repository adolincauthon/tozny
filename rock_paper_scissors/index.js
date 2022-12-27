const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');

const routes = require('./routes/userRoutes');
const data = require('./routes/dataRoutes');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
//main api endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

//user pages
app.get('/alicia', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/alicia.html'));
});
app.get('/bruce', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/bruce.html'));
});
app.get('/clarence', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/clarence.html'));
});

//assets
app.get('/assets/rock.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/assets/rock.jpg'));
});
app.get('/assets/paper.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/assets/paper.jpg'));
});
app.get('/assets/scissors.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/src//assets/scissors.jpg'));
});

//js
app.get('/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/js/index.js'));
});
app.get('/js/judge.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/js/judge.js'));
});

//css
app.get('/css/output.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/css/output.css'));
});

//api routes
app.use('/api', routes);
app.use('/data', data);

console.log(`Listening on Port: ${PORT}`);
app.listen(PORT);
