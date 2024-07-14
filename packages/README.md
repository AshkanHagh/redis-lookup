# Redis Lookup

## Description

Redis Lookup is a high-performance search package designed to perform rapid searches on user-defined datasets using Redis. By leveraging the capabilities of Redis and Upstash, this package provides efficient search functionalities, such as finding users or products based on partial matches. It is particularly useful for applications requiring quick lookup and autocomplete features.

## Features

- **High-Performance Search**: Fast search operations leveraging Redis' in-memory data structure.
- **Data Population**: Populate Redis with structured data for efficient searching.
- **User and Product Lookup**: Easily find users or products based on partial input strings.
- **Autocomplete Functionality**: Support for autocomplete search queries.

## Package Installation

### Install the Package
To use the `redis-lookup` package in your project, install it via npm:
```shell
npm install redis-lookup
```

## Usage

### Configuring Redis Client
First, configure the Redis client using the provided URL and token from Upstash:


```typescript
import { RedisClient } from 'redis-lookup';

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