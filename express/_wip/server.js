const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/contact', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }

    res.status(201).send(`Thank you, ${req.body.name}!`);
});

app.post('/login', (req, res) => {
    if(!req.header('x-auth-token')) {
        return res.status(400).send('No token');
    }

    if (req.header('x-auth-token') != '12345') {
        return res.status(401).send('Not authorised');
    }

    res.send('Logged in');
});

app.put('/post/:id', (req, res) => {
    // DB stuff

    res.json({ 
        id: req.params.id,
        title: req.body.title
    });
});

app.delete('/post/:id', (req, res) => {
    // DB stuff

    res.json({ 
        msg: `Post ${req.params.id} deleted`
    });
});

app.listen(1234, () => console.log('Server started on 1234'));
