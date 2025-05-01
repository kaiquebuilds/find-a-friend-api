import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error';
import { createRetrievePetUseCase } from '@/use-cases/factories/create-retrieve-pet-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function retrievePetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const params = paramsSchema.parse(request.params);

    const useCase = createRetrievePetUseCase();
    const pet = await useCase.execute(params.id);
    reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
