import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  title?: string;
}
