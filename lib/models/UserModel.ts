import mongoose, { Schema, model, PopulatedDoc, Model, Document }
  from 'mongoose';
import { City } from './CityModel';
import { Country } from './CountryModel';
import { MFile } from './MFileModel';

export interface User {
  email: string;
  password: string;

  firstname: string;
  lastname: string;
  birthDate: Date;

  avatar: PopulatedDoc<MFile & Document>;

  phoneNumber: string;

  country: PopulatedDoc<Country & Document>;
  city: PopulatedDoc<City & Document>;
}

const schema = new Schema<User, Model<User>, User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: String,
  lastname: String,
  birthDate: Date,
  phoneNumber: String,

  avatar: { type: Schema.Types.ObjectId, ref: 'MFile' },

  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  city: { type: Schema.Types.ObjectId, ref: 'City' },
}, { timestamps: true });

export default mongoose.models.User as Model<User> ||
  model<User>('User', schema);
