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
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { REGEX_UUID_VALIDATION } from '../../constants';
import { Tweet } from '@prisma/client';
import { TweetService } from '../services/tweet.service';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

@ApiTags('Tweets')
@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post('/')
  async create(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.tweetService.create(createTweetDto);
  }

  @Get('/')
  async getAll(): Promise<Tweet[]> {
    return await this.tweetService.getAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  async getById(@Param('id') id: string): Promise<Tweet> {
    return await this.tweetService.getById(id);
  }

  @Put(`/:id(${REGEX_UUID_VALIDATION})`)
  async update(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    return await this.tweetService.update(id, updateTweetDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  async remove(@Param('id') id: string): Promise<Tweet> {
    return await this.tweetService.remove(id);
  }
}
