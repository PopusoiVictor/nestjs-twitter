import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTweetDto } from '../dto/update-tweet.dto';
import { REGEX_UUID_VALIDATION } from 'src/constants';
import { TweetService } from '../services/tweet.service';
import { UpdateTweetDto } from '../dto/create-tweet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tweets')
@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post('/')
  async create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(createTweetDto);
  }

  @Get('/')
  async getAll() {
    return this.tweetService.getAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  async getById(@Param('id') id: string) {
    return this.tweetService.getById(id);
  }

  @Put(`/:id(${REGEX_UUID_VALIDATION})`)
  async update(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.update(id, updateTweetDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  async remove(@Param('id') id: string) {
    return this.tweetService.remove(id);
  }
}
