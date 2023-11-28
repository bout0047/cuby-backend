import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const eventProxy = createProxyMiddleware({
  target: 'http://events-ms:3010',
  changeOrigin: true,
});

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/events', cors(), eventProxy);

export default router;
