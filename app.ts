import express from 'express';
import cors from 'cors';
import { Pool } from './db-pool';
import { userRoutes } from './src/routes/user/userRoutes';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const pool = new Pool();
pool.testPrimaryDBConection();

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});