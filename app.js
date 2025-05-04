import express from "express";
import fs from "fs";
import path from 'path';
import https from 'https';

const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/noskov.lol/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/noskov.lol/privkey.pem')
};


const app = express()


app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use('/jquery', express.static(path.join(import.meta.dirname, 'node_modules/jquery/dist')));

https.createServer(options, app).listen(443);
