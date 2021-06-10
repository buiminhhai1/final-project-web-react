module.exports = {
  CONNECTION_STRING: process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0-hs8pp.mongodb.net/final-project-user',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '2483517738600678',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'b5d3ad94d91e711ce175c0f86ad0a15e'
};