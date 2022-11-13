const express = require('express');
const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'new_world',
});

// Connect to MySQL;
db.connect((err) => {
  if (err) {
    throw err;
  }
});

// Create express server
const app = express();

// Prepare statements
db.prepare("select country.Name as 'Country', city.Name as 'Capital' from country inner join city on country.Capital = city.ID where country.Name = ?", (err, statement) => {
  app.get('/1/:id', (req, res) => {
    statement.execute([req.params.id], (error, result) => {
      res.send(result);
    });
  });
});

db.prepare("select distinct l.Language as 'Languages' from country c inner join countrylanguage l on c.Code = l.CountryCode where c.Region = ?", (err, statement) => {
  app.get('/2/:id', (req, res) => {
    statement.execute([req.params.id], (error, result) => {
      res.send(result);
    });
  });
});

db.prepare("select l.Language, count(distinct c.Name) as 'Cities' from city c inner join countrylanguage l on c.CountryCode = l.CountryCode where l.Language = ?", (err, statement) => {
  app.get('/3/:id', (req, res) => {
    statement.execute([req.params.id], (error, result) => {
      res.send(result);
    });
  });
});

db.prepare("select c.Continent, count(distinct l.Language) as 'Languages' from country c inner join countrylanguage l on c.Code = l.CountryCode group by c.Continent", (err, statement) => {
  app.get('/4', (req, res) => {
    statement.execute([], (error, result) => {
      res.send(result);
    });
  });
});

// Run server
const server = app.listen('3000');

process.on('SIGTERM', () => {
  server.close();
  db.end();
});
