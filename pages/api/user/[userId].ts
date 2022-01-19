import UserModel from '../../../lib/models/UserModel';
import { NextApiHandler } from 'next';
import mongoose from 'mongoose';
import { authorize, connectDB, logger } from '../../../lib/utils/middleware';

const handler: NextApiHandler = async (req, res) => {
  try {
    logger(req);

    await connectDB();
    const { adminHOC } = await authorize(req, res);
    const { userId } = req.query;

    switch (req.method) {
      case 'GET': {
        const user = await UserModel.findById(userId);
        res.status(200).json(user);
        break;
      }
      case 'PUT':
        await adminHOC(async () => {
          await UserModel.updateOne(
            { _id: new mongoose.Types.ObjectId(userId as string) }, req.body);
          res.status(200).end();
        });
        break;

      case 'DELETE':
        await adminHOC(async () => {
          await UserModel.findByIdAndDelete(userId);
          res.status(200).end();
        });
        break;

      default:
        res.status(404).end();
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).json({ message: error });
    }
  }
};

export default handler;
