import express from 'express';
import { Pool } from '../../../db-pool';

const router = express.Router();

const pool = new Pool();
pool.connect({
  host: 'localhost',
  port: 5433,
  database: 'city-report',
  user: 'postgres',
  password: '1504'
})

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

router.post('/', (req, res) => {
  console.log(req.body);
  pool.query(
    `INSERT INTO "Users" ("FullName", "Username", "Email", "Password", "ProfileImageURL")
      VALUES ($1, $2, $3, $4, $5);`, 
    [
      req.body.fullName, 
      req.body.username, 
      req.body.email, 
      req.body.password,
      req.body.profileImageURL
    ]
  ).then(() => {
    console.log('User created');
    res.json({ message: 'User created' });
  }).catch((err) => {
    console.log('Cannot create user', err);
    res.json({ message: 'Cannot create user' });
  });
});

const userRoutes = router;
export{userRoutes};

