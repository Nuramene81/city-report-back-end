import express from 'express';
import { Pool } from './db-pool';

const app = express();
const port = 3000;

const pool = new Pool();
pool.testPrimaryDBConection();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});