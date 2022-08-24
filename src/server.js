'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// MiddleWare
app.use(cors());
app.use(morgan('dev'));

// DATA
const users = [
  { id: 3, name: 'James' },
  { id: 1, name: 'Serbentautas' },
  { id: 2, name: 'Lenteja' },
];

// Routes
app.get('/', (request, response) => {
  response.send(
    '<h1>Welcome to users API</h1><a href="/api/users">Our users list</a><br/><a href="/api/users/3">User with id 3</a>'
  );
});

// GET /api/users -> grazinti visu useriu masyva json
app.get('/api/users', (request, response) => {
  response.json(users);
});

// GET /api/users/3 -> grazinti useri kurio id yra 3 (ne pagal indexa)
app.get('/api/users/3', (request, response) => {
  const searchIndex = 3;
  const foundUser = users.find((uObj) => uObj.id === searchIndex);
  console.log('foundUser ===', foundUser);
  if (foundUser) {
    response.json(foundUser);
  } else {
    response.status(404).json({ msg: 'user not found' });
  }
});

// POST /api/users -> sukurti nauja useri su gautu name ir prideti prie esamu, grazinti 201 statusa su zinute

// 404
app.use((req, res) => {
  res.status(404).json({ msg: 'Sorry page not found' });
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));