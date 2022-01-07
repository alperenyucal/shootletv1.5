import mongoose, { Model, model, Schema } from 'mongoose';

export interface City {
  name: string;
  enabled: boolean;
  country: string;
  capital: 'primary' | 'admin' | 'minor';
  adminName: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const schema = new Schema<City, Model<City>, City>({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
    enum: ['primary', 'admin', 'minor'],
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

schema.index({ location: '2dsphere' });

export default mongoose.models.City as Model<City> ||
  model<City>('City', schema);
