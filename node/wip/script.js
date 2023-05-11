'use strict';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3030;

const server = app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
);

console.log('running some code...');

server.close(() => console.log('Server shut down'));
