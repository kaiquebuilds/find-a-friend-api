import { OrganizationsRepository } from '@/repositories/organizations.repository';
import { hash } from 'bcryptjs';
import { EmailAlreadyTakenError } from '../errors/email-already-taken.error';

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
    const passwordHash = await hash(password, 6);

    const organizationWithSameEmail =
      await this.organizationsRepository.getByEmail(email);

    if (organizationWithSameEmail) {
      throw new EmailAlreadyTakenError();
    }

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
  }
}
