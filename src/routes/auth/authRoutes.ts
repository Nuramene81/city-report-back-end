import express from 'express';
import { authHandler } from './auth-validator';

const router = express.Router();

router.get('/', authHandler);

const authRoutes = router;
export{authRoutes};

