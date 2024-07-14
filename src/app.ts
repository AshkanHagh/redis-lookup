import express, { type Request, type Response, type NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import searchRoute from './routes/search.route';

import { ErrorMiddleware } from './middlewares/error';
import { RouteNowFoundError } from './libs/utils';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors({origin : process.env.ORIGIN}));
app.use(helmet());
app.use(helmet({crossOriginResourcePolicy : {policy : 'cross-origin'}}));

app.get('/', (req : Request, res : Response) => res.status(200).json({success : true, message : 'Welcome'}));

app.use('/api/country', searchRoute);

app.all('*', (req : Request, res : Response, next : NextFunction) => {
    next(new RouteNowFoundError(`Route : ${req.originalUrl} not found`));
});

app.use(ErrorMiddleware);
export default app;