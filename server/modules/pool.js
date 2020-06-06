const pg = require('pg');
const Pool = pg.Pool;
const config = new Pool({
  database: 'tdlist',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
});

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('PostreSQL connected!');
});

pool.on('error', (error) => {
  console.log('Error with Postgres pool.', error)
});

module.exports = pool;