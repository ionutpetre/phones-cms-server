import {
  IsInt,
  IsString,
  IsOptional,
  IsDefined,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class PhoneUpdateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  type?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  serial?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  color?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  metadata?: object;
}
