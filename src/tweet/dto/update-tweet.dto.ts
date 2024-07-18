import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(160)
  content: string;
}
