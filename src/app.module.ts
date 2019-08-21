import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhonesModule } from './phones/phones.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PhonesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
