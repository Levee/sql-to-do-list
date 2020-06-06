const express = require('express');
const list = express.Router();
// DB CONNECTION
const pool = require('../modules/pool.js');

list.get('/', (req, res) => {
  const sort = ''
  const query = `SELECT * FROM tdlist`;
  pool
    .query(query)
    .then((out) => {
      res.send(out.rows);
    })
    .catch((err) => {
      console.log(`Error! Could not make query '${query}'`, err);
      res.sendStatus(500);
    });
});

list.post('/', (req, res) => {
  let task = req.body;
  const query = `INSERT INTO tdlist (name, detail, priority) VALUES ($1, $2, $3)`;
  pool
    .query(query, [
      task.name,
      task.detail,
      task.priority
    ])
    .then((out) => {
      console.log('Query successful!', out.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${query}`, err);
      res.sendStatus(500);
    });
});

module.exports = list;