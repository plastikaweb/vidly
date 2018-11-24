import * as express from 'express';
import * as helmet from 'helmet';
import { Routes } from './routes';

class App {
	public app: express.Application;
	public routes: Routes = new Routes();

	constructor() {
		this.app = express();
		this.config();
		this.routes.getRoutes(this.app);
	}

	private config() {
		this.app.set('port', process.env.PORT || 4000);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(helmet());
	}
}

export default new App().app;
