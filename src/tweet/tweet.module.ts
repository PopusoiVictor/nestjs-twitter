import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/services/prisma.service';
import { TweetController } from './controllers/tweet.controller';
import { TweetService } from './services/tweet.service';

@Module({
  controllers: [TweetController],
  providers: [TweetService, PrismaService],
})
export class TweetModule {}
