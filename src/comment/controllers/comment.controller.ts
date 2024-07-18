import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Comment } from '@prisma/client';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { REGEX_UUID_VALIDATION } from 'src/constants';
import { UpdateCommentDto } from '../dto/update-comment.dto';
@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentService.create(createCommentDto);
  }

  @Get('/')
  async getAll(): Promise<Comment[]> {
    return await this.commentService.getAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  async getById(@Param('id') id: string): Promise<Comment> {
    return await this.commentService.getById(id);
  }

  @Put(`/:id(${REGEX_UUID_VALIDATION})`)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  async remove(@Param('id') id: string): Promise<Comment> {
    return await this.commentService.remove(id);
  }
}
