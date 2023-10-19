import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const passwordMatch = async (password, userPassword) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (err) {
    throw new Error('Password not match');
  }
};

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (err) {
    throw new Error('Error occurred in hash password');
  }
};

const createToken = async (payload, res) => {
  // set token
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return res.cookie('access-token', token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
};

const verifyToken = async (token) => {
  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
export default createToken;
export { passwordMatch, hashPassword, verifyToken };
