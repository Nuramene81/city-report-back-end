import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

const userRoutes = router;
export{userRoutes};

