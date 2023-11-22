import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const eventProxy = createProxyMiddleware({
  target: 'http://events:3010',
  changeOrigin: true,
});

router.use('/events', cors(), eventProxy);

export default router;
