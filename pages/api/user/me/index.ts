import UserModel from '../../../../lib/models/UserModel';
import { NextApiHandler } from 'next';
import { authorize, connectDB, logger } from '../../../../lib/utils/middleware';

const handler: NextApiHandler = async (req, res) => {
  try {
    logger(req);

    await connectDB();
    const { authorizeHOC, user } = await authorize(req, res);

    await authorizeHOC(async () => {
      switch (req.method) {
        case 'GET':
          res.status(200).json(user);
          break;

        case 'POST':
          await UserModel.findByIdAndUpdate(user._id, { ...req.body });

          res.status(200).json(user);
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
};

export default handler;
