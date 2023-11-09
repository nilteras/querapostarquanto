import express, {Express} from 'express';
import cors from 'cors';
import { connectDB, disconnectDB, loadEnv } from './config';


loadEnv()
const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (req, res) => res.send(`OK`));

export function init(): Promise<Express> {
    connectDB();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
