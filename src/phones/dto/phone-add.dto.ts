import { IsString, IsDefined, IsNotEmpty, MaxLength } from 'class-validator';

export class PhoneAddDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  type: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  serial: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  color: string;

  @IsDefined()
  @IsNotEmpty()
  metadata: object;
}
