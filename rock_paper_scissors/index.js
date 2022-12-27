const express = require('express');
const dotenv = require('dotenv').config();
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
app.get('/', (req, res) => {});

app.use('/api/', routes);
app.use('/data', data);

console.log(`Listening on Port: ${PORT}`);
app.listen(PORT);
