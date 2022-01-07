import connectDB from '../../../lib/utils/middleware/mongodb';
import User from '../../../lib/models/UserModel';
import authorize from '../../../lib/utils/middleware/authorize';
import { NextApiHandler } from 'next';
import mongoose from 'mongoose';

const handler: NextApiHandler = async (req, res) => {
  await connectDB();
  const { adminHOC } = await authorize(req, res);
  const { userId } = req.query;

  try {
    switch (req.method) {
      case 'GET': {
        const user = await User.findById(userId);
        res.status(200).json(user);
        break;
      }
      case 'PUT':
        await adminHOC(async () => {
          await User.updateOne(
            { _id: new mongoose.Types.ObjectId(userId as string) }, req.body);
          res.status(200).end();
        });
        break;

      case 'DELETE':
        await adminHOC(async () => {
          await User.findByIdAndDelete(userId);
          res.status(200).end();
        });
        break;

      default:
        res.status(404).end();
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default handler;
