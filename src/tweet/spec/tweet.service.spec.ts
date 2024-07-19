import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('TweetService', () => {
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
    await prismaService.tweet.deleteMany({});
  });

  it('/tweets (POST) - create a new tweet', async () => {
    const createTweetDto = { content: 'Test tweet content' };

    const res = await request(app.getHttpServer())
      .post('/tweets')
      .send(createTweetDto)
      .expect(HttpStatus.CREATED);

    expect(res.body.content).toBe(createTweetDto.content);
    expect(res.body.id).toBeDefined();
  });

  it('/tweets (GET) - get all tweets', async () => {
    const createTweetDto = { content: 'Test tweet content' };
    await prismaService.tweet.create({ data: createTweetDto });

    const res = await request(app.getHttpServer())
      .get('/tweets')
      .expect(HttpStatus.OK);

    expect(res.body.length).toBe(1);
    expect(res.body[0].content).toBe(createTweetDto.content);
  });

  it('/tweets/:id (GET) - get a specific tweet by id', async () => {
    const createTweetDto = { content: 'Test tweet content' };
    const createdTweet = await prismaService.tweet.create({
      data: createTweetDto,
    });

    const res = await request(app.getHttpServer())
      .get(`/tweets/${createdTweet.id}`)
      .expect(HttpStatus.OK);

    expect(res.body.content).toBe(createTweetDto.content);
    expect(res.body.id).toBe(createdTweet.id);
  });

  it('/tweets/:id (GET) - return 404 if tweet is not found', async () => {
    const nonExistentTweetId = 'nonexistent-id';

    await request(app.getHttpServer())
      .get(`/tweets/${nonExistentTweetId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
