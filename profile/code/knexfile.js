import dotenv from 'dotenv';

dotenv.config();

export default {
  client: 'pg',
  connection: {
    host: 'postgres',
    user: process.env.POSTGRES_USER || 'your_username',
    password: process.env.POSTGRES_PASSWORD || 'your_password',
    database: process.env.POSTGRES_DB || 'your_database_name',
    port: process.env.DB_PORT || 5433,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};
