const express = require('express');
const list = express.Router();
const pool = require('../modules/pool.js');

// get request to db
list.get('/', (req, res) => {
  const query = `SELECT * FROM tdlist ORDER BY status, priority`;
  pool
    .query(query)
    .then((out) => {
      console.log('Select query successful!');
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
      console.log('Insert query successful!');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${query}`, err);
      res.sendStatus(500);
    });
});

list.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const query = `DELETE FROM tdlist WHERE id=$1`;
  pool
    .query(query, [taskId])
    .then((out) => {
      console.log('Delete request succuessful!');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${query}`, err);
      res.sendStatus(500);
    });
});

list.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const query = `
    update tdlist
    set status=case
      when status=false then true
      when status=true then false
      else status
    end where id=$1;`;
  pool
    .query(query, [taskId])
    .then((out) => {
      console.log('PUT request successful!');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${query}`, err);
      res.sendStatus(500);
    })
});



module.exports = list;