import { FastifyInstance } from 'fastify';
import { registerController } from './controllers/organization/register.controller';
import { authenticateController } from './controllers/organization/authenticate.controller';
import { createPetController } from './controllers/pets/create-pet.controller';
import { retrievePetController } from './controllers/pets/retrieve-pet.controller';
import { listPetsByCityController } from './controllers/pets/list-pets-by-city.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController);

  app.post('/pets', createPetController);
  app.get('/pets', listPetsByCityController);
  app.get('/pets/:id', retrievePetController);

  app.post('/session', authenticateController);
}
