import { Document, Model, model, Schema } from 'mongoose';

export interface IGenre {
  name: string;
}

export interface IGenreModel extends IGenre, Document {
  fullName(): string;
}

const GenreSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

export const Genre: Model<IGenreModel> = model<IGenreModel>(
  'Genre',
  GenreSchema
);
