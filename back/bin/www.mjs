import dotenv from 'dotenv'
import http from 'http'
import {App} from '../src/app.mjs'
import {ArticleController} from "../src/article/article.controller.mjs"
import {dbClient} from "../db/index.mjs"

dotenv.config()

const app = new App([new ArticleController()])

const port = process.env.PORT || '4000'
const server = http.createServer(app.expressApp)

dbClient.connect()
server.listen(port)

