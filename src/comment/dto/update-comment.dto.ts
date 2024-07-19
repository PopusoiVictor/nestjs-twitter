import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Content of the comment.',
    maxLength: 160,
    example: 'This is the updated comment content.',
  })
  @IsString({ message: 'Content must be a string.' })
  @IsNotEmpty({ message: 'Content should not be empty.' })
  @MaxLength(160, { message: 'Content must be at most 160 characters long.' })
  content: string;
}
