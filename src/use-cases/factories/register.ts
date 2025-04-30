import { Organization, Prisma } from 'generated/prisma';
import { RegisterUseCase } from '../organization/register';
import { PrismaOrganizationsRepository } from '@/repositories/prismaOrganizations.repository';

export function createRegisterUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository();
  const registerUseCase = new RegisterUseCase(organizationRepository);

  return registerUseCase;
}
