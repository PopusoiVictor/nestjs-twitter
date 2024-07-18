import prettify from 'src/common/prettify';
import { Comment } from '@prisma/client';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { ERROR_MESSAGES } from 'src/constants';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      return await this.prisma.comment.create({ data: createCommentDto });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAll(): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany();

      return prettify(comments);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getById(id: string): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        throw new HttpException(
          ERROR_MESSAGES.commentNotFound,
          HttpStatus.NOT_FOUND,
        );
      }

      return prettify(comment);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        throw new HttpException(
          ERROR_MESSAGES.commentNotFound,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        throw new HttpException(
          ERROR_MESSAGES.commentNotFound,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
