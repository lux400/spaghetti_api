import express from 'express';

const router = express.Router();

router.use((req, res) => {
  res.json({ error: 404 });
});

export default router;
