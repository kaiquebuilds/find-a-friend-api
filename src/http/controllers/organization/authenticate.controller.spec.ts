import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com';
    const password = '123456';

    const user = await request(app.server).post('/users').send({
      email,
      password,
      name: 'Organization 1',
      owner: 'John Doe',
      zipCode: '44444444',
      phone: '99999999999',
      address: 'Rua A, Casa B',
    });

    const response = await request(app.server).post('/session').send({
      email,
      password,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toEqual(expect.any(String));
  });
});
