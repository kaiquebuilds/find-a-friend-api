import { beforeEach, describe, expect, it } from 'vitest';
import { RetrievePetUseCase } from './retireve-pet.use-case';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';
import { PetsRepository } from '@/repositories/pets.repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository';

let sut: RetrievePetUseCase;
let petsRepository: PetsRepository;

describe('Retrieve Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new RetrievePetUseCase(petsRepository);
  });

  it('should retrieve a pet', async () => {
    const createdPet = await petsRepository.create({
      name: 'Rex',
      age: 'ADULT',
      city: 'Sao Paulo',
      state: 'SP',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
      organizationId: '1',
      requiredSpace: 'BIG',
      size: 'BIG',
    });
    const result = await sut.execute(createdPet.id);
    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toEqual('Rex');
  });

  it('should not retrieve a pet given a nonexistent id', async () => {
    await expect(sut.execute('123')).rejects.toThrow(ResourceNotFoundError);
  });
});
