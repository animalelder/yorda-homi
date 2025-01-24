const pg = require('pg');

const config = { connectionString: process.env.DB_URI };

const client = new pg.Client(config);

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL successfully!'))
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

client.on('error', (err) => {
  console.error('something bad has happened!', err.stack);
});

module.exports = client;
