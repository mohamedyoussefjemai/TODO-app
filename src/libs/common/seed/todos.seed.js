import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { User, ToDo } from '../index.js';

import todos from './data/todos.data.js';

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

const seedTodos = async () => {
  let dataToAdd = [];
  // get users
  const users = await User.find();
  // add todos
  for await (const user of users) {
    const todosData = todos.map((t) => ({ ...t, user: user._id }));
    dataToAdd = dataToAdd.concat(todosData);
  }
  // insert seed
  await ToDo.deleteMany({});
  await ToDo.insertMany(dataToAdd);
};
// run seed
seedTodos().then(() => {
  mongoose.connection.close();
});
