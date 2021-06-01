import knex from 'knex'

class DbClient {
  connect() {
    this.queryBuilder = knex({
      client: 'pg',
      connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
      }
    })

    console.log('CONNECTED')
  }
}

export const dbClient = new DbClient()