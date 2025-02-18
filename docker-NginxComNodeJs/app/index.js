const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'fullcycle'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    let sql = 'INSERT INTO people(name) VALUES ("Full Cycle Rocks!!")';
    db.query(sql, (err, result) => {
        if (err) throw err;
        sql = 'SELECT * FROM people';
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.send('<h1>Full Cycle Rocks!</h1>' + JSON.stringify(results));
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});