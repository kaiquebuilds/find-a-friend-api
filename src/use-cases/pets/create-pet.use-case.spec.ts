import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetUseCase } from './create-pet.use-case';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations.repository';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';
import { hash } from 'bcryptjs';

let createPetUseCase: CreatePetUseCase;
let organizationsRepository: InMemoryOrganizationsRepository;

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    const petsRepository = new InMemoryPetsRepository();
    createPetUseCase = new CreatePetUseCase(
      organizationsRepository,
      petsRepository,
    );
  });

  it('should create a new pet', async () => {
    const organization = await organizationsRepository.create({
      name: 'Organization 1',
      address: 'Address',
      email: 'johndoe@example.com',
      owner: 'John Doe',
      passwordHash: await hash('123456', 6),
      phone: '55555555555',
      zipCode: '9999999',
    });

    const result = await createPetUseCase.execute({
      name: 'Rex',
      adoptionRequirements: ['Must not live in an apartment'],
      age: 'ADULT',
      city: 'New York',
      state: 'NY',
      energyLevel: 'MEDIUM',
      independenceLevel: 'HIGH',
      requiredSpace: 'MEDIUM',
      size: 'BIG',
      pictureUrls: ['http://path.to/picture.png'],
      organizationId: organization.id,
    });
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Rex',
      }),
    );
  });

  it('should not create new pet if organizationId is invalid', async () => {
    await expect(
      createPetUseCase.execute({
        name: 'Rex',
        adoptionRequirements: ['Must not live in an apartment'],
        age: 'ADULT',
        city: 'New York',
        state: 'NY',
        energyLevel: 'MEDIUM',
        independenceLevel: 'HIGH',
        requiredSpace: 'MEDIUM',
        size: 'BIG',
        pictureUrls: ['http://path.to/picture.png'],
        organizationId: 'nonexistentid',
      }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
