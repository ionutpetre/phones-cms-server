import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Phone } from './phone.entity';
import { PhoneAddDto } from './dto/phone-add.dto';
import { PhoneUpdateDto } from './dto/phone-update.dto';
import { PhonesService } from './phones.service';
import { phones } from './phones.fixtures';

const phonesRepositoryMock = {
  getPhones: jest.fn(() => Promise.resolve(phones)),
  findOneOrFail: jest.fn(id => Promise.resolve(phones.find(p => p.id === id))),
  savePhone: jest.fn(phone => Promise.resolve(phone)),
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
    phonesRepositoryMock.getPhones.mockClear();
    phonesRepositoryMock.findOneOrFail.mockClear();
    phonesRepositoryMock.remove.mockClear();
    phonesRepositoryMock.savePhone.mockClear();
  });

  it('should be defined', () => {
    expect(phonesService).toBeDefined();
  });

  describe('getByQuery method', () => {
    it('should call repository find method', async () => {
      const results = await phonesService.getByQuery({});
      expect(phonesRepositoryMock.getPhones).toHaveBeenCalled();
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
      const phoneDto: PhoneAddDto = {
        type: '',
        serial: '',
        color: '',
        metadata: {},
      };
      const phoneToAdd: Phone = { id: undefined, ...phoneDto };
      expect(await phonesService.add(phoneDto)).toEqual(phoneToAdd);
      expect(phonesRepositoryMock.savePhone).toHaveBeenCalledWith(phoneToAdd);
    });
  });

  describe('update method', () => {
    it('should call getById method and save method with expected dto', async () => {
      const phoneToUpdate: Phone = phones[0];
      const phoneDto: PhoneUpdateDto = { ...phoneToUpdate };
      expect(await phonesService.update(phoneToUpdate.id, phoneDto)).toEqual(
        phoneToUpdate,
      );
      expect(phonesRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        phoneToUpdate.id,
      );
      expect(phonesRepositoryMock.savePhone).toHaveBeenCalledWith(
        phoneDto,
        phoneToUpdate,
      );
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
