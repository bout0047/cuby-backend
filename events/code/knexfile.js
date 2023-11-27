import dotenv from 'dotenv';
dotenv.config();

export default {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'your_username',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'your_database_name',
      port: process.env.DB_PORT || 5432,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };
  