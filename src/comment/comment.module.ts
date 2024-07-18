import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
