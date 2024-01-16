// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
import indexRouter from './routes/profile.mjs';

dotenv.config({ path: 'variables.env' });

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use((req, res, next) => {
  try {
    // set header before response
    res.status(404).send("Sorry can't find that!");
  } catch (err) {
    next(err);
  }
});

app.set('port', process.env.PORT || 3012);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
