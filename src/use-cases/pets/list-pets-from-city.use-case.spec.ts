import { describe, expect, it } from 'vitest';
import { ListPetsFromCityUseCase } from './list-pets-from-city.use-case';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository';

describe('List Pets From City Use Case', () => {
  it('should return a list of pets belonging to city', async () => {
    const repository = new InMemoryPetsRepository();
    await repository.create({
      name: 'Rex',
      adoptionRequirements: ['Must not live in an apartment'],
      age: 'ADULT',
      city: 'Rio de Janeiro',
      state: 'RJ',
      energyLevel: 'MEDIUM',
      independenceLevel: 'HIGH',
      requiredSpace: 'MEDIUM',
      size: 'BIG',
      pictureUrls: ['http://path.to/picture.png'],
      organizationId: 'organization1',
    });
    await repository.create({
      name: 'Fluffy',
      adoptionRequirements: ['Must not live in an apartment'],
      age: 'ADULT',
      city: 'Sao Paulo',
      state: 'SP',
      energyLevel: 'MEDIUM',
      independenceLevel: 'HIGH',
      requiredSpace: 'MEDIUM',
      size: 'BIG',
      pictureUrls: ['http://path.to/picture.png'],
      organizationId: 'organization1',
    });

    const sut = new ListPetsFromCityUseCase(repository);

    const result = await sut.execute('Rio de Janeiro');
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          city: 'Rio de Janeiro',
        }),
      ]),
    );

    expect(result).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          city: 'Sao Paulo',
        }),
      ]),
    );
  });
});
