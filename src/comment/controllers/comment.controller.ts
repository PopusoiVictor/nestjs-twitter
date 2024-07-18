import { CommentService } from '../services/comment.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { REGEX_UUID_VALIDATION } from 'src/constants';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get('/')
  async findAll() {
    return this.commentService.getAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  async getById(@Param('id') id: string) {
    return this.commentService.getById(id);
  }

  @Put(`/:id(${REGEX_UUID_VALIDATION})`)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  async remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
