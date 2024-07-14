import { Redis } from '@upstash/redis';
import { TSearchResult, TSeedArray } from './index.type';

export class RedisClient {
    private static instance : RedisClient;
    private client : Redis;

    private constructor(url : string, token : string) {
        this.client = new Redis({ url, token });
    }

    public static configure(url : string, token : string) {
        if (!this.instance) {
            this.instance = new RedisClient(url, token);
        }
    }

    public static getInstance() : RedisClient {
        if (!this.instance) {
            throw new Error('RedisClient is not configured. Call RedisClient.configure(url, token) first.');
        }
        return this.instance;
    }

    public async zadd(key : string, value : TSeedArray[]) {
        // @ts-expect-error bug
        return await this.client.zadd(key, ...value);
    }

    private async zrank(key : string, query : string) {
        return await this.client.zrank(key, query);
    }

    private async zrange(key : string, startIndex : number, endIndex : number) : Promise<string[]> {
        return await this.client.zrange(key, startIndex, endIndex);
    }

    public async populateDB(key : string, inputStrings : string[]) {
        for (const inputString of inputStrings) {
            const term : string = inputString.toUpperCase();
            const seedData : TSeedArray[] = [];

            for (let i = 0; i <= term.length; i++) {
                seedData.push({ score : 0, member : term.substring(0, i) });
            }
            seedData.push({ score : 0, member : term + '*' });

            await this.zadd(key, seedData);
        }
    }

    public async search(key : string, query : string) : Promise<TSearchResult> {
        if(!query) throw new Error('Invalid search query');
        query = query.toUpperCase();

        const matchedQuery : string[] = []
        const queryIndex : number | null = await this.zrank(key, query);
        if(!queryIndex) return [];

        const temp : string[] = await this.zrange(key, queryIndex, queryIndex + 100);
        for (const element of temp) {
            if(!element.startsWith(query)) break;
            if(element.endsWith('*')) matchedQuery.push(element.substring(0, element.length - 1));
        }

        return matchedQuery;
    }
}
