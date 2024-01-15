import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

const createPool = () => new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

let configFileName;

const environment = process.env.NODE_ENV || 'development';

switch (environment) {
  case 'production':
    configFileName = '.env.production';
    break;
  case 'test':
    configFileName = '.env.test';
    break;
  default:
    configFileName = '.env.development';
}

dotenv.config({ path: configFileName });

const pool = createPool();

export default pool;
