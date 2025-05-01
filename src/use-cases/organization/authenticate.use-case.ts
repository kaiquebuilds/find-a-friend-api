import { OrganizationsRepository } from '@/repositories/organizations.repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

interface AuthenticateUseCaseInput {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ email, password }: AuthenticateUseCaseInput) {
    const organizationWithEmail =
      await this.organizationsRepository.getByEmail(email);
    if (!organizationWithEmail) {
      throw new InvalidCredentialsError();
    }
    return Promise.resolve(null);
  }
}
