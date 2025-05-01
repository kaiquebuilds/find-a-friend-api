import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error';
import { createAuthenticateUseCase } from '@/use-cases/factories/create-authenticate-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const data = registerSchema.parse(request.body);

    const authenticateUseCase = createAuthenticateUseCase();
    await authenticateUseCase.execute(data);
    reply.status(201).send({ token: '1234' });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }
    throw error;
  }
}
