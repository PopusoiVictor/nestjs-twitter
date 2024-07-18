import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTweetDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(160)
  content: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isArchived: boolean;
}
