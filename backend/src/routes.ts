import { definitions as ApiSchema } from '@/../build/api-schema.json';
import { NextFunction, Request, Response, Router } from "express";
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { session_get_response, session_post_request } from "~/shared/api-schema/session";
import { echo_post_request, echo_post_response } from "~/shared/api-schema/echo";
import { validate } from './validation';


export function setup(app: Router) {

  app.post('/api/session',
    validate(ApiSchema.session_post_request),
    catchRejection(async (req, res) => {
      const { user_name }: session_post_request = req.body
      if (user_name.length < 4) {
        res.status(UNPROCESSABLE_ENTITY).json({ message: 'too short name' })
      }
      else {
        req.session!.user_name = user_name
        res.redirect('./session')
      }
    })
  )

  app.get('/api/session',
    getUserName,
    catchRejection(async (req, res) => {
      const user_name = res.locals.user_name as string
      const resbody: session_get_response = { user_name }
      res.json(resbody)
    })
  )

  function getUserName(req: Request, res: Response, next: NextFunction) {
    const user_name = req.session!.user_name
    if (user_name) {
      res.locals.user_name = user_name
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

  app.post('/api/echo',
    validate(ApiSchema.echo_post_request),
    getUserName,
    catchRejection(async (req, res) => {
      await sleep(4000 * Math.random())
      const user_name = res.locals.user_name as string
      const { content }: echo_post_request = req.body
      const resbody: echo_post_response = {
        time: Number(new Date()),
        content: `${user_name} said: ${content.toUpperCase()}`,
      }
      res.json(resbody)
    })
  )

}


async function sleep(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}


function catchRejection(f: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
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