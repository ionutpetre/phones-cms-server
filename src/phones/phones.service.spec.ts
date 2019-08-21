import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PhonesService } from './phones.service';
import { PhoneDto } from './phone.dto';
import { Phone } from './phone.entity';
import { phones } from './phones.fixtures';

const phonesRepositoryMock = {
  find: jest.fn(() => Promise.resolve(phones)),
  findOneOrFail: jest.fn(id => Promise.resolve(phones.find(p => p.id === id))),
  save: jest.fn(phone => Promise.resolve(phone)),
  remove: jest.fn(phone => Promise.resolve(phone)),
};

describe('PhonesService', () => {
  let phonesService: PhonesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PhonesService,
        {
          provide: getRepositoryToken(Phone),
          useValue: phonesRepositoryMock,
        },
      ],
    }).compile();
    phonesService = module.get<PhonesService>(PhonesService);
  });

  beforeEach(() => {
    phonesRepositoryMock.find.mockClear();
    phonesRepositoryMock.findOneOrFail.mockClear();
    phonesRepositoryMock.remove.mockClear();
    phonesRepositoryMock.save.mockClear();
  });

  it('should be defined', () => {
    expect(phonesService).toBeDefined();
  });

  describe('getAll method', () => {
    it('should call repostiory find method', async () => {
      const results = await phonesService.getAll();
      expect(phonesRepositoryMock.find).toHaveBeenCalled();
      expect(results).toEqual(phones);
    });
  });

  describe('getById method', () => {
    it('should call findOneOrFail method with expected id', async () => {
      expect(await phonesService.getById(phones[0].id)).toBeInstanceOf(Phone);
      expect(phonesRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        phones[0].id,
      );
    });
  });

  describe('add method', () => {
    it('should call create method with expected dto', async () => {
      const phoneDto: PhoneDto = {
        type: '',
        serial: '',
        color: '',
        metadata: {},
      };
      const phoneToAdd: Phone = { id: undefined, ...phoneDto };
      expect(await phonesService.add(phoneDto)).toEqual(phoneToAdd);
      expect(phonesRepositoryMock.save).toHaveBeenCalledWith(phoneToAdd);
    });
  });

  describe('update method', () => {
    it('should call getById method and save method with expected dto', async () => {
      const phoneToUpdate: Phone = phones[0];
      const phoneDto: PhoneDto = { ...phoneToUpdate };
      expect(await phonesService.update(phoneToUpdate.id, phoneDto)).toEqual(
        phoneToUpdate,
      );
      expect(phonesRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        phoneToUpdate.id,
      );
      expect(phonesRepositoryMock.save).toHaveBeenCalledWith(phoneToUpdate);
    });
  });

  describe('delete method', () => {
    it('should call findOneOrFail method and remove method', async () => {
      const phoneToDelete: Phone = phones[1];
      expect(await phonesService.delete(phoneToDelete.id)).toEqual(
        phoneToDelete,
      );
      expect(phonesRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        phoneToDelete.id,
      );
      expect(phonesRepositoryMock.remove).toHaveBeenCalledWith(phoneToDelete);
    });
  });
});
