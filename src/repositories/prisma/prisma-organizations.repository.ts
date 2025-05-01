import { prisma } from '@/lib/prisma';
import { Organization, Prisma } from 'generated/prisma';
import { OrganizationsRepository } from '../organizations.repository';

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async getByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { email },
    });
    return organization;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }

  async getById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });
    return organization;
  }
}
