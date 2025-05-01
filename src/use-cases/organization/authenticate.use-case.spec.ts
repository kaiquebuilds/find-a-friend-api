import { describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate.use-case';

describe('Authenticate Use Case', () => {
  it('should authenticate a user', () => {
    const authenticateUseCase = new AuthenticateUseCase();
    const result = authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });
    expect(result).toHaveResolved();
  });
  it.todo("should not authenticate a user if email doesn't exist");
  it.todo('should not authenticate a user if password is wrong');
});
