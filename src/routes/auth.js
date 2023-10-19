import express from 'express';

import {
  login,
  register,
  getCurrent,
  logout,
} from '../controllers/auth.controller.js';

import requireAuth from '../middlewares/permissions.js';

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/register', register);
authRoute.get('/current', requireAuth, getCurrent);
authRoute.put('/logout', requireAuth, logout);

export default authRoute;
