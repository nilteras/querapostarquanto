import { validateSchema } from "./../middlewares/validation-middleware";
import { createBet } from "./../controllers/bet-controller";
import { Router } from "express";
import { createBetSchema } from "./../schemas/bet-schema";

const betRouter = Router();

betRouter.post('/',validateSchema(createBetSchema) ,createBet);

export default betRouter;