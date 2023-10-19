import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { User } from '../index.js';
import { hashPassword } from '../../../services/auth.service.js';

import users from './data/users.data.js';

// get env
dotenv.config();

try {
  mongoose.set('strictQuery', false);

  mongoose
    .connect(process.env.MONGODB_URI)
    .then()
    .catch((err) => {
      throw new Error(err);
    });
} catch (error) {
  throw new Error(error);
}

const seedUsers = async () => {
  const dataToAdd = [];
  // add password
  for await (const user of users) {
    const object = user;
    object.password = await hashPassword(user.password, 12);
    dataToAdd.push(object);
  }
  // insert seed
  await User.deleteMany({});
  await User.insertMany(dataToAdd);
};
// run seed
seedUsers().then(() => {
  mongoose.connection.close();
});
