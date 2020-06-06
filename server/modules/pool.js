const pg = require('pg');
const Pool = pg.Pool;
const config = {
  database: 'weekend_to_do_app',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('PostreSQL connected!');
});

pool.on('error', (err) => {
  console.log('Error with Postgres pool:', err)
});

module.exports = pool;