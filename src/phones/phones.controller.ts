import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

import { AppEndpoints } from './../app.constants';
import { AppLogger } from './../app.logger';
import { Phone } from './phone.entity';
import { PhonesGetDto } from './dto/phones-get-dto';
import { PhoneAddDto } from './dto/phone-add.dto';
import { PhoneUpdateDto } from './dto/phone-update.dto';
import { PhonesService } from './phones.service';

@Controller(AppEndpoints.PHONES)
export class PhonesController {
  private readonly logger: AppLogger;

  constructor(private readonly phonesService: PhonesService) {
    this.logger = new AppLogger(PhonesController.name);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  getByQuery(@Query() query: PhonesGetDto): Promise<Phone[]> {
    this.logger.logJson('Get phones by query', query);
    return this.phonesService.getByQuery(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', new ParseIntPipe()) id: number): Promise<Phone> {
    this.logger.log(`Get phone with id ${id}`);
    return this.phonesService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  add(@Body() phoneDto: PhoneAddDto): Promise<Phone> {
    this.logger.logJson('Add phone', phoneDto);
    return this.phonesService.add(phoneDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() phoneDto: PhoneUpdateDto,
  ): Promise<Phone> {
    this.logger.logJson('Update phone', phoneDto);
    return this.phonesService.update(id, phoneDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<Phone> {
    this.logger.log(`Delete phone with id ${id}`);
    return this.phonesService.delete(id);
  }
}
