import mongoose, { Schema, model, Model } from 'mongoose';

export interface Country {
  name: string;
  enabled: boolean;
}

const schema = new Schema<Country, Model<Country>, Country>({
  name: { type: String, unique: true, required: true },
  enabled: { type: Boolean, required: true, default: true },
});

export default mongoose.models.Country as Model<Country> ||
  model<Country>('Country', schema);
