import { RegisterUseCase } from '../organization/register.use-case';
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository';

export function createRegisterUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const registerUseCase = new RegisterUseCase(organizationsRepository);

  return registerUseCase;
}
