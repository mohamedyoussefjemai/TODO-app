import { authRoute, todoRoute } from '../../../routes/index.js';

const useRoutes = (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/todos', todoRoute);
};

export default useRoutes;
