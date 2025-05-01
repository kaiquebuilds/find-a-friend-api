import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from './http/routes';
import { EmailAlreadyTakenError } from './use-cases/errors/email-already-taken.error';
import { env } from './env';

const app = fastify();

app.register(appRoutes);

app.setErrorHandler(
  (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error);
    }

    if (error instanceof EmailAlreadyTakenError) {
      return reply.status(409).send({ message: error.message });
    }

    reply.status(500).send({ message: 'Internal Server Error.' });
  },
);

export { app };
