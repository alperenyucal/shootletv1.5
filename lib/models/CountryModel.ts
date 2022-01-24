import mongoose, { Schema, model, Model, PopulatedDoc } from 'mongoose';
import { City } from './CityModel';

export interface Country {
  name: string;
  enabled: boolean;
  cities: PopulatedDoc<City & Document>[];
}

const schema = new Schema<Country, Model<Country>, Country>({
  name: { type: String, unique: true, required: true },
  enabled: { type: Boolean, required: true, default: true },
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
  ],
});

export default mongoose.models.Country as Model<Country> ||
  model<Country>('Country', schema);
