import { Injectable } from '@nestjs/common';

import { Phone } from './phone.entity';
import { PhonesGetDto } from './dto/phones-get-dto';
import { PhoneAddDto } from './dto/phone-add.dto';
import { PhoneUpdateDto } from './dto/phone-update.dto';
import { PhoneRepository } from './phone.repository';

@Injectable()
export class PhonesService {
  constructor(private readonly phoneRepository: PhoneRepository) {}

  getByQuery(query: PhonesGetDto): Promise<Phone[]> {
    return this.phoneRepository.getPhones(query);
  }

  getById(id: number): Promise<Phone> {
    return this.phoneRepository.findOneOrFail(id);
  }

  add(phoneDto: PhoneAddDto): Promise<Phone> {
    return this.phoneRepository.savePhone(phoneDto);
  }

  async update(id: number, phoneDto: PhoneUpdateDto): Promise<Phone> {
    const phone: Phone = await this.getById(id);
    return this.phoneRepository.savePhone(phoneDto, phone);
  }

  async delete(id: number): Promise<Phone> {
    const phone: Phone = await this.getById(id);
    return this.phoneRepository.remove(phone);
  }
}
