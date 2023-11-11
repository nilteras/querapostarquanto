import express, {Express} from 'express';
import cors from 'cors';
import { connectDB, disconnectDB, loadEnv } from './config';
import participantRouter from './routers/participant-router';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';


loadEnv()
const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (req, res) => res.send(`OK`))
  .use('/participants', participantRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDB();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
