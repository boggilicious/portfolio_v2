import express from "express";
import path from 'path';

const app = express()

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.listen(3001);