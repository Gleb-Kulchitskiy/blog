import dotenv from 'dotenv'

dotenv.config()

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_USER
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db/seeds',
      loadExtensions: [".mjs"],
    }
  }
};

export const {
  client,
  connection,
  migrations,
  seeds,
} = knexConfig.development;