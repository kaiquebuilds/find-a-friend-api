import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from './http/routes';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
app.register(appRoutes);

app.setErrorHandler(
  (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error);
    }

    reply.status(500).send({ message: 'Internal Server Error.' });
  },
);

export { app };
