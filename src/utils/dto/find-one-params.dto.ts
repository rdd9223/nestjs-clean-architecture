import { IsNumberString } from 'class-validator';

export class FindOneParamsDto {
  @IsNumberString()
  id: string;
}
