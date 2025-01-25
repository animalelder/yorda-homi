// const pg = require("pg");

// const client = new pg.Client({
//   host: process.env.PGHOST,
//   name: process.env.PGDATABASE,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
// });
// client
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL successfully!"))
//   .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

// module.exports = client;





const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST,                // Host from your .env
  database: process.env.PGDATABASE,       // Database name
  user: process.env.PGUSER,               // User from your .env
  password: process.env.PGPASSWORD,       // Password
  port: process.env.PGPORT,               // Port (default is 5432)
  ssl: { rejectUnauthorized: false },     // Enforce SSL with relaxed certificate validation
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL successfully with SSL!"))
  .catch((error) => console.error(`Error connecting to PostgreSQL:\n${error.message}`));

module.exports = client;
