import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhoneRepository } from './phone.repository';
import { PhonesController } from './phones.controller';
import { PhonesService } from './phones.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneRepository])],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhonesModule {}
