import { FastifyInstance } from 'fastify';
import { registerController } from './controllers/organization/register.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController);
}
