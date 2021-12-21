const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRoute');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
const cors = require('cors');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
} = require('./config/config');
const port = process.env.PORT || 3000;
const app = express();

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
});

const connectDB = async () => {
  const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}`;
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database'))
    .catch(error => {
      console.log(error);
      setTimeout(connectDB, 5000);
    });
};

connectDB();

app.enable('trust proxy');
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 30000 //1000 * 60 * 60
    }
  })
);

app.use(express.json());
app.get('/api/v1', (req, res) => {
  res.send('<h1>Hi There..</h1>');
  console.log('Yeahhdoc');
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.listen(port, () => {
  console.log(`listen in port ${port}`);
});
