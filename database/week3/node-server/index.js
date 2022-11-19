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

// Create & configure express server
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Serve views
app.get('/', (req, res) => {
  db.query('select id, name from User', (err, result) => {
    if (err) {
      throw err;
    }
    res.render('index', { users: result });
  });
});

app.get('/user/:id', (req, res) => {
  db.execute('select id, name, due, done from List where user_id=?', [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.render('user', { lists: result });
  });
});

app.get('/list/:id', (req, res) => {
  db.execute('select id, text, done from Item where list_id=?', [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.render('list', { items: result });
  });
});

// API statements
// Create todo list
app.post('/create', (req, res) => {
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
app.delete('/delete', (req, res) => {
  db.execute('delete from List where id=?', [req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Insert item into todo list
app.post('/insert', (req, res) => {
  db.execute('insert into Item (list_id, text) values (?, ?)', [req.query.list_id, req.query.text], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Remove item from todo list
app.delete('/remove', (req, res) => {
  db.execute('delete from Item where id=?', [req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Mark item as done
app.put('/done', (req, res) => {
  db.execute('update Item set done=1 where id=?', [req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Add due date
app.put('/due', (req, res) => {
  db.execute('update List set due=? where id=?', [req.query.due, req.query.id], (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});

// Redirect incorrect URLs
app.get('*', (req, res) => {
  res.redirect('/');
});

// Run server
app.listen('3000');
