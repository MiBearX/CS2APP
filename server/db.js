require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle PG client', err);
  process.exit(-1);
});

module.exports = pool;
