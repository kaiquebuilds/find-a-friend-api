import { FastifyInstance } from 'fastify';
import { registerController } from './controllers/organization/register.controller';
import { authenticateController } from './controllers/organization/authenticate.controller';
import { createPetController } from './controllers/organization/create-pet.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController);
  app.post('/pets', createPetController);

  app.post('/session', authenticateController);
}
