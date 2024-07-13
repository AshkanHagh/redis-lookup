import type { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from '../middlewares/catchAsyncError';
import { searchService } from '../services/search.service';
import type { TSearchResult } from '../types/index.type';

export const search = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { query } = req.query as {query : string};
        const searchResult : TSearchResult | [] = await searchService(query?.toUpperCase());
        res.status(200).json({success : true, ...searchResult});
        
    } catch (error) {
        return next(error);
    }
});