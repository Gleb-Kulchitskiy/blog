import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

export class App {
  expressApp = express()

  constructor(controllers) {
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  initializeMiddlewares() {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(cors())
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.expressApp.use(controller.path, controller.router);
    });
  }
}