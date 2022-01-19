
import { NextApiRequest, NextApiResponse } from 'next';
import AdminModel from '../../../lib/models/AdminModel';
import UserModel from '../../../lib/models/UserModel';
import { authorize, connectDB, logger } from '../../../lib/utils/middleware';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    logger(req);
    await connectDB();
    const { adminHOC } = await authorize(req, res);

    await adminHOC(async () => {
      switch (req.method) {
        case 'GET': {
          const admins = await AdminModel.find({}).populate({
            path: 'user',
            model: UserModel,
          });
          res.status(200).json(admins);
          break;
        }

        case 'POST': {
          const admin = new AdminModel({
            ...req.body,
          });
          await admin.save();
          res.status(200).end();
          break;
        }

        default:
          res.status(404).end();
      }
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).json({ message: error });
    }
  }
}

export default handler;
