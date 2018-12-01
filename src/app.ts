import * as express from 'express';
import * as helmet from 'helmet';
import { GenresRoutes, HomeRoutes } from './routes/';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app
      .set('port', process.env.PORT || 4000)
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(helmet())
      // routes
      .use('/', new HomeRoutes().getRoutes())
      .use('/api/genres', new GenresRoutes().getRoutes());
  }
}

export default new App().app;
