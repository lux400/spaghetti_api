import express from 'express';
import { auth } from './controllers';

const router = express.Router();

router.post('/signup', auth.signup);

router.use((req, res) => {
  res.json({ error: 404 });
});

export default router;