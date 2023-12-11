import dotenv from 'dotenv';
dotenv.config();

export default {
    client: 'pg',
    connection: {
      // Set host to desired host or specify in .env file and import
      host: 'localhost',
      user: process.env.POSTGRES_USER || 'your_username',
      password: process.env.POSTGRES_PASSWORD || 'your_password',
      database: process.env.POSTGRES_DB || 'your_database_name',
      port: process.env.DB_PORT || 5432,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    }
  };
  