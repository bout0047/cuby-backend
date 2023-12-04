import express from 'express';
import cors from 'cors';
import { getUsers } from '../controllers/usersController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('Dawid is here because poland is the best country in the universe');
});
// router.get('/example', checkName, responseExample);
// router.post('/example', checkName, updateExample);

router.options('/users', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// get a collection of all the appointments and ou can use a query
router.get('/users', cors(), getUsers);

export default router;
