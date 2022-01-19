import { NextApiRequest, NextApiResponse } from 'next';
import AdminModel from '../../../lib/models/AdminModel';
import UserModel from '../../../lib/models/UserModel';
import { authorize, connectDB, logger } from '../../../lib/utils/middleware';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    logger(req);
    await connectDB();
    const { adminHOC } = await authorize(req, res);

    const { adminId } = req.query;

    await adminHOC(async () => {
      switch (req.method) {
        case 'GET': {
          const admin = await AdminModel.findById(adminId).populate({
            path: 'user',
            model: UserModel,
            select: '-password',
          });
          res.status(200).json(admin);
          break;
        }

        case 'DELETE':
          await adminHOC(async () => {
            await AdminModel.findByIdAndDelete(adminId);
            res.status(200).end();
          });
          break;

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
