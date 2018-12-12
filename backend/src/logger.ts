import { Express } from "express";


export function setup(app: Express) {
  // default logger
  const logger = require('morgan')
  app.use(logger('dev'))

  // log post parameters
  if (process.env.NODE_ENV == 'development') {
    app.use((req, res, next) => {
      console.log(`params: ${JSON.stringify(req.body)}`)
      next()
    })
  }
}