import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { connectDB, disconnectDB, loadEnv } from './config';
import participantRouter from './routers/participant-router';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';
import gamesRouter from './routers/game-router';
import betRouter from './routers/bet-router';
import httpStatus from 'http-status';


loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (req: Request, res: Response) => res.status(httpStatus.OK).send(`OK`))
  .use('/participants', participantRouter)
  .use('/games', gamesRouter)
  .use('/bets', betRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDB();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
  console.log('Server and database connection closed.');
}

export default app;
