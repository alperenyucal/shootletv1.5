import UserModel from '../../../lib/models/UserModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/utils/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const { email } = req.body;
    console.log(email);
    switch (req.method) {
      case 'POST': {
        const user = await UserModel.findOne({ email });
        res.status(200).json({ userExists: !!user });
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
