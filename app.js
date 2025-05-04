import express from "express";
import path from 'path';

const app = express()

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use('/jquery', express.static(path.join(import.meta.dirname, 'node_modules/jquery/dist')));

app.listen(80);