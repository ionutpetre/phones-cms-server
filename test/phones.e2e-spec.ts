import 'jest';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

import { AppEndpoints } from './../src/app.constants';
import { PhonesModule } from '../src/phones/phones.module';
import { Phone } from '../src/phones/phone.entity';
import { phones } from '../src/phones/phones.fixtures';

const phonesRepositoryMock = {
  getPhones: jest.fn(() => Promise.resolve(phones)),
  findOneOrFail: jest.fn(id => Promise.resolve(phones.find(p => p.id === id))),
  savePhone: jest.fn(phone => Promise.resolve(phone)),
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
    phonesRepositoryMock.getPhones.mockClear();
    phonesRepositoryMock.findOneOrFail.mockClear();
    phonesRepositoryMock.savePhone.mockClear();
    phonesRepositoryMock.remove.mockClear();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`${AppEndpoints.PHONES} (GET) - should get all phones`, () => {
    return request(app.getHttpServer())
      .get(AppEndpoints.PHONES)
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(phones);
      });
  });

  it(`${AppEndpoints.PHONES} (POST) - should add a phone`, () => {
    const phone = new Phone(4, 'Nokia', '1110', 'blue', {});
    return request(app.getHttpServer())
      .post(AppEndpoints.PHONES)
      .set('Accept', 'application/json')
      .send(phone)
      .expect(201)
      .then(res => {
        expect(res.body).toEqual(phone);
      });
  });

  it(`${AppEndpoints.PHONES}/:id (PUT) - should update a phone`, () => {
    const phone1 = { ...phones[0], name: 'SAMSUNG' };
    return request(app.getHttpServer())
      .put(`${AppEndpoints.PHONES}/${phone1.id}`)
      .set('Accept', 'application/json')
      .send(phone1)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(phone1);
      });
  });

  it(`${AppEndpoints.PHONES}/:id (DELETE) - should delete a phone`, () => {
    const phone1 = phones[0];
    return request(app.getHttpServer())
      .delete(`${AppEndpoints.PHONES}/${phone1.id}`)
      .set('Accept', 'application/json')
      .expect(204);
  });
});
