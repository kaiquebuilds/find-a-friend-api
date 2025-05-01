import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository';
import { ListPetsFromCityUseCase } from '../pets/list-pets-from-city.use-case';

export function createListPetsFromCityUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new ListPetsFromCityUseCase(petsRepository);
  return useCase;
}
