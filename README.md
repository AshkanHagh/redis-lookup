# Speed Search

## Introduction

Speed Search is a high-performance search service built on Redis using Upstash. It provides methods for adding, ranking, and querying sorted sets, as well as populating the database with structured data for fast and efficient search operations. The service is built with [TypeScript](https://www.typescriptlang.org/) and uses [Upstash Redis](https://upstash.com/).

## Features

- **Sorted Set Operations**: Supports adding members to sorted sets, retrieving ranks, and querying ranges.
- **Database Population**: Easily populate Redis with structured data.
- **Search Functionality**: Perform searches with ranking and range queries.

## Installation

### Install Package
```shell
npm install redis-search
```

## Examples

### Populate redis
```typescript
import { RedisClient } from 'redis-search'

RedisClient.configure('your upstash redis url', 'your upstash redis token');
const redisClient = RedisClient.getInstance();

const populate = async () => {
    const data : string[] = [...];
    await redisClient.populateDB('your key', data);
};
```

### Search in redis
```typescript
import { RedisClient } from 'redis-search'

RedisClient.configure('your upstash redis url', 'your upstash redis token');
const redisClient = RedisClient.getInstance();

const main = async (query : string) => {
    return await redisClient.search('your key', query);
};
```