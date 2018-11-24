import { Application, Request, Response } from 'express';
import * as Joi from 'joi';
import { Genres } from './data/genres';

export class Routes {
	private genre = new Genres();

	public getRoutes(app: Application): void {
		app.route('/').get((req: Request, res: Response) => {
			res.send('Hello!!!!!');
		});

		app
			.route('/api/genres')
			.get((req: Request, res: Response) => {
				res.send(this.genre.getGenres());
			})
			.post((req: Request, res: Response) => {
				const newGenre = req.body;
				const isInvalidGenre = this.isInvalidGenre(newGenre);
				if (isInvalidGenre) {
					return res.status(400).send(isInvalidGenre);
				}
				res.send(this.genre.addGenre(newGenre));
			});

		app
			.route('/api/genres/:id')
			.get((req: Request, res: Response) => {
				const genreId = req.params.id;
				const genre = this.genre.getGenre(genreId);
				if (!genre) {
					return res.status(404).send(`The genre with id ${genreId} does not exists`);
				}
				res.send(genre);
			})
			.put((req: Request, res: Response) => {
				const genreId = req.params.id;
				const genreToUpdate = req.body;
				const genre = this.genre.getGenre(genreId);
				if (!genre) {
					return res.status(404).send(`The genre with id ${genreId} does not exists`);
				}
				const isInvalidGenre = this.isInvalidGenre(genreToUpdate);
				if (isInvalidGenre) {
					return res.status(400).send(isInvalidGenre);
				}
				const updatedGenre = this.genre.updateGenre({ id: parseInt(genreId, 10), ...genreToUpdate });
				res.send(updatedGenre);
			})
			.delete((req: Request, res: Response) => {
				const genreId = req.params.id;
				const genre = this.genre.getGenre(genreId);
				if (!genre) {
					return res.status(404).send(`The genre with id ${genreId} does not exists`);
				}
				this.genre.deleteGenre(genreId);
				res.send(genre);
			});
	}

	private isInvalidGenre(genreName: string): string | boolean {
		const schema = {
			name: Joi.string().min(3).required()
		};
		const { error } = Joi.validate(genreName, schema);
		if (error) {
			return error.details[0].message;
		}
		return false;
	}
}
