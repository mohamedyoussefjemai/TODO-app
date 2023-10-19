import { User } from '../libs/common/index.js';

const findOneUser = async (data) => User.findOne(data);

const createUser = async (data) => {
  const newUser = new User(data);
  return newUser.save();
};

const findUserById = async (_id) => User.findById(_id);

export default findOneUser;
export { createUser, findUserById };
