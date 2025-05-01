import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUseCase } from './register.use-case';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations.repository';
import { OrganizationsRepository } from '@/repositories/organizations.repository';
import { EmailAlreadyTakenError } from '../errors/email-already-taken.error';
import { compare } from 'bcryptjs';

describe('Register Use Case', () => {
  let organizationsRepository: OrganizationsRepository;
  let sut: RegisterUseCase;

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterUseCase(organizationsRepository);
  });

  it('should create an organization', async () => {
    const result = await sut.execute({
      address: 'sample address',
      email: 'johndoe@example.com',
      name: 'JS Organization',
      owner: 'John Doe',
      password: '123456',
      phone: '(99) 9 9999-9999',
      zipCode: '55555-555',
    });

    expect(result.id).toEqual(expect.any(String));
  });

  it('should hash the provided password', async () => {
    const result = await sut.execute({
      address: 'sample address',
      email: 'johndoe@example.com',
      name: 'JS Organization',
      owner: 'John Doe',
      password: '123456',
      phone: '(99) 9 9999-9999',
      zipCode: '55555-555',
    });

    // TODO: Find a better way to test this. Spy + DI maybe?
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      result.passwordHash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not create an organization with repeated email', async () => {
    const result = await sut.execute({
      address: 'sample address',
      email: 'johndoe@example.com',
      name: 'JS Organization',
      owner: 'John Doe',
      password: '123456',
      phone: '(99) 9 9999-9999',
      zipCode: '55555-555',
    });

    await expect(
      sut.execute({
        address: 'sample address',
        email: 'johndoe@example.com',
        name: 'JS Organization',
        owner: 'John Doe',
        password: '123456',
        phone: '(99) 9 9999-9999',
        zipCode: '55555-555',
      }),
    ).rejects.toThrow(EmailAlreadyTakenError);

    expect(result.id).toEqual(expect.any(String));
  });
});
