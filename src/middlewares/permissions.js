import { verifyToken } from '../services/auth.service.js';
import handled404Error, {
  handled401Error,
} from '../services/handleError.service.js';
import { findUserById } from '../services/user.service.js';

const requireAuth = async (req, res, next) => {
  const token = req.cookies['access-token'];
  let isAuthenticated = false;
  if (token) {
    try {
      const { userId } = await verifyToken(token);
      try {
        // find  user by id
        const user = await findUserById(userId);
        if (!user) return handled404Error('User not found', res);
        // clean user
        const userToReturn = { ...user._doc };
        delete userToReturn.password;
        req.user = userToReturn;
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    } catch {
      isAuthenticated = false;
    }
  }
  if (isAuthenticated) {
    return next();
  }
  handled401Error('Unauthorized', res);
};

export default requireAuth;
