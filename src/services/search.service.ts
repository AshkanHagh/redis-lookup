import redis from '../database/redis.config';
import { InvalidQueryError } from '../libs/utils';
import ErrorHandler from '../libs/utils/errorHandler';
import type { TErrorHandler, TSearchResult } from '../types/index.type';

export const searchService = async (query : string) : Promise<TSearchResult | []> => {
    try {
        if(!query) throw new InvalidQueryError();
        const start : number = performance.now();
        const matchedCountries : string[] = [];

        const countryIndex : number | null = await redis.zrank('terms', query);
        if(!countryIndex) return[];

        const countries : string[] = await redis.zrange<string[]>('terms', countryIndex, countryIndex + 100);
        for(const country of countries) {
            if(!country.startsWith(query)) break;
            if(country.endsWith('*')) matchedCountries.push(country.substring(0, country.length - 1));
        }
        const end :  number = performance.now();
        return {duration : `${Math.round(end - start)} ms`, matchedCountries};
        
    } catch (err : unknown) {
        const error = err as TErrorHandler;
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
}