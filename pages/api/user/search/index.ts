import UserModel from '../../../../lib/models/UserModel';

import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../../lib/utils/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    switch (req.method) {
      case 'GET': {
        const users = await UserModel.find({}).limit(5).select('-password');
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
