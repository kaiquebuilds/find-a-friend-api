import { OrganizationsRepository } from '@/repositories/organizations.repository';
import { PetsRepository } from '@/repositories/pets.repository';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

type Age = 'PUPPY' | 'ADULT';
type Size = 'SMALL' | 'MEDIUM' | 'BIG';
type IndependenceLevel = 'LOW' | 'MEDIUM' | 'HIGH';
type EnergyLevel = 'LOW' | 'MEDIUM' | 'HIGH';
type RequiredSpace = 'SMALL' | 'MEDIUM' | 'BIG';

interface CreatePetUseCaseInput {
  name: string;
  about?: string;
  age: Age;
  size: Size;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  requiredSpace: RequiredSpace;
  pictureUrls: string[];
  adoptionRequirements: string[];
  city: string;
  state: string;
  organizationId: string;
}

export class CreatePetUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute(data: CreatePetUseCaseInput) {
    const organization = await this.organizationsRepository.getById(
      data.organizationId,
    );
    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create(data);
    return pet;
  }
}
