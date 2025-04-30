import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { registerController } from './controllers/organization/register';
import { ZodError } from 'zod';

const app = fastify();

app.post('/users', registerController);

app.setErrorHandler(
  (error: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.format() });
    }

    reply.status(500).send({ message: 'Internal Server Error.' });
  },
);

export { app };
