if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express from 'express';
import cors from 'cors';
import pgSession from 'connect-pg-simple';
import session from 'express-session';
import pg from 'pg';
import { Pool } from './db-pool';
import { userRoutes } from './src/routes/user/userRoutes';
import { loginRoutes } from './src/routes/login/loginRoutes';
import { authRoutes } from './src/routes/auth/authRoutes';
import { issueRoutes } from './src/routes/issue/issueRoutes';
import { DB_CONFIG_OPTIONS } from './constants';

const app = express();
const port = process.env.PORT || process.env.HOST_PORT;
const pgStore = pgSession(session);

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
const pool = new Pool();
pool.testPrimaryDBConection();
pool.connect(DB_CONFIG_OPTIONS);

app.use(session({
  store: new pgStore({
    pool: pool._pool as pg.Pool,
    createTableIfMissing: true,
    tableName: 'user_sessions'
  }),
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/issue', issueRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});