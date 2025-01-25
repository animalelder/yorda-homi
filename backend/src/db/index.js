const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST,                
  database: process.env.PGDATABASE,      
  user: process.env.PGUSER,               
  password: process.env.PGPASSWORD,       
  port: process.env.PGPORT,              
  ssl: { rejectUnauthorized: false },    
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL successfully with SSL!"))
  .catch((error) => console.error(`Error connecting to PostgreSQL:\n${error.message}`));

module.exports = client;
