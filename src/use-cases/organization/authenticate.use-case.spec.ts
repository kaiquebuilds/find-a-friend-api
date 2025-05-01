import { describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate.use-case';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations.repository';
import { hash } from 'bcryptjs';

let organizationsRepository = new InMemoryOrganizationsRepository();

describe('Authenticate Use Case', () => {
  it('should authenticate a user', async () => {
    // TODO: This test knows I'm using bcrypt under the hood. The dependency should be removed

    await organizationsRepository.create({
      address: 'sample address',
      email: 'johndoe@example.com',
      name: 'JS Organization',
      owner: 'John Doe',
      passwordHash: await hash('123456', 6),
      phone: '(99) 9 9999-9999',
      zipCode: '55555-555',
    });

    const authenticateUseCase = new AuthenticateUseCase(
      organizationsRepository,
    );
    const result = authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(result).resolves.toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
        passwordHash: expect.any(String),
      }),
    );
  });

  it("should not authenticate a user if email doesn't exist", async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository();
    const authenticateUseCase = new AuthenticateUseCase(
      organizationsRepository,
    );

    await expect(
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should not authenticate a user if password is wrong', async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    await organizationsRepository.create({
      address: 'sample address',
      email: 'johndoe@example.com',
      name: 'JS Organization',
      owner: 'John Doe',
      passwordHash: 'hashed-password',
      phone: '(99) 9 9999-9999',
      zipCode: '55555-555',
    });

    const authenticateUseCase = new AuthenticateUseCase(
      organizationsRepository,
    );

    await expect(
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
