import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Organization 1',
      owner: 'John Doe',
      email: 'johndoe@example.com',
      zipCode: '44444444',
      phone: '99999999999',
      address: 'Rua A, Casa B',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.id).toEqual(expect.any(String));
  });
});
