require('dotenv').config();
const config = {
    MONGO_URI : process.env.MONGO_URI,
    PORT: process.env.PORT,
    SALT_ROUNDS : process.env.SALT_ROUNDS,
    JWT_TOKEN : process.env.JWT_TOKEN,
    FRONTEND_URL : process.env.FRONTEND_URL
}

module.exports = config;