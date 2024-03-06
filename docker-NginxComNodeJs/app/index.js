const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'fullcycle'
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM people', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao consultar o banco de dados');
            return;
        }

        const names = results.map(person => person.name);

        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>
                ${names.map(name => `<li>${name}</li>`).join('\n')}
            </ul>
            
        `);
    });
});

app.post('/add-name', express.json(), (req, res) => {
    const { name } = req.body;

    connection.query('INSERT INTO people (name) VALUES (?)', [name], (err) => {
        if (err) {
            res.status(500).send('Erro ao adicionar nome no banco de dados');
            return;
        }

        res.send('Nome adicionado com sucesso!');
    });
});

app.listen(3000);
