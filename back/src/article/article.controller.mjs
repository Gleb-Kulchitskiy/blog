import express from 'express'
import {ArticleService} from "./article.service.mjs";

export class ArticleController {
  path = '/articles'
  router = express.Router()
  articleService = new ArticleService()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get('/', this.getList)
    this.router.get('/:id', this.getById)
    this.router.post('/', this.create)
    this.router.put('/:id', this.updateById)
    this.router.delete('/:id', this.deleteById)
  }

  getList = async (req, res) => {
    const {sort_column, order_by} = req.query
    const options = {}

    sort_column && (options.sort_column = sort_column);
    (order_by === 'asc' || order_by === 'desc') && (options.order_by = order_by);

    try {
      const articles = await this.articleService.getList(options)
      res.send(articles)
    } catch (err) {
      res.status(err.status || 500).send(err.message || 'Something went wrong.')
    }
  }

  getById = async (req, res) => {
    const {id} = req.params

    if (!Number.isInteger(+id)) {
      return res.status(400).send('Unexpected id format.')
    }
    try {
      const article = await this.articleService.getById(id)

      if (!article) {
        return res.status(404).send(`Article with id:${id} not found.`)
      }

      res.send(article)
    } catch (err) {
      res.status(err.status || 500).send(err.message || 'Something went wrong.')
    }
  }

  create = async (req, res) => {
    const {dto} = req.body

    //super simple validation
    if (!dto.content) {
      return res.status(400).send('Article should have content')
    }

    try {
      const result = await this.articleService.create(dto)
      res.send(result)
    } catch (err) {
      res.status(err.status || 500).send(err.message || 'Something went wrong.')
    }
  }

  updateById = async (req, res) => {
    const {dto} = req.body
    const {id} = req.params

    //super simple validation
    if (!dto.content || !dto.heading) {
      return res.status(400).send('Article should have header and content')
    }

    if (!Number.isInteger(+id)) {
      return res.status(400).send('Unexpected id format.')
    }

    try {
      const result = await this.articleService.updateById(id, dto)
      res.send(result)
    } catch (err) {
      res.status(err.status || 500).send(err.message || 'Something went wrong.')
    }
  }

  deleteById = async (req, res) => {
    const {id} = req.params

    if (!Number.isInteger(+id)) {
      return res.status(400).send('Unexpected id format.')
    }

    try {
      const result = await this.articleService.removeById(id)
      res.send(result)
    } catch (err) {
      res.status(err.status || 500).send(err.message || 'Something went wrong.')
    }
  }
}