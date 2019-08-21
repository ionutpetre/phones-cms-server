import { Test, TestingModule } from '@nestjs/testing';
import { PhonesController } from './phones.controller';
import { PhoneDto } from './phone.dto';
import { Phone } from './phone.entity';
import { phones } from './phones.fixtures';

const phonesServiceMock = {
  getAll: jest.fn(() => Promise.resolve(phones)),
  getById: jest.fn(id => Promise.resolve(phones.find(p => p.id === id))),
  add: jest.fn(() => Promise.resolve(new Phone())),
  update: jest.fn(id => Promise.resolve(phones.find(p => p.id === id))),
  delete: jest.fn(id => Promise.resolve(phones.find(p => p.id === id))),
};

describe('PhonesController', () => {
  let phonesController: PhonesController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [PhonesController],
      providers: [
        {
          provide: 'PhonesService',
          useValue: phonesServiceMock,
        },
      ],
    }).compile();

    phonesController = module.get<PhonesController>(PhonesController);
  });

  it('should be defined', () => {
    expect(phonesController).toBeDefined();
  });

  it('should call getAll method', async () => {
    const results = await phonesController.getAll();
    expect(phonesServiceMock.getAll).toHaveBeenCalled();
    expect(results).toEqual(phones);
  });

  it('should call getById method', async () => {
    const result = await phonesController.getById(1);
    expect(phonesServiceMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(phones[0]);
  });

  it('should call add method with expected dto', async () => {
    const phoneDto: PhoneDto = {
      type: '',
      serial: '',
      color: '',
      metadata: {},
    };
    expect(await phonesController.add(phoneDto)).toBeInstanceOf(Phone);
    expect(phonesServiceMock.add).toHaveBeenCalledWith(phoneDto);
  });

  it('should call update method with expected id and dto', async () => {
    const phoneToUpdate: Phone = phones[0];
    const phoneDto: PhoneDto = { ...phoneToUpdate };
    expect(
      await phonesController.update(phoneToUpdate.id, phoneDto),
    ).toBeInstanceOf(Phone);
    expect(phonesServiceMock.update).toHaveBeenCalledWith(
      phoneToUpdate.id,
      phoneToUpdate,
    );
  });

  it('should call delete method with expected id', async () => {
    const phoneToDelete: Phone = phones[1];
    expect(await phonesController.delete(phoneToDelete.id)).toBeInstanceOf(
      Phone,
    );
    expect(phonesServiceMock.delete).toHaveBeenCalledWith(phoneToDelete.id);
  });
});
