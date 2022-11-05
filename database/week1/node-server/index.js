const express = require('express');
const mysql = require('mysql');

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

// Create queries
app.get('/:id', (req, res) => {
  let sql;
  switch (req.params.id) {
    case '1':
      sql = 'select Name from country where Population > 8000000';
      break;
    case '2':
      sql = 'select Name from country where Name like "%land%"';
      break;
    case '3':
      sql = 'select Name from city where Population >= 500000 and Population <= 1000000';
      break;
    case '4':
      sql = 'select Name from country where Continent = "Europe"';
      break;
    case '5':
      sql = 'select Name from country order by SurfaceArea desc';
      break;
    case '6':
      sql = 'select city.Name from country inner join city on country.Code = city.CountryCode where country.Name like "Netherlands"';
      break;
    case '7':
      sql = 'select Population from city where Name = "Rotterdam"';
      break;
    case '8':
      sql = 'select Name from country order by SurfaceArea desc limit 10';
      break;
    case '9':
      sql = 'select city.Name, country.Name from city inner join country on city.CountryCode = country.Code order by city.Population desc limit 10';
      break;
    case '10':
      sql = 'select sum(Population) as WorldPopulation from country';
      break;
    default:
      res.send('No such question');
      return;
  }
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Run server
app.listen('3000');
