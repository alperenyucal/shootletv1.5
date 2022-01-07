import mongoose, { Schema, model, Model } from 'mongoose';

export interface MFile {
  mimetype: string;
  filename: string;
  data?: Buffer;
}

const schema = new Schema<MFile, Model<MFile>, MFile>({
  mimetype: { type: String, required: true },
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
});


export default mongoose.models.MFile || model<MFile>('MFile', schema);
