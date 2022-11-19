const express = require('express');
const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Todo',
});

// Connect to MySQL;
db.connect((err) => {
  if (err) {
    throw err;
  }
});

// Create express server
const app = express();

// Execute SQL statements
// Create todo list
app.get('/create', (req, res) => {
  const values = [req.query.id, req.query.name, req.query.due].map((val) => {
    if (val) return val;
    return null;
  });
  db.execute('insert into List (user_id, name, due) values (?, ?, ?)', values, (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Delete todo list
app.get('/delete', (req, res) => {
  db.execute('delete from List where id=?', [req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Insert item into todo list
app.get('/insert', (req, res) => {
  db.execute('insert into Item (list_id, text) values (?, ?)', [req.query.list_id, req.query.text], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Remove item from todo list
app.get('/remove', (req, res) => {
  db.execute('delete from Item where id=?', [req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Mark item as done
app.get('/done', (req, res) => {
  db.execute('update Item set done=1 where id=?', [req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Add due date
app.get('/due', (req, res) => {
  db.execute('update List set due=? where id=?', [req.query.due, req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Run server
app.listen('3000');
