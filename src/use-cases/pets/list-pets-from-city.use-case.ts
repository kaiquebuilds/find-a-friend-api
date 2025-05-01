import { PetsRepository } from '@/repositories/pets.repository';

export class ListPetsFromCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(city: string, query?: string) {
    return this.petsRepository.getAllByCity(city, query);
  }
}
