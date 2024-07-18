import { Module } from '@nestjs/common';
import { TweetModule } from './tweet/tweet.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TweetModule,
    CommentModule,
  ],
})

export class AppModule {}
