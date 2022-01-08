import UserModel from '../../../lib/models/UserModel';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/utils/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const { password, email } = req.body;

    switch (req.method) {
      case 'POST': {
        const hashPassword = await bcrypt.hash(password, 8);

        const user = new UserModel({
          email,
          password: hashPassword,
        });

        await user.save();

        res.status(200).end();

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
