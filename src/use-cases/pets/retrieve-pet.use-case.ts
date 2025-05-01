import { PetsRepository } from '@/repositories/pets.repository';
import { Pet } from 'generated/prisma';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

export class RetrievePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(petId: string): Promise<Pet> {
    const pet = await this.petsRepository.getById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return pet;
  }
}
