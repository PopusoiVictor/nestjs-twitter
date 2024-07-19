import prettify from '../../common/prettify';
import { Comment } from '@prisma/client';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { ERROR_MESSAGES } from '../../constants';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const { tweetId } = createCommentDto;

      await this.validateTweetExists(tweetId);

      const comment = await this.prisma.comment.create({
        data: createCommentDto,
      });

      return prettify(comment);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while creating the comment.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll(): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany();

      return prettify(comments);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while retrieving the comments.',
        error.status || HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        error.message || 'An error occurred while retrieving the comment.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      await this.validateCommentExists(id);

      const updatedComment = await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
      });

      return prettify(updatedComment);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while updating the comment.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<Comment> {
    try {
      await this.validateCommentExists(id);

      const hardDeletedComment = await this.prisma.comment.delete({
        where: { id },
      });

      return prettify(hardDeletedComment);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while deleting the comment.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async validateTweetExists(tweetId: string): Promise<void> {
    const tweet = await this.prisma.tweet.findUnique({
      where: { id: tweetId, deletedAt: null },
    });

    if (!tweet) {
      throw new HttpException(
        ERROR_MESSAGES.tweetNotFound,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private async validateCommentExists(commentId: string): Promise<void> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new HttpException(
        ERROR_MESSAGES.commentNotFound,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
