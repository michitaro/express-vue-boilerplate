import * as express from "express";
import * as config from "~/shared/config";
import * as devel from './devel';
import * as logger from './logger';
import * as routes from './routes';

const app = express()

const router = express.Router()

// static assets
router.use('/', express.static(`${__dirname}/../../frontend/dist`))

// accept json requests
app.use(express.json())

// logger
logger.setup(app)

// SESSION
const cookieSession = require('cookie-session')({
  name: config.sessionCookieName,
  secret: (secret => {
    if (process.env.NODE_ENV == 'development') {
      return '-'
    }
    else {
      console.assert(secret && secret.length >= 64, `${config.sessionSecretEnvName} must be set and have its length of 64.`)
      return secret
    }
  })(process.env[config.sessionSecretEnvName])
})
router.use(cookieSession)

// devel
if (process.env.NODE_ENV == 'development') {
  devel.setup(app)
}

// routes
routes.setup(router)
app.use(config.urlPrefix, router)

export { app }