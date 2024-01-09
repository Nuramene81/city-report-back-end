import express from 'express';
import { loginHandler } from './login-validator';

const router = express.Router();

router.post('/', loginHandler);

const loginRoutes = router;
export{loginRoutes};

