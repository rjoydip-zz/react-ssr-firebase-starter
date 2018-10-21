import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';
import { readFileSync } from 'fs';
import * as functions from 'firebase-functions';

import express from 'express';
const app = express();

// import fastify from 'fastify';
// const app = fastify();

const index = readFileSync(__dirname + '/index.html', 'utf8');

app.get('*', (req, res) => {
    const finalHtml = index.replace('<!--::APP::-->', renderToString(<App />));
    res.header('Cache-Control', 'public, max-age=600, s-maxage=1200');
    res.header('Content-Type', 'text/html');
    res.send(finalHtml);
});

app.listen(3000, () => console.log('server is running on port 3000'));

// export let ssrapp = functions.https.onRequest(app);