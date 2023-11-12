import { Request, Response, NextFunction} from "express";
import httpStatus from "http-status";
import { CreateBet } from "protocols";
import { betService } from "./../services/bet-service";


export async function createBet(req: Request, res: Response, next: NextFunction){
   try {
    const { homeTeamScore, awayTeamScore,amountBet, gameId, participantId } = req.body as CreateBet;

    const result = await betService.postBet({ homeTeamScore, awayTeamScore,amountBet, gameId, participantId });

    return res.status(httpStatus.CREATED).send(result);
   }catch(error){
    console.log(error)
    next(error)
   }
   

};

