import express = require('express');
import { Request, Response, Router } from 'express';
import * as Joi from 'joi';
import { Genres } from '../data/genres';
import { IRouterBySection } from '../models/';

export class GenresRoutes implements IRouterBySection {
  public getRoutes(): Router {
    const genres = new Genres();
    const router = express.Router();
    return router
      .get('/', (req: Request, res: Response) => {
        res.send(genres.getGenres());
      })
      .post('/', (req: Request, res: Response) => {
        const newGenre = req.body;
        const isInvalidGenre = this.isInvalidGenre(newGenre);
        if (isInvalidGenre) {
          return res.status(400).send(isInvalidGenre);
        }
        res.send(genres.addGenre(newGenre));
      })

      .get('/:id', (req: Request, res: Response) => {
        const genreId = req.params.id;
        const genre = genres.getGenre(genreId);
        if (!genre) {
          return this.isNotPresentGenre(res, genreId);
        }
        res.send(genre);
      })
      .put('/:id', (req: Request, res: Response) => {
        const genreId = req.params.id;
        const genreToUpdate = req.body;
        const genre = genres.getGenre(genreId);
        if (!genre) {
          return this.isNotPresentGenre(res, genreId);
        }
        const isInvalidGenre = this.isInvalidGenre(genreToUpdate);
        if (isInvalidGenre) {
          return res.status(400).send(isInvalidGenre);
        }
        const updatedGenre = genres.updateGenre({
          id: parseInt(genreId, 10),
          ...genreToUpdate
        });
        res.send(updatedGenre);
      })
      .delete('/:id', (req: Request, res: Response) => {
        const genreId = req.params.id;
        const genre = genres.getGenre(genreId);
        if (!genre) {
          return this.isNotPresentGenre(res, genreId);
        }
        genres.deleteGenre(genreId);
        res.send(genre);
      });
  }

  private isInvalidGenre(genreName: string): string | boolean {
    const schema = {
      name: Joi.string()
        .min(3)
        .required()
    };
    const { error } = Joi.validate(genreName, schema);
    return error ? error.details[0].message : false;
  }

  private isNotPresentGenre(res: Response, id: string) {
    return res.status(404).send(`The genre with id ${id} does not exists`);
  }
}
