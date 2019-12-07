import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class PhonesGetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  serial?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  color?: string;
}
