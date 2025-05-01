import { beforeEach, describe, expect, it } from 'vitest';
import { RetrievePetUseCase } from './retireve-pet.use-case';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

let sut: RetrievePetUseCase;

describe('Retrieve Pet Use Case', () => {
  beforeEach(() => {
    sut = new RetrievePetUseCase();
  });

  it('should retrieve a pet', async () => {
    const result = await sut.execute();
    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toEqual('Rex');
  });

  it('should not retrieve a pet given a nonexistent id', async () => {
    await expect(sut.execute()).rejects.toThrow(ResourceNotFoundError);
  });
});
