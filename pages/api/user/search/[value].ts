import connectDB from '../../../../lib/utils/middleware/mongodb';
import User from '../../../../lib/models/UserModel';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { value } = req.query;

  try {
    switch (req.method) {
      case 'GET': {
        const users = await User.find({
          username: new RegExp(value as string, 'i'), // includes
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
    res.status(400).json({ message: error });
  }
}

export default handler;
