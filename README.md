# Redis Search

## Description

Redis Search is a high-performance REST API service designed to perform rapid searches on user-defined datasets using [Redis](https://redis.io/). By leveraging the capabilities of Redis and [Upstash](https://upstash.com/), this project provides efficient search functionalities, such as finding users or products based on partial matches. The service is particularly useful for applications requiring quick lookup and autocomplete features.

## Features

- **High-Performance Search**: Fast search operations leveraging Redis' in-memory data structure.
- **Data Population**: Populate Redis with structured data for efficient searching.
- **User and Product Lookup**: Easily find users or products based on partial input strings.
- **Autocomplete Functionality**: Support for autocomplete search queries.

## API Technologies Used

- **TypeScript**: Ensures type safety and improves code quality.
- **Redis**: An in-memory key-value store, used for fast data retrieval.
- **Upstash**: Serverless Redis service, providing a scalable and easy-to-use database solution.
- **Express**: A minimal and flexible Node.js web application

## Package Installation

### Install the Package
To use the `upstash-search` package in your project, install it via npm:
```shell
npm install upstash-search
```

## Usage

### Configuring Redis Client
First, configure the Redis client using the provided URL and token from Upstash:


```typescript
import { RedisClient } from 'upstash-search';

RedisClient.configure('your_upstash_redis_url', 'your_upstash_redis_token');
const redisClient = RedisClient.getInstance();
```

### Populating Redis with Data
Populate the Redis database with data to enable fast search operations:
```typescript
const data: string[] = ['example1', 'example2', 'example3'];
await redisClient.populateDB('your_key', data);
```

### Performing a Search
Perform a search query to retrieve matched results from Redis:
```typescript
const results = await redisClient.search('your_key', 'query');
console.log(results);
```
## License

This project is licensed under the MIT License