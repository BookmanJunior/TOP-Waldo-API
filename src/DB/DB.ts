import { configDotenv } from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

configDotenv();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  application_name: 'Waldo'
});

export const dbquery = async (text: string, params?: (string | number)[]) => {
  const res = await pool.query(text, params);
  return res;
};
