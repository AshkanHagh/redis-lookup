declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT : string;
      DATABASE_URL : string;
      UPSTASH_REDIS_REST_URL : string;
      UPSTASH_REDIS_REST_TOKEN : string;
      NODE_ENV : string;
      ORIGIN : string;
    }
  }
}

export {}
