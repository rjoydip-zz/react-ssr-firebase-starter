import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';
import express from 'express';
import { readFileSync } from 'fs';
import * as functions from 'firebase-functions';

const index = readFileSync(__dirname + '/index.html', 'utf8');
const app = express();

app.get('*', (req, res) => {
    const finalHtml = index.replace('<!--::APP::-->', renderToString(<App />));
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    res.type('text/html').send(finalHtml);
});

export let ssrapp = functions.https.onRequest(app);