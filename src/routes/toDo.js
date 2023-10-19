import express from 'express';

import {
  create,
  getCurrent,
  complete,
  incomplete,
  update,
  remove,
} from '../controllers/todo.controller.js';

import requireAuth from '../middlewares/permissions.js';

const TodoRoute = express.Router();

TodoRoute.post('/', requireAuth, create);
TodoRoute.get('/current', requireAuth, getCurrent);
TodoRoute.put('/:id/complete', requireAuth, complete);
TodoRoute.put('/:id/incomplete', requireAuth, incomplete);
TodoRoute.put('/:id', requireAuth, update);
TodoRoute.delete('/:id', requireAuth, remove);

export default TodoRoute;
