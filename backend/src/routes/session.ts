import { Router, NextFunction, Request, Response } from "express";
import { validate } from "@/validation";
import { catchRejection } from "./catchRejection";
import { definitions as ApiSchema } from '@/../build/api-schema.json';
import { session_post_request, session_get_response } from "~/shared/api-schema/session";
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED, OK } from "http-status-codes";
import { UserModel } from "@/models/user";

export function setup(app: Router) {

  app.post('/api/session',
    validate(ApiSchema.session_post_request),
    catchRejection(async (req, res) => {
      const { account_name, password }: session_post_request = req.body
      try {
        const result = await UserModel.fromStars(account_name, password)
        req.session!.account_name = account_name
        res.redirect('./session')
      }
      catch (e) {
        res.status(UNPROCESSABLE_ENTITY).json({ message: e.message })
      }
    })
  )

  app.get('/api/session',
    getUserName,
    catchRejection(async (req, res) => {
      const account_name = res.locals.account_name as string
      const resbody: session_get_response = { account_name }
      res.json(resbody)
    })
  )

  function getUserName(req: Request, res: Response, next: NextFunction) {
    const { account_name } = req.session!
    if (account_name) {
      res.locals.account_name = account_name
      next()
    }
    else {
      res.sendStatus(UNAUTHORIZED)
    }
  }

  app.delete('/api/session',
    catchRejection(async (req, res) => {
      req.session = undefined
      res.sendStatus(OK)
    })
  )

}