import { Prisma, Pet } from 'generated/prisma';
import { PetsRepository } from '../pets.repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }

  async getById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } });
    return pet;
  }

  getAllByCity(city: string, query?: string): Promise<Pet[]> {
    return prisma.pet.findMany({
      where: {
        city,
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            about: {
              contains: query,
            },
          },
        ],
      },
    });
  }
}
