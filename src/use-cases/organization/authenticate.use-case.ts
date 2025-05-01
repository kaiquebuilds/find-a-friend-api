import { OrganizationsRepository } from '@/repositories/organizations.repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { compare } from 'bcryptjs';

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

    const doPasswordsMatch = await compare(
      password,
      organizationWithEmail.passwordHash,
    );
    if (!doPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    return Promise.resolve(null);
  }
}
