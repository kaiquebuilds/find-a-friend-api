import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Retrieve Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should retrieve a pet', async () => {
    const email = 'johndoe@example.com';
    const password = '123456';
    const city = 'Rio de Janeiro';

    const registerResponse = await request(app.server).post('/users').send({
      email,
      password,
      name: 'Organization 1',
      owner: 'John Doe',
      zipCode: '44444444',
      phone: '99999999999',
      address: 'Rua A, Casa B',
    });

    const authenticateResponse = await request(app.server)
      .post('/session')
      .send({
        email,
        password,
      });

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
      .send({
        name: 'Rex',
        adoptionRequirements: ['Must not live in an apartment'],
        age: 'ADULT',
        city,
        state: 'RJ',
        energyLevel: 'MEDIUM',
        independenceLevel: 'HIGH',
        requiredSpace: 'MEDIUM',
        size: 'SMALL',
        pictureUrls: ['http://path.to/picture.png'],
        organizationId: registerResponse.body.id,
      });

    const response = await request(app.server)
      .get(`/pets?city=${city}&q=Rex`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Rex' })]),
    );
  });
});
