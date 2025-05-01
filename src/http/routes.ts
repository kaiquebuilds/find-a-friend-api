import { FastifyInstance } from 'fastify';
import { registerController } from './controllers/organization/register.controller';
import { authenticateController } from './controllers/organization/authenticate.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController);

  app.post('/session', authenticateController);
}
