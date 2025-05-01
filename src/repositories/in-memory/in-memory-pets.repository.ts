import { Prisma, Pet } from 'generated/prisma';
import { PetsRepository } from '../pets.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPetsRepository implements PetsRepository {
  private readonly pets: Pet[] = [];

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

  getById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((p) => p.id === id);
    if (!pet) {
      return Promise.resolve(null);
    }

    return Promise.resolve(pet);
  }

  getAllByCity(city: string, q?: string): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => {
      if (pet.city !== city) {
        return false;
      }

      if (q) {
        if (
          pet.about?.includes(q) ||
          pet.name.includes(q) ||
          pet.adoptionRequirements.includes(q) ||
          pet.age.includes(q) ||
          pet.size.includes(q) ||
          pet.energyLevel.includes(q) ||
          pet.independenceLevel.includes(q) ||
          pet.requiredSpace.includes(q)
        ) {
          return true;
        }

        return false;
      }

      return true;
    });
    return Promise.resolve(pets);
  }
}
