import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository';
import { RetrievePetUseCase } from '../pets/retrieve-pet.use-case';

export function createRetrievePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new RetrievePetUseCase(petsRepository);
  return useCase;
}
