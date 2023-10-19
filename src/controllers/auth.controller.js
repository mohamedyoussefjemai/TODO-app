import handled404Error, {
  handled400Error,
  handled401Error,
  handled500Error,
} from '../services/handleError.service.js';
import findOneUser, { createUser } from '../services/user.service.js';
import createToken, {
  hashPassword,
  passwordMatch,
} from '../services/auth.service.js';

// validations
import { userLoginSchema, registerSchema } from '../libs/common/index.js';

// @Route   POST /api/auth/login
// @desc    login user and return token
// @access  Public
const login = async (req, res) => {
  try {
    // validate login
    const response = userLoginSchema.validate(req.body, {
      abortEarly: true,
    });
    if (response && response.error)
      return handled400Error(response.error.details[0].message, res);
    // get data
    const { email, password } = response.value;
    // find user
    const user = await findOneUser({
      email: new RegExp(`^${email}$`, 'i'),
    });
    if (!user) return handled404Error('User not found', res);
    // verify password
    await passwordMatch(password, user.password);
    if (!passwordMatch)
      return handled400Error('A problem with credentials', res);
    // set token
    createToken({ userId: user._id }, res);
    // clean user
    const returnedUser = { ...user._doc };
    delete returnedUser.password;
    return res.json({ user: returnedUser });
  } catch (err) {
    return handled500Error(err.message, res);
  }
};

// @Route   GET /api/auth/current
// @desc    Get current user
// @access  Private
const getCurrent = async (req, res) => {
  if (!req.user) return handled401Error('Unauthorized', res);
  return res.json(req.user);
};

// @Route   PUT /api/auth/logout
// @desc    Logout and clean cookie
// @access  Private
const logout = async (req, res) => {
  try {
    res.clearCookie('access-token');
    return res.json({ success: true });
  } catch (err) {
    return handled500Error(err.message, res);
  }
};

// @Route   POST /api/auth/register
// @desc    Create a new User
// @access  Public
const register = async (req, res) => {
  try {
    // validate register data
    const response = registerSchema.validate(req.body, {
      abortEarly: true,
    });
    if (response && response.error)
      return handled400Error(response.error.details[0].message, res);

    // get data
    const { email, password, name } = response.value;

    // check email exist
    const existingEmail = await findOneUser({
      email: new RegExp(`^${email}$`, 'i'),
    });
    if (existingEmail) return handled400Error('Email exist', res);
    // hash password
    const hashedPassword = await hashPassword(password);
    // create user
    const savedUser = await createUser({
      email,
      password: hashedPassword,
      name,
    });
    // set token
    await createToken({ userId: savedUser._id }, res);
    // clean user
    const returnedUser = { ...savedUser._doc };
    delete returnedUser.password;
    return res.json({ user: returnedUser });
  } catch (err) {
    handled500Error(err.message, res);
  }
};

export { login, getCurrent, logout, register };
