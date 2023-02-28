import express from 'express'

import { registerPlatform } from '../controllers/lti.conttoller'

const router = express.Router()

router.post('/register/platform', registerPlatform)

export default app => {
  app.use('/lti-1.3', router)
}
