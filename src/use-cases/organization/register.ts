import { OrganizationsRepository } from '@/repositories/organizations.repository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseInput {
  name: string;
  owner: string;
  email: string;
  zipCode: string;
  address: string;
  phone: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    owner,
    email,
    zipCode,
    address,
    phone,
    password,
  }: RegisterUseCaseInput) {
    try {
      const passwordHash = await hash(password, 6);

      const organization = await this.organizationsRepository.create({
        name,
        owner,
        email,
        zipCode,
        address,
        phone,
        passwordHash,
      });

      return organization;
    } catch (error) {
      throw error;
    }
  }
}
