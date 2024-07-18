import { CreateTweetDto } from '../dto/update-tweet.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { UpdateTweetDto } from '../dto/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(private prisma: PrismaService) {}

  async create(createTweetDto: CreateTweetDto) {
    return this.prisma.tweet.create({ data: createTweetDto });
  }

  async getAll() {
    return this.prisma.tweet.findMany({
      where: { isArchived: false },
      include: { comments: true },
    });
  }

  async getById(id: string) {
    return this.prisma.tweet.findUnique({
      where: { id },
      include: { comments: true },
    });
  }

  async update(id: string, updateTweetDto: UpdateTweetDto) {
    return this.prisma.tweet.update({
      where: { id },
      data: updateTweetDto,
    });
  }

  async remove(id: string) {
    return this.prisma.tweet.update({
      where: { id },
      data: { isArchived: true },
    });
  }
}
