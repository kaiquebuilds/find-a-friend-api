import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository';
import { CreatePetUseCase } from '../pets/create-pet.use-case';
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository';

export function createCreatePetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const petsRepository = new PrismaPetsRepository();
  const useCase = new CreatePetUseCase(organizationsRepository, petsRepository);
  return useCase;
}
