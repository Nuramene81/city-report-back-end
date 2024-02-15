import express from 'express';
import { addUserHandler } from './add-user/add-user-handler';
import { getCurrentUserHandler } from './get-current-user.ts/get-current-user';

const router = express.Router();

router.route('/')
  .post(addUserHandler)
  .get(getCurrentUserHandler)


const userRoutes = router;
export{userRoutes};

