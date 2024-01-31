import express from 'express';
import { authHandler } from './auth-validator';
import { logoutHandler } from './logout-handler';

const router = express.Router();

router.get('/', authHandler);
router.get('/logout', logoutHandler);

const authRoutes = router;
export{authRoutes};

