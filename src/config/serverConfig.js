const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRE : process.env.JWT_EXPIRE
}
