import prettify from 'src/common/prettify';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { ERROR_MESSAGES } from 'src/constants';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Tweet } from '@prisma/client';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(private prisma: PrismaService) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    try {
      return await this.prisma.tweet.create({ data: createTweetDto });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAll(): Promise<Tweet[]> {
    try {
      const tweets = await this.prisma.tweet.findMany({
        where: { isArchived: false, deletedAt: null },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          comments: {
            select: {
              id: true,
              tweetId: true,
              content: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return prettify(tweets);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getById(id: string): Promise<Tweet> {
    try {
      const tweet = await this.prisma.tweet.findUnique({
        where: { id, deletedAt: null },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          comments: {
            select: {
              id: true,
              tweetId: true,
              content: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      if (!tweet) {
        throw new HttpException(
          ERROR_MESSAGES.tweetNotFound,
          HttpStatus.NOT_FOUND,
        );
      }

      return prettify(tweet);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateTweetDto: UpdateTweetDto): Promise<Tweet> {
    try {
      const tweet = await this.prisma.tweet.findUnique({
        where: { id, deletedAt: null },
      });

      if (!tweet) {
        throw new HttpException(
          ERROR_MESSAGES.tweetNotFound,
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.tweet.update({
        where: { id },
        data: updateTweetDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string): Promise<Tweet> {
    try {
      const tweet = await this.prisma.tweet.findUnique({
        where: { id, deletedAt: null },
      });

      if (!tweet) {
        throw new HttpException(
          ERROR_MESSAGES.tweetNotFound,
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.tweet.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
