const express = require('express');
const list = express.Router();
const pool = require('../modules/pool.js');

// get request to db
list.get('/', (req, res) => {
  const query = `SELECT * FROM tdlist ORDER BY status, priority`;
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

// post request to db
list.post('/', (req, res) => {
  const task = req.body;
  const query = `INSERT INTO tdlist (name, detail, priority) VALUES ($1, $2, $3)`;
  pool
    .query(query, [
      task.name,
      task.detail,
      task.priority
    ])
    .then((out) => {
      console.log('Query successful!');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${query}`, err);
      res.sendStatus(500);
    });
});

module.exports = list;