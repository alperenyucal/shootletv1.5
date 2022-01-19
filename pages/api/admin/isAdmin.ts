import { NextApiRequest, NextApiResponse } from 'next';
import { authorize, connectDB, logger } from '../../../lib/utils/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    logger(req);
    await connectDB();
    const { isAdmin, authorizeHOC } = await authorize(req, res);

    await authorizeHOC(async () => {
      switch (req.method) {
        case 'GET':
          res.status(200).json({ isAdmin });
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
