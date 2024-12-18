if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express from 'express';
import cors from 'cors';
import { Pool } from './db-pool';
import { userRoutes } from './src/routes/user/userRoutes';
import { loginRoutes } from './src/routes/login/loginRoutes';
import { authRoutes } from './src/routes/auth/authRoutes';
import { issueRoutes } from './src/routes/issue/issueRoutes';
import { DB_CONFIG_OPTIONS } from './constants';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true
}));
const pool = new Pool();
pool.testPrimaryDBConection();
pool.connect(DB_CONFIG_OPTIONS);

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/issue', issueRoutes);

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});