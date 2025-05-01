import { Pet, Prisma } from 'generated/prisma';

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  getById(id: string): Promise<Pet | null>;
}
