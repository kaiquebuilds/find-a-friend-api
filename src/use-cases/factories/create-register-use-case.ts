import { Organization, Prisma } from 'generated/prisma';
import { RegisterUseCase } from '../organization/register.use-case';
import { PrismaOrganizationsRepository } from '@/repositories/prisma-organizations.repository';

export function createRegisterUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository();
  const registerUseCase = new RegisterUseCase(organizationRepository);

  return registerUseCase;
}
