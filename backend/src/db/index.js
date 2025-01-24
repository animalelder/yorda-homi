const pg = require('pg');

const client = new pg.Client({
  host: process.env.PGHOST,
  name: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.SSL ?? 'require',
});

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL successfully!'))
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

client.on('error', (err) => {
  console.error('something bad has happened!', err.stack);
});

module.exports = client;
