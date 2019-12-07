import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppLogger } from './app.logger';
import { PhonesModule } from './phones/phones.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PhonesModule],
  providers: [AppLogger],
})
export class AppModule {}
