import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/services/prisma.service';

describe('CommentService', () => {
  let app;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prismaService.comment.deleteMany({});
  });

  it('/comments (POST) - create a new comment', async () => {
    const createCommentDto = { tweetId: '1', content: 'Test comment content' };

    const res = await request(app.getHttpServer())
      .post('/comments')
      .send(createCommentDto)
      .expect(HttpStatus.CREATED);

    expect(res.body.content).toBe(createCommentDto.content);
    expect(res.body.id).toBeDefined();
  });

  it('/comments (GET) - get all comments', async () => {
    const createCommentDto = { tweetId: '1', content: 'Test comment content' };
    await prismaService.comment.create({ data: createCommentDto });

    const res = await request(app.getHttpServer())
      .get('/comments')
      .expect(HttpStatus.OK);

    expect(res.body.length).toBe(1);
    expect(res.body[0].content).toBe(createCommentDto.content);
  });

  it('/comments/:id (GET) - get a specific comment by id', async () => {
    const createCommentDto = { tweetId: '1', content: 'Test comment content' };
    const createdComment = await prismaService.comment.create({
      data: createCommentDto,
    });

    const res = await request(app.getHttpServer())
      .get(`/comments/${createdComment.id}`)
      .expect(HttpStatus.OK);

    expect(res.body.content).toBe(createCommentDto.content);
    expect(res.body.id).toBe(createdComment.id);
  });

  it('/comments/:id (GET) - return 404 if comment is not found', async () => {
    const nonExistentCommentId = 'nonexistent-id';

    await request(app.getHttpServer())
      .get(`/comments/${nonExistentCommentId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
