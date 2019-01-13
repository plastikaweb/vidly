import express = require('express');
import { Request, Response, Router } from 'express';
import * as Joi from 'joi';
import { Genre, IGenre, IRouterBySection } from '../models';

export class GenresRoutes implements IRouterBySection {
  public getRoutes(): Router {
    const router = express.Router();
    return router
      .get('/', async (req: Request, res: Response) => {
        const genres = await Genre.find().sort('name');
        res.send(genres);
      })
      .post('/', async (req: Request, res: Response) => {
        const name = req.body.name;
        let genre = new Genre({ name });
        const isInvalidGenre = this.isInvalidGenre(req.body);
        if (isInvalidGenre) {
          return res.status(400).send(isInvalidGenre);
        }
        genre = await genre.save();
        res.send(genre);
      })

      .get('/:id', async (req: Request, res: Response) => {
        const genreId = req.params.id;
        const genre = await Genre.findById(genreId);
        if (!genre) {
          return this.isNotPresentGenre(res, genreId);
        }
        res.send(genre);
      })
      .put('/:id', async (req: Request, res: Response) => {
        const genreId = req.params.id;
        const isInvalidGenre = this.isInvalidGenre(req.body);
        if (isInvalidGenre) {
          return res.status(400).send(isInvalidGenre);
        }

        const genre = await Genre.findByIdAndUpdate(
          genreId,
          { name: req.body.name },
          { new: true }
        );

        if (!genre) {
          return this.isNotPresentGenre(res, genreId);
        }
        res.send(genre);
      })
      .delete('/:id', async (req: Request, res: Response) => {
        const genreId = req.params.id;
        const genre = await Genre.findByIdAndRemove(genreId);
        if (!genre) {
          return this.isNotPresentGenre(res, genreId);
        }
        res.send(genre);
      });
  }

  private isInvalidGenre(name: IGenre): string | boolean {
    const schema = {
      name: Joi.string()
        .min(3)
        .max(50)
        .required()
    };
    const { error } = Joi.validate({ name }, schema);
    return error ? error.details[0].message : false;
  }

  private isNotPresentGenre(res: Response, id: string) {
    return res.status(404).send(`The genre with id ${id} does not exists`);
  }
}
