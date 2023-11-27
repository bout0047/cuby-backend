import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import indexRouter from './routes/index.js';

dotenv.config({ path: 'variables.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', indexRouter);

app.set('port', process.env.PORT || 3011);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
