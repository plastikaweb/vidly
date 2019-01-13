import * as config from 'config';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { GenresRoutes } from './routes/genres';
import { HomeRoutes } from './routes/home';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.mongoConfig();
    this.expressConfig();
    console.log('NAME:', config.get('name'));
  }

  private mongoConfig() {
    mongoose
      .connect('mongodb://localhost/vidly')
      .then(() => console.log('Connected to MongoDB...'))
      .catch(err =>
        console.log(`Could not connect to MongoDB: ${err.message}`)
      );
  }

  private expressConfig() {
    if (this.app.get('env') === 'development') {
      this.app.use(morgan('dev'));
    }
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
