import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Logger,
  LoggerService,
} from '@nestjs/common';

import { PhonesService } from './phones.service';
import { Phone } from './phone.entity';
import { PhoneDto } from './phone.dto';

@Controller('phones')
export class PhonesController {
  private readonly logger: LoggerService;

  constructor(private readonly phonesService: PhonesService) {
    this.logger = new Logger(PhonesController.name);
  }

  @Get()
  async getAll(): Promise<Phone[]> {
    this.logger.log('Get all phones');
    return await this.phonesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Phone> {
    this.logger.log('Get phone by id');
    return await this.phonesService.getById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async add(@Body() phoneDto: PhoneDto): Promise<Phone> {
    this.logger.log(`Add a new phone ${JSON.stringify(phoneDto)}`);
    return this.phonesService.add(phoneDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async update(
    @Param('id') id: number,
    @Body() phoneDto: PhoneDto,
  ): Promise<Phone> {
    this.logger.log(`Update phone id ${id} with ${JSON.stringify(phoneDto)}`);
    return this.phonesService.update(id, phoneDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<Phone> {
    this.logger.log(`Delete phone id ${id}`);
    return this.phonesService.delete(id);
  }
}
