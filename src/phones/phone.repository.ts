import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { plainToClassFromExist } from 'class-transformer';

import { Phone } from './phone.entity';
import { PhonesGetDto } from './dto/phones-get-dto';
import { PhoneAddDto } from './dto/phone-add.dto';
import { PhoneUpdateDto } from './dto/phone-update.dto';

@EntityRepository(Phone)
export class PhoneRepository extends Repository<Phone> {
  getPhones(query: PhonesGetDto): Promise<Phone[]> {
    const options: FindManyOptions<Phone> = { where: query };
    return this.find(options);
  }

  savePhone(
    phoneDto: PhoneAddDto | PhoneUpdateDto,
    phone: Phone = new Phone(),
  ): Promise<Phone> {
    const phoneToSave: Phone = plainToClassFromExist(phone, phoneDto);
    return this.save(phoneToSave);
  }
}
