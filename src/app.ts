import express from 'express';

class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
	}

	private config() {
		this.app.set('port', process.env.PORT || 5000);
		this.app.use(express.json());
	}
}

export default new App().app;
