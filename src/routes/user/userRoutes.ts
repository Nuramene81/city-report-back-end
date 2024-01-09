import express from 'express';
import { addUserHandler } from './add-user-handler';

const router = express.Router();

router.post('/', addUserHandler);

const userRoutes = router;
export{userRoutes};

