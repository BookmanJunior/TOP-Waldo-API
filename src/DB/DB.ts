import { configDotenv } from 'dotenv';
import pg, { QueryResultBase } from 'pg';
const { Pool } = pg;

configDotenv();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  application_name: 'Waldo'
});

interface QueryResult<T> extends QueryResultBase {
  rows: T[];
}

export const dbquery = async <T>(
  text: string,
  params?: (string | number)[]
): Promise<QueryResult<T>> => {
  const res = await pool.query(text, params);
  return res;
};
