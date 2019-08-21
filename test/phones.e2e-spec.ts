import 'jest';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

import { PhonesModule } from '../src/phones/phones.module';
import { Phone } from '../src/phones/phone.entity';
import { phones } from '../src/phones/phones.fixtures';

const phonesRepositoryMock = {
  find: jest.fn(() => Promise.resolve(phones)),
  findOneOrFail: jest.fn(id => Promise.resolve(phones.find(p => p.id === id))),
  save: jest.fn(phone => Promise.resolve(phone)),
  remove: jest.fn(phone => Promise.resolve(phone)),
};

describe('PhonesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [PhonesModule],
    })
      .overrideProvider(getRepositoryToken(Phone))
      .useValue(phonesRepositoryMock)
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    phonesRepositoryMock.find.mockClear();
    phonesRepositoryMock.findOneOrFail.mockClear();
    phonesRepositoryMock.save.mockClear();
    phonesRepositoryMock.remove.mockClear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) - should get all phones', async () => {
    return request(app.getHttpServer())
      .get('/phones')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(phones);
      });
  });

  it('/ (POST) - should add a phone', async () => {
    const phone = new Phone(4, 'Nokia', '1110', 'blue', {});
    return request(app.getHttpServer())
      .post('/phones')
      .set('Accept', 'application/json')
      .send(phone)
      .expect(201)
      .then(res => {
        expect(res.body).toEqual(phone);
      });
  });

  it('/:id (PUT) - should update a phone', async () => {
    const phone1 = { ...phones[0], name: 'SAMSUNG' };
    return request(app.getHttpServer())
      .put(`/phones/${phone1.id}`)
      .set('Accept', 'application/json')
      .send(phone1)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(phone1);
      });
  });

  it('/:id (DELETE) - delete a phone', () => {
    const phone1 = phones[0];
    return request(app.getHttpServer())
      .delete(`/phones/${phone1.id}`)
      .set('Accept', 'application/json')
      .expect(204);
  });
});
