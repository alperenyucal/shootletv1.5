import connectDB from '../../../lib/utils/middleware/mongodb';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    const { accessToken, refreshToken } = req.body;
    switch (req.method) {
      case 'POST': {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

        const decoded: any =
          jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET as string,
            { ignoreExpiration: true });

        const newAccessToken = jwt.sign(
          { data: decoded.data },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: 60 * 5 }, // 5 minutes
        );
        const newRefreshToken = jwt.sign(
          { data: decoded.data },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: 60 * 60 * 24 * 30 * 6 }, // 6 months
        );

        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

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
