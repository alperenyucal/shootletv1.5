import connectDB from '../../../../lib/utils/middleware/mongodb';
import User from '../../../../lib/models/UserModel';
import authorize from '../../../../lib/utils/middleware/authorize';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  await connectDB();
  const { authorizeHOC, user } = await authorize(req, res);

  try {
    await authorizeHOC(async () => {
      switch (req.method) {
        case 'GET':
          res.status(200).json(user);
          break;

        case 'POST':
          await User.findByIdAndUpdate(user._id, { ...req.body });

          res.status(200).json(user);
          break;

        default:
          res.status(404).end();
      }
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default handler;
