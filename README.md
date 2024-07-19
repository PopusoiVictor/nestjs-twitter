# NestJS Twitter API

## Description

A bare-bones REST API that simulates Twitter’s tweets functionality using NestJS and Prisma.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

```bash
$ docker-compose -f docker-compose.dev.yml up -d
```

## Prisma

```bash
$ npx prisma migrate dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

API documentation is available at /api.
