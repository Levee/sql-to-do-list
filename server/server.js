const express = require('express');
const bodyParser = require('body-parser');
const ex = express();
const list = require('./routes/list.router.js');

ex.use(bodyParser.urlencoded({ extended: true }));
ex.use(bodyParser.json());
ex.use(express.static('server/public'));
ex.use('/list', list);

const port = process.env.PORT || 5353;
ex.listen(port, () => {
  console.log('listening on port', port);
});