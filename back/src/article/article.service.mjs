import {Article} from '../models/article.mjs'

export class ArticleService {
  Article = Article

  async getList(options) {
    return this.Article.findAll(options)
  }

  async getById(id) {
    return this.Article.findById(id)
  }

  async create(createArticleDTO) {
    const article = new Article(createArticleDTO)
    const result = await this.Article.create(article)

    return {article: result[0]}
  }

  async updateById(id, updateArticleDTO) {
    const article = new Article(updateArticleDTO)
    const result = await this.Article.updateOne({id}, article)

    return {article: result[0]}
  }

  async removeById(id) {
    const result = await this.Article.remove({id})

    return {removed: result}
  }
}