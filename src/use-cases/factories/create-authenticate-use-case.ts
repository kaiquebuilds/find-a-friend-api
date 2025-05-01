import { AuthenticateUseCase } from '../organization/authenticate.use-case';
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository';

export function createAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository);

  return authenticateUseCase;
}
