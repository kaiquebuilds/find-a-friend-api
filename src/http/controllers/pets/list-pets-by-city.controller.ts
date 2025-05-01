import { createListPetsFromCityUseCase } from '@/use-cases/factories/create-list-pets-from-city-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function listPetsByCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const queryParamsSchema = z.object({
      city: z.string(),
      q: z.string().optional(),
    });

    const queryParams = queryParamsSchema.parse(request.query);

    const useCase = createListPetsFromCityUseCase();
    const pets = await useCase.execute(queryParams.city, queryParams.q);
    reply.status(200).send(pets);
  } catch (error) {
    throw error;
  }
}
