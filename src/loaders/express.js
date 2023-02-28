import express from 'express'
import bodyParser from 'body-parser'

import { errorHandler } from '../middlewares/handlers.middleware'

import path from 'path'
import glob from 'glob'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import config from '../config'
const lti = require('ltijs').Provider

function setupExpress () {
  const app = express()
  lti.setup(
    'EXAMPLEKEY',
    { url: config.db },
    {
      staticPath: path.join(__dirname, './public'), // Path to static files
      cookies: {
        secure: true, // Set secure to true if the testing platform is in a different domain and https is being used
        sameSite: 'None' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
      },
      devMode: false // Set DevMode to true if the testing platform is in a different domain and https is not being used
    }
  )

  // When receiving successful LTI launch redirects to app
  lti.onConnect(async (token, req, res) => {
    return res.sendFile(path.join(__dirname, './public/index.html'))
  })

  // When receiving deep linking request redirects to deep screen
  lti.onDeepLinking(async (token, req, res) => {
    console.log('Deep Linking')
    return lti.redirect(res, '/deeplink', { newResource: true })
  })

  // Start LTI provider in serverless mode
  lti.deploy({ serverless: true })

  // Mount Ltijs express app into preexisting express app with /lti prefix
  app.use('/lti', lti.app)

  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))
  app.use(bodyParser.text({ limit: '500mb', extended: true }))
  app.use(bodyParser.json({ limit: '500mb' }))
  app.use(morgan('dev'))
  app.use(compression())
  app.use(
    cors({
      origin: (origin, callback) => {
        return callback(null, true)
      },
      optionsSuccessStatus: 200,
      credentials: true,
      exposedHeaders: '*'
    })
  )

  const dir = path.join(__dirname, '../routes/*.js')
  const routes = glob.sync(dir)
  routes.forEach(route => {
    require(route).default(app)
  })

  app.use(errorHandler)
  return app
}

export default setupExpress
