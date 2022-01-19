import UserModel from '../../../../lib/models/UserModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB, logger } from '../../../../lib/utils/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    logger(req);

    await connectDB();
    const { value } = req.query;

    switch (req.method) {
      case 'GET': {
        const users = await UserModel.find({
          firstname: new RegExp(value as string, 'i'), // includes
        })
          .limit(5)
          .select('-password');
        res.status(200).json(users);
        break;
      }

      default:
        res.status(404).end();
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).json({ message: error });
    }
  }
}

export default handler;
