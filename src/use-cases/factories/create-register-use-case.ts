import { RegisterUseCase } from '../organization/register.use-case';
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository';

export function createRegisterUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository();
  const registerUseCase = new RegisterUseCase(organizationRepository);

  return registerUseCase;
}
