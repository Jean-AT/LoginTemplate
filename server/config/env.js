const dotenv =require('dotenv');

dotenv.config()

module.exports ={
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development"
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES || "1d"
  }
};