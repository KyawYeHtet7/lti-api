const lti = require('ltijs').Provider

async function registerPlatformService ({
  url,
  name,
  clientId,
  authenticationEndpoint,
  accesstokenEndpoint,
  authConfig
}) {
  try {
    await lti.registerPlatform({
      url,
      name,
      clientId,
      authenticationEndpoint,
      accesstokenEndpoint,
      authConfig
    })
    return { message: 'Platform registered' }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

export { registerPlatformService }
