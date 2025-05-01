import { Organization, Prisma } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { OrganizationsRepository } from '../organizations.repository';

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  private readonly organizations: Organization[] = [];

  create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = { ...data, id: randomUUID() };

    this.organizations.push(organization);

    return Promise.resolve(organization);
  }
  getByEmail(email: string): Promise<Organization | null> {
    const organization = this.organizations.find((o) => o.email === email);
    if (!organization) {
      return Promise.resolve(null);
    }

    return Promise.resolve(organization);
  }

  getById(id: string): Promise<Organization | null> {
    const organization = this.organizations.find((o) => o.id === id);
    if (!organization) {
      return Promise.resolve(null);
    }

    return Promise.resolve(organization);
  }
}
