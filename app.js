import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

// import models
import './src/libs/common/models/index.js';
import useRoutes from './src/libs/common/routes/route.js';

const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// user routes
useRoutes(app);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

try {
  mongoose.set('strictQuery', false);

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      app.listen(process.env.HTTP_PORT);
    })
    .catch((err) => {
      throw new Error(err);
    });
} catch (error) {
  throw new Error(error);
}
