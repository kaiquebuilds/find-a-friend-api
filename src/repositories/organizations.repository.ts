import { Organization, Prisma } from 'generated/prisma';

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}
