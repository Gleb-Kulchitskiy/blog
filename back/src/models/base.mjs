import {dbClient} from "../../db/index.mjs";

export class BaseModel {
  static bdClient = dbClient
  static pluralsMap = {
    article: 'articles',
  }

  static getTableName() {
    return this.pluralsMap[this.name.toLowerCase()]
  }

  static async create(data) {
    return this.bdClient.queryBuilder(this.getTableName()).insert(data).returning('*')
  }

  static findAll(options) {
    const qb = this.bdClient.queryBuilder.select().from(this.getTableName())
    options.sort_column && (qb.orderBy(options.sort_column, options.order_by || 'desc'))

    return qb
  }

  static async findById(id) {
    const result = await this.bdClient.queryBuilder(this.getTableName())
      .select()
      .where({id})

    return result[0]
  }

  static remove(filter) {
    return this.bdClient.queryBuilder(this.getTableName())
      .where(filter)
      .delete()
  }

  static updateOne(filter, properties) {
    return this.bdClient.queryBuilder(this.getTableName())
      .where(filter)
      .update(properties)
      .returning('*')
  }
}