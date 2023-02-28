const env = process.env.NODE_ENV || 'local'

const config = {
  test: {
    port: 8383,
    db: 'mongodb+srv://m001-student:timeline1@sandbox.xsgsj.mongodb.net/ltidb?authSource=admin'
  },
  local: {
    port: 8383,
    db: 'mongodb+srv://m001-student:timeline1@sandbox.xsgsj.mongodb.net/ltidb?authSource=admin'
  },
  dev: {
    port: 8383,
    db: 'mongodb+srv://m001-student:timeline1@sandbox.xsgsj.mongodb.net/ltidb?authSource=admin'
  },
  staging: {
    port: 8383,
    db: 'mongodb+srv://m001-student:timeline1@sandbox.xsgsj.mongodb.net/ltidb?authSource=admin'
  },
  production: {
    port: 8383,
    db: 'mongodb+srv://m001-student:timeline1@sandbox.xsgsj.mongodb.net/ltidb?authSource=admin'
  }
}

export default {
  ...config[env]
}
