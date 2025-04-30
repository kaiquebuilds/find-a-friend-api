import { prisma } from '@/lib/prisma';
import { Prisma } from 'generated/prisma';

export class PrismaOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }
}
