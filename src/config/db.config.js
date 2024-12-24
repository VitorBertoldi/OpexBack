import { config } from 'dotenv';

config();

export default {
  HOST: process.env.HOST || 'localhost',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.PASSWORD || 'root',
  DATABASE: process.env.DATABASE || 'opex_db',
  PORT: process.env.PORT,
  dialect: 'mysql',
};
