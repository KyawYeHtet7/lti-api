import { registerPlatformService } from '../services/lti.service'

async function registerPlatform (req, res, next) {
  try {
    const {
      url,
      name,
      clientId,
      authenticationEndpoint,
      accesstokenEndpoint,
      authConfig
    } = req.body
    const platform = await registerPlatformService({
      url,
      name,
      clientId,
      authenticationEndpoint,
      accesstokenEndpoint,
      authConfig
    })
    res.status(200).send(platform)
  } catch (error) {
    next(error)
  }
}

export { registerPlatform }
