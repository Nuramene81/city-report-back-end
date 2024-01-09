import express from 'express';
import { Pool } from '../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../constants';
import { addUserHandler } from './add-user-handler';

const router = express.Router();

const pool = new Pool();
pool.connect(DB_CONFIG_OPTIONS)

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

router.post('/', addUserHandler);

const userRoutes = router;
export{userRoutes};

