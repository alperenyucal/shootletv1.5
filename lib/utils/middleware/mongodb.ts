import mongoose from 'mongoose';

export default async function connectDB():
  Promise<typeof mongoose | undefined> {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (process.env.MONGODB_URI) {
    return mongoose.connect(process.env.MONGODB_URI);
  }
}
