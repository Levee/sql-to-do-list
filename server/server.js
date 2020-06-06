const express = require('express');
const bodyParser = require('body-parser');
const ex = express();

ex.use(bodyParser.urlencoded({ extended: true }));
ex.use(bodyParser.json());
ex.use(express.static('server/public'));

const port = process.env.PORT || 5353;
ex.listen(port, () => {
  console.log('listening on port', port);
});