import { Prisma, Pet } from 'generated/prisma';
import { PetsRepository } from '../pets.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPetsRepository implements PetsRepository {
  private readonly pets: Partial<Pet>[] = [];

  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID().toString(),
      about: data.about ?? null,
      age: data.age,
      city: data.city,
      state: data.state,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      name: data.name,
      organizationId: data.organizationId,
      requiredSpace: data.requiredSpace,
      size: data.size,
      adoptionRequirements: data.adoptionRequirements as string[],
      pictureUrls: data.pictureUrls as string[],
    };
    this.pets.push(pet);

    return Promise.resolve(pet);
  }
}
