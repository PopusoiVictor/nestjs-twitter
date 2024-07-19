import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({
    description: 'The content of the tweet.',
    maxLength: 160,
    example: 'This is a tweet content.',
  })
  @IsString({ message: 'Content must be a string.' })
  @IsNotEmpty({ message: 'Content should not be empty.' })
  @MaxLength(160, { message: 'Content is too long.' })
  content: string;
}
