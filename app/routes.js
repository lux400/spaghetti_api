import express from 'express';
import { resources } from './utils';

import { users } from './controllers';

const router = express.Router();

router.use('/users', resources(users));

router.use((req, res) => {
  res.json({ error: 404 });
});

export default router;
