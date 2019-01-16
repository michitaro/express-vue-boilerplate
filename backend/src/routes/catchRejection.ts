import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status-codes";


export function catchRejection(f: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await f(req, res, next)
    }
    catch (e) {
      console.error(e)
      res.sendStatus(INTERNAL_SERVER_ERROR)
    }
  }
}