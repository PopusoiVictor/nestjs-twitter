import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTweetDto {
  @ApiPropertyOptional({
    description: 'Content of the tweet.',
    maxLength: 160,
    example: 'This is an updated tweet content.',
  })
  @IsString({ message: 'Content must be a string.' })
  @IsOptional()
  @MaxLength(160, { message: 'Content must be at most 160 characters long.' })
  content?: string;

  @ApiPropertyOptional({
    description: 'Whether the tweet is archived or not.',
    example: false,
  })
  @IsBoolean({ message: 'isArchived must be a boolean.' })
  @IsOptional()
  isArchived?: boolean;
}
