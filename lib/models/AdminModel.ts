import mongoose, { Schema, model, PopulatedDoc, Document, Model }
  from 'mongoose';
import { User } from './UserModel';

export interface Admin {
  user: PopulatedDoc<User & Document>;
}

const schema = new Schema<Admin, Model<Admin>, Admin>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.models.Admin as Model<Admin> ||
  model<Admin>('Admin', schema);
