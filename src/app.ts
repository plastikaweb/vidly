import express from 'express';
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
		this.app.set('port', process.env.PORT || 5000);
		this.app.use(express.json());
	}
}

export default new App().app;
