import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClassFromExist } from 'class-transformer';

import { Phone } from './phone.entity';
import { PhoneDto } from './phone.dto';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  async getAll(): Promise<Phone[]> {
    return await this.phoneRepository.find();
  }

  async getById(id: number): Promise<Phone> {
    return await this.phoneRepository.findOneOrFail(id);
  }

  async add(phoneDto: PhoneDto): Promise<Phone> {
    const phone = new Phone();
    const phoneToAdd: Phone = plainToClassFromExist(phone, phoneDto);
    return await this.phoneRepository.save(phoneToAdd);
  }

  async update(id: number, phoneDto: PhoneDto): Promise<Phone> {
    const phone: Phone = await this.getById(id);
    const phoneToUpdate: Phone = plainToClassFromExist(phone, phoneDto);
    return this.phoneRepository.save(phoneToUpdate);
  }

  async delete(id: number): Promise<Phone> {
    const phone: Phone = await this.getById(id);
    return this.phoneRepository.remove(phone);
  }
}
