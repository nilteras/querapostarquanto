import { createBet } from "./../controllers/bet-controller";
import { Router } from "express";

const betRouter = Router();

betRouter.post('/', createBet);

export default betRouter;