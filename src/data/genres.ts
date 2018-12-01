import { IGenre } from '../models/';

let genres: IGenre[] = [
  {
    id: 1,
    name: 'sci-fi'
  },
  {
    id: 2,
    name: 'thriller'
  },
  {
    id: 3,
    name: 'comedy'
  },
  {
    id: 4,
    name: 'terror'
  },
  {
    id: 5,
    name: 'action'
  },
  {
    id: 6,
    name: 'historical'
  },
  {
    id: 7,
    name: 'adventure'
  }
];

export class Genres {
  private generateId(): number {
    return this.getGenres().length + 1;
  }
  public getGenres(): IGenre[] {
    return genres;
  }

  public getGenre(id: string): IGenre | undefined {
    return this.getGenres().find(genre => genre.id === parseInt(id, 10));
  }

  public addGenre(genre: Partial<IGenre>): IGenre {
    const newGenre = { id: this.generateId(), ...genre };
    genres = [...genres, newGenre];
    return newGenre;
  }

  public deleteGenre(id: string) {
    genres = genres.filter(genre => genre.id !== parseInt(id, 10));
  }

  public updateGenre(genre: IGenre): IGenre {
    genres = [...genres.filter(g => g.id !== genre.id), genre];
    return genre;
  }
}
