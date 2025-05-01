import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error';
import { createCreatePetUseCase } from '@/use-cases/factories/create-create-pet.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerSchema = z.object({
      name: z.string(),
      about: z.string().optional(),
      age: z.enum(['PUPPY', 'ADULT']),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
      energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      requiredSpace: z.enum(['SMALL', 'MEDIUM', 'BIG']),
      pictureUrls: z.array(z.string()),
      adoptionRequirements: z.array(z.string()),
      city: z.string(),
      state: z.string(),
      organizationId: z.string(),
    });

    const data = registerSchema.parse(request.body);

    const createPetUseCase = createCreatePetUseCase();
    const pet = await createPetUseCase.execute(data);

    reply.status(201).send(pet);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
