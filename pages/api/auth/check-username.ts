import connectDB from '../../../lib/utils/middleware/mongodb';
import User from '../../../lib/models/UserModel';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    const { username } = req.body;
    console.log(username);
    switch (req.method) {
      case 'POST': {
        const user = await User.findOne({ username });
        res.status(200).json({ userExists: !!user });
        break;
      }
      default:
        res.status(404).end();
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

export default handler;
