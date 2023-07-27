// imports
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// server
const server = express();
server.set('view engine', 'ejs');

// listen to the server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// server configuration
server.use(cors());
dotenv.config();
server.use(express.json({ limit: '25mb' }));

// connection to database
async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.GAMEUSER,
    password: process.env.PASS,
  });
  await connection.connect();
  console.log(
    `Connection successful with database (identifier=${connection.threadId})`
  );
  return connection;
}

// endpoints
server.get('/api/randoming', async (req, res) => {
  console.log('Retrieving random ingredient from database');
  const connection = await getConnection();
  const sql = `SELECT * FROM ingredients ORDER BY RAND() LIMIT 3`;
  const [results] = await connection.query(sql);
  res.json(results);
  connection.end();
});

// estáticos
const pathServerPublicStyles = './src/public-css';
server.use(express.static(pathServerPublicStyles));
server.use(express.static('./src/public'));
