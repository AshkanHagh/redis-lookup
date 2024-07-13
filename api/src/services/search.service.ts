import redis from '../database/redis.config';
import { InvalidQueryError } from '../libs/utils';
import ErrorHandler from '../libs/utils/errorHandler';
import type { TErrorHandler, TSearchResult } from '../types/index.type';

export const searchService = async (query : string) : Promise<TSearchResult | []> => {
    try {
        const start : number = performance.now();
        if(!query) throw new InvalidQueryError();

        const matchedCountries : string[] = [];
        const rank : number | null = await redis.zrank('terms', query);
        if(!rank) return [];

        const temp = await redis.zrange<string[]>('terms', rank, rank + 100);
        for (const element of temp) {
            if(!element.startsWith(query)) break;
            if(element.endsWith('*')) matchedCountries.push(element.substring(0, element.length - 1));
        }
        const end : number = performance.now();
        return {duration : `${Math.round(end - start)} ms`, matchedCountries} as TSearchResult
        
    } catch (err : unknown) {
        const error = err as TErrorHandler;
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
}