import { createRegisterUseCase } from '@/use-cases/factories/register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerSchema = z.object({
      name: z.string(),
      owner: z.string(),
      email: z.string().email(),
      zipCode: z.string(),
      address: z.string(),
      phone: z.string(),
      password: z.string().min(6),
    });

    const data = registerSchema.parse(request.body);

    const registerUseCase = createRegisterUseCase();
    const organization = await registerUseCase.execute(data);
    reply.status(201).send({ ...organization, passwordHash: undefined });
  } catch (error) {
    throw error;
  }
}
