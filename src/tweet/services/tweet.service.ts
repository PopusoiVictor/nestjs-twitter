import prettify from '../../common/prettify';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { ERROR_MESSAGES } from '../../constants';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { Tweet } from '@prisma/client';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(private prisma: PrismaService) {}

  private tweetSelect = {
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
  };

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    try {
      const tweet = await this.prisma.tweet.create({
        data: createTweetDto,
        select: this.tweetSelect,
      });

      return prettify(tweet);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while creating the tweet.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll(): Promise<Omit<Tweet[], 'isArchived'>> {
    try {
      const tweets = await this.prisma.tweet.findMany({
        where: { deletedAt: null },
        select: this.tweetSelect,
      });

      return prettify(tweets);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while retrieving the tweets.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getById(id: string): Promise<Tweet> {
    try {
      const tweet = await this.prisma.tweet.findUnique({
        where: { id, deletedAt: null },
        select: this.tweetSelect,
      });

      if (!tweet) {
        throw new HttpException(
          ERROR_MESSAGES.tweetNotFound,
          HttpStatus.NOT_FOUND,
        );
      }

      return prettify(tweet);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while retrieving the tweet.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateTweetDto: UpdateTweetDto): Promise<Tweet> {
    try {
      await this.validateTweetExists(id);

      const updatedTweet = await this.prisma.tweet.update({
        where: { id },
        data: updateTweetDto,
        select: this.tweetSelect,
      });

      return prettify(updatedTweet);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while updating the tweet.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<Tweet> {
    try {
      await this.validateTweetExists(id);

      const softDeletedTweet = await this.prisma.tweet.update({
        where: { id },
        data: { deletedAt: new Date() },
        select: this.tweetSelect,
      });

      return prettify(softDeletedTweet);
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while deleting the tweet.',
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
}
