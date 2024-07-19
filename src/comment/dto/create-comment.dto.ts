import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment.',
    maxLength: 160,
    example: 'This is a comment content.',
  })
  @IsString({ message: 'Content must be a string.' })
  @IsNotEmpty({ message: 'Content should not be empty.' })
  @MaxLength(160, { message: 'Content must be at most 160 characters long.' })
  content: string;

  @ApiProperty({
    description: 'ID of the associated tweet.',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6.',
  })
  @IsString({ message: 'Tweet ID must be a string.' })
  @IsNotEmpty({ message: 'Tweet ID should not be empty.' })
  tweetId: string;
}
