import * as express from 'express';

export class Routes {
	public getRoutes(app: express.Application): void {
		app.get('/', (req: express.Request, res: express.Response) => {
			res.send('Hello!!!');
		});
	}
}
